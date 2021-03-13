const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Board = mongoose.model("Board")
const Card = mongoose.model("Card")
const Room = mongoose.model("Room")
const Office = mongoose.model("Office")
const middlewareadmin = require('../middleware/admin')
const middleware = require('../middleware/user')

//to create office
router.post('/createoffice', middlewareadmin, async (req, res) => {
    const { officename } = req.body
    if (!officename) {
        return res.json("please give the office name")
    }
    try {
        let recipients = [];
        recipients.push(req.user._id);
        const newConversation = await Conversation.create({ recipients: recipients }, { name: general });
        console.log(newConversation)
        res.status(200).json({ message: "general chat available" });
        const office = new Office({
            name: officename,
            admin: req.user._id,
            generalchat: newConversation._id
        })
        office.save().then(() => {
            return res.json('virtual office created succesfully')
        }).catch(err => {
            console.log(err);
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
})


//to create rooms
router.post('/createroom', middlewareadmin, (req, res) => {
    const { roomname } = req.body
    if (!roomname) {
        return res.json("please give the office name")
    }
    const room = new Room({
        name: officename,
        admin: req.user._id
    })
    room.save().then(() => {
        return res.json('virtual Room created succesfully')
    }).catch(err => {
        console.log(err);
    })
})

//make manager id is userid 
router.post('/makemanger/:id/:roomid', middlewareadmin, (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        $push: { managerof: req.params.roomid },
        $set: { manager: true }
    }, { new: true }).then(() => {
        Room.findByIdAndUpdate(req.params.roomid, {
            $push: { manager: req.params.id }
        }, { new: true }).then(() => {
            res.json("manager created")
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })

})

//add user to room 
router.post('/adduser/:id/:roomid', middlewareadmin, (req, res) => {
    Room.findByIdAndUpdate(req.params.roomid, {
        $push: { members: req.params.id }
    }, { new: true }).then(() => {
        User.findByIdAndUpdate(req.params.id, {
            $push: { rooms: req.params.roomid }
        }, { new: true }).then(() => {
            res.json("Added to room Successfully")
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
})

//search user for adding in office
router.post('/searchuser', middlewareadmin, (req, res) => {
    let userpattern = new RegExp("^" + req.body.query)
    User.find({ email: { $regex: userpattern } })
        .select("_id email")
        .then(user => {
            res.json({ user })
        }).catch(err => {
            console.log(err)
        })
})




module.exports = router;
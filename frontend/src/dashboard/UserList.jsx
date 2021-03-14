import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 520,
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function CheckboxListSecondary() {
  const classes = useStyles();
  const history = useHistory();

  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(
        "/fetchofficemembers",
        {},
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
          },
        }
      )
      .then(async (response) => {
        if (response.status == 200) {
          console.log(response);
          setUserList(response.data);
          history.push("/home");
        }
      })
      .catch((err) => {
        console.error("err :" + err);
      });
  }, []);

  return (
    <>
      <div>
        <Button>
          <AddIcon style={{ color: "#de3e4d", fontWeight: "bold" }} />
        </Button>
      </div>
      <List dense className={classes.root}>
        <ListItem button style={{ textAlign: "center" }}>
          <h5>Office Member</h5>
        </ListItem>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} button>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
              <ListItemSecondaryAction>
                <ChatBubbleIcon style={{ color: "#de3e4d" }} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

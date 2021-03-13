import React from "react";
import OfficeIcon from "./OfficeIcon";
import { Container, Row, Col } from "react-bootstrap";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  })
);

function OfficeList() {
  const [officeListArray, setOfficeListArray] = React.useState([]);
  const classes = useStyles();

  //get post list
  React.useEffect(() => {
    console.log("Bearer " + window.localStorage.getItem("csrfToken"));
    axios
      .get(`boards/${window.localStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("csrfToken"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          const arr = response.data;
          setOfficeListArray(arr);
        } else {
          console.log("errr", response);
          //error message
        }
      })
      .catch((err) => {
        console.log("error" + err);
        //invalid
      });
  }, []);

  return (
    <Container>
      <div className="shadow-sm p-3 mb-5 bg-body rounded">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddIcon />}
        >
          NEW
        </Button>
      </div>
      <Row>
        {officeListArray.map((office) => (
          <Col key={office.id} xs="12" lg="4">
            <div className="shadow  mb-2 bg-body rounded">
              <OfficeIcon office={office} />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default OfficeList;
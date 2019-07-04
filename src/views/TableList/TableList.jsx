import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {fetchUserAnswers} from "../../components/BackendService/BackendService";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { userAnswers: []
                   // idList: []
    } ;
  }

  componentWillMount() {
  fetchUserAnswers()
      .then(fetched_data => {
        console.log(fetched_data)
        var rows = [];
        var ids = [];
        for (var i = 0; i < fetched_data.length; i++) { 
          console.log(i);
          var d = new Date(fetched_data[i].timestamp);
          var dateString = d.toString();
          dateString = dateString.substring(0, dateString.lastIndexOf(':'));
          var row = [fetched_data[i].title, fetched_data[i].patient_name, dateString, fetched_data[i].score, fetched_data[i]._id, fetched_data[i].questionnaire_id]
          rows.push(row);
          // ids.push(fetched_data[i]._id);
        }
        this.setState( {userAnswers: rows} );
        // this.setState( {idList: ids} );   
        // console.log(this.state.idList);   
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={styles.cardTitleWhite}>User Answer Table</h4>
              <p className={styles.cardCategoryWhite}>
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Questionnaire Name", "Patient Name", "Time", "Final Score", "Id", "Questionnaire Id"]}
                tableData={this.state.userAnswers}
              />
            </CardBody>
          </Card>
        </GridItem>        
      </GridContainer>
    );
  }
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);

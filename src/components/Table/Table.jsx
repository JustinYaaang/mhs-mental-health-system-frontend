import React, { Component } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import {getAnsweredQuestionnaire} from "../../components/BackendService/BackendService";

// function CustomTable({ ...props }) {
class CustomTable extends Component {

  constructor(props) {
    super(props);
  }
  
  test_func(prop, key){
    console.log("test_func");
    console.log(key);
    console.log(prop[4]);

    
    // return <Redirect to='https://tylermcginnis.com/react-router-programmatically-navigate/' />

  }

  render() {
    return (
      <div className={this.props.classes.tableResponsive}>
        <Table className={this.props.classes.table}>
          {this.props.tableHead !== undefined ? (
            <TableHead className={this.props.classes[this.props.tableHeaderColor + "TableHeader"]}>
              <TableRow className={this.props.classes.tableHeadRow}>
                {this.props.tableHead.map((prop, key) => {
                  return (
                    <TableCell
                      className={this.props.classes.tableCell + " " + this.props.classes.tableHeadCell}
                      key={key}
                    >
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {this.props.tableData.map((prop, key) => {
              return (
                <TableRow key={key} className={this.props.classes.tableBodyRow} onClick={() => this.test_func(prop, key)}>
                  {prop.map((prop, key) => {
                    return (
                      <TableCell className={this.props.classes.tableCell} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);

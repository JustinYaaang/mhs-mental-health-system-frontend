import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
// import { TableHead } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import View from "@material-ui/icons/RemoveRedEye";




class Tasks extends React.Component {
  state = {
    checked: this.props.checkedIndexes
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes, tableHeaderColor, tableHead, tasks, rtlActive} = this.props;
    console.log(tableHeaderColor)
    const tableCellClasses = classnames(classes.tableCell, {
      [classes.tableCellRTL]: rtlActive
    });
    return (
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
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
          {tasks.map((value, index) => {
            var curTasks = []
            for(var i = 0; i < value.length; i++) {
              curTasks.push(value[i]);
            }
            return (
            <TableRow key={index} className={classes.tableRow}>
              {curTasks.map((value, index) => {
                return <TableCell key={index} className={tableCellClasses}>{value}</TableCell>;
              })}

              <TableCell className={classes.tableActions}>
                <Tooltip
                  id="tooltip-top"
                  title="View Submission"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="{this.state.userAnswers}"
                    className={classes.tableActionButton}
                    onClick={() => this.props.onViewClicked(index)}
                  >
                    <View
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>

              </TableCell>

            </TableRow>
          )})}
        </TableBody>
      </Table>
    );
  }
}

Tasks.propTypes = {
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
  tasks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
  
};

export default withStyles(tasksStyle)(Tasks);


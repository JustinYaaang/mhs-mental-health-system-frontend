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
import View from "@material-ui/icons/RemoveRedEye";
import Descending from "@material-ui/icons/ArrowDownward";
import Ascending from "@material-ui/icons/ArrowUpward";
import Filter from "@material-ui/icons/FilterList";
// core components
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
// import { TableHead } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import { Button } from "@material-ui/core";


class AnswerRows extends React.Component {
  state = {
    checked: this.props.checkedIndexes,
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

  handleEditTask = (index) => () => {
    alert("Edit Clicked");
    // { document.location.href = "/questionnaire/12345"; }
  };

  handleDeleteTask = value => () => {
    alert("Delete Clicked");
  };

  redirectToAnswers = (tasks, index) => {
    var selectedRow = tasks[index];
    var questionnaireResponseId = selectedRow[selectedRow.length - 1];
    document.location.href = '/patientanswers/'+ questionnaireResponseId;
  }

  render() {
    const { classes, tableHeaderColor, tableHead, tasks, rtlActive} = this.props;
    console.log(tableHeaderColor)
    const tableCellClasses = classnames(classes.tableCell, {
      [classes.tableCellRTL]: rtlActive
    });
    return (
      <div>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}>
                    <h4>{prop} 
                    <IconButton
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    aria-label="Descending"
                    //onClick={() => this.props.onDeleteClicked(index)}
                  >
                    <Descending
                    />
                  </IconButton>
                  </h4>
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
            <TableRow key={index} className={classes.tableRow} >
              {/* <TableCell className={tableCellClasses}>
                <Checkbox
                  checked={this.state.checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  onClick={this.handleToggle(index)}
                  checkedIcon={<Check className={classes.checkedIcon} />}
                  icon={<Check className={classes.uncheckedIcon} />}
                  classes={{
                    checked: classes.checked,
                    root: classes.root
                  }}
                />
              </TableCell> */}

              {curTasks.map((value, index, arr) => {
                if (index !== arr.length - 1) return <TableCell key={index} className={tableCellClasses}>{value}</TableCell>;
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
                    onClick={() => this.redirectToAnswers(tasks, index)}
                  >
                    <View
                      className={
                        classes.tableActionButtonIcon + " " + classes.edit
                      }
                    />
                  </IconButton>
                </Tooltip>
                {/* <Tooltip
                  id="tooltip-top-start"
                  title="Delete Questionnaire"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="Delete Questionnaire"
                    className={classes.tableActionButton}
                    onClick={() => this.props.onDeleteClicked(index)}
                  >
                    <Close
                      className={
                        classes.tableActionButtonIcon + " " + classes.close
                      }
                    />
                  </IconButton>
                </Tooltip> */}
              </TableCell>

            </TableRow>
          )})}
        </TableBody>
      </Table>
      </div>
   );
  }
}

AnswerRows.propTypes = {
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

export default withStyles(tasksStyle)(AnswerRows);


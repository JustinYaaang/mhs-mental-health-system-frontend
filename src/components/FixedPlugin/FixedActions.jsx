/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import Button from "components/CustomButtons/Button.jsx";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { fetchQuestionnaires} from "../../services/BackendService";

class FixedActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show",
      bg_checked: true,
      bgImage: this.props.bgImage,
      open: false,
      question:[],
      questionList:[],
      patient:this.props.patient
    };
    this.handleRefer = this.handleRefer.bind(this);
  }

  handleRefer() {
    this.setState({open: true});
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleSubmit() {
    console.log(this.state.patient)
    console.log(this.state.question)
  }

  handleChangeQuestion = () => event => {
    this.setState({question: event.target.value})
  };

  componentWillMount() {
    fetchQuestionnaires().then( 
      response => {

      var questions = []
      for(var i = 0; i<response.questionnaire.length; i++){
        
        if(response.questionnaire[i].is_public){
          questions.push(<option key={i} index = {i} value={response.questionnaire[i].title}>{response.questionnaire[i].title}</option>);
        }
      }
       this.setState({question: response.questionnaire[0].title})
       this.setState({questionList:questions});
     });
  }
  
  
  render() {

    var styleBoard = {'minWidth': '180px', 'marginLeft': '100px'}

    return (
      <div
        className={classnames("fixed-plugin", {
          "rtl-fixed-plugin": this.props.rtlActive
        })}
      >
        <div id="fixedPluginClasses" className={this.props.fixedClasses}>

          <ul className="dropdown-menu">
            <li className="header-title">Actions</li>
            <li className="button-container">
            <div className="button-container">
              <Button
                color="info"
                fullWidth
              >
                More Info Required
              </Button>
              </div>
            </li>
            <li className="button-container">
              <div className="button-container">
                <Button
                  color="success"
                  onClick={this.handleRefer}
                  fullWidth
                >
                  Refer
                </Button>
              </div>
            </li>
            <li className="button-container">
              <div className="button-container">
                <Button
                  color="danger"
                  href="/"
                  target="_blank"
                  fullWidth
                >
                  Close Case
                </Button>
              </div>
            </li>
            
            {/* <li className="adjustments-line" /> */}
          </ul>
        </div>

        <Dialog  fullWidth={true} maxWidth={'xs'} open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Select Private Questionnaire List</DialogTitle>
          <DialogContent>

          <FormControl  style = {styleBoard}>
            <InputLabel  shrink htmlFor="age-label-placeholder">Questionnaire Name</InputLabel>
            <Select
              native
              value={this.state.question}
              inputProps={{
                name: 'condition',
                id: 'age-native-simple',
              }}
              onChange={this.handleChangeQuestion()}
            >
      
            {this.state.questionList}
            </Select>
          </FormControl>

        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="info">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit.bind(this)} color="info">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }
}

FixedActions.propTypes = {
  bgImage: PropTypes.string,
  handleFixedClick: PropTypes.func,
  rtlActive: PropTypes.bool,
  fixedClasses: PropTypes.string,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};

export default FixedActions;

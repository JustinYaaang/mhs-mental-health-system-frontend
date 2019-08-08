import React, { Component } from "react";
import * as SurveyJSCreator from "survey-creator";
import * as Survey from "survey-react";

//import core components
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";
import Swal from 'sweetalert2';
import {postNewSurvey, updateSurvey, fetchQuestionnaire} from "services/BackendService";
import Button from "components/CustomButtons/Button.jsx";
import { baseUrl, fetchQuestionnairesUrl } from "../variables/general";

//import css style
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import "icheck/skins/square/blue.css";
import 'assets/css/SurveyCreator.css'
import "survey-creator/survey-creator.css";
import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";
import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

var mainColor = "#005EB8";
var mainHoverColor = "#003087";
var textColor = "#4a4a4a";
var headerColor = "#005EB8";
var headerBackgroundColor = "#4a4a4a";
var bodyContainerBackgroundColor = "#E8EDEE";

var defaultThemeColorsSurvey = Survey.StylesManager.ThemeColors["default"];
defaultThemeColorsSurvey["$main-color"] = mainColor;
defaultThemeColorsSurvey["$main-hover-color"] = mainHoverColor;
defaultThemeColorsSurvey["$text-color"] = textColor;
defaultThemeColorsSurvey["$header-color"] = headerColor;
defaultThemeColorsSurvey["$header-background-color"] = headerBackgroundColor;
defaultThemeColorsSurvey["$body-container-background-color"] = bodyContainerBackgroundColor;
Survey.StylesManager.applyTheme();

var defaultThemeColorsEditor = SurveyJSCreator.StylesManager.ThemeColors["default"];
defaultThemeColorsEditor["$primary-color"] = mainColor;
defaultThemeColorsEditor["$secondary-color"] = mainColor;
defaultThemeColorsEditor["$primary-hover-color"] = mainHoverColor;
defaultThemeColorsEditor["$primary-text-color"] = textColor;
defaultThemeColorsEditor["$selection-border-color"] = mainColor;
SurveyJSCreator.StylesManager.applyTheme();

class SurveyCreator extends Component {
  surveyCreator;

  state = {
    questionnaireId: '',
    questionnaireBody: '',
    setOpen: false,
    open: false,
    checkedPublic:true,
    checkedPublish:true,
    jsonRep:[],
    redInput:[],
    redQuestion:[],
    redCondition:[], 
    greenInput:[],
    greenQuestion:[],
    greenCondition:[],
    questionList:[]
  }

  handleClickOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleChangeSwitch = id => event =>  {
    if(id == 'checkedPublic')
    {
      this.setState({checkedPublic: event.target.checked});
    }
    else if(id == 'checkedPublish'){
      this.setState({checkedPublish: event.target.checked});
    }
  }

  handleSubmit() {
    this.setState({open: false});

    const { id } = this.props.match.params;
   
    //combile the rules into object
    var rules = {'RED':[],'GREEN':[]}
    this.state.redInput.map((item, index) => {
      rules['RED'].push({
        'name': this.state.redQuestion[index],
        'value': this.state.redInput[index],
        'condition': this.state.redCondition[index],
      })
    })
    this.state.greenInput.map((item, index) => {
      rules['GREEN'].push({
        'name': this.state.greenQuestion[index],
        'value': this.state.greenInput[index],
        'condition': this.state.greenCondition[index],
      })
    })

    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Save Successfully!',
      showConfirmButton: false,
      timer: 1500
    })

    var surveyJson = {
      "id": id,
      "title": this.state.jsonRep.title,
      "description": this.state.jsonRep.description,
      "is_published": this.state.checkedPublish,
      "is_public":this.state.checkedPublic,
      "body":this.state.jsonRep,
      "role": this.state.checkedPublic ? 'FORM1': 'FORM2',
      "rules": rules
    }

    var createSurveyUrl = baseUrl + fetchQuestionnairesUrl

    //create new questionnaire
    if(id == undefined){
        postNewSurvey(createSurveyUrl, surveyJson)
        .then(results => {
            console.log(results)
            {document.location.href = '/admin/dashboard'}
        })
        .catch(error => {
            console.error(error);
        });
    }else{
        createSurveyUrl = createSurveyUrl + '/' + id
        updateSurvey(createSurveyUrl,surveyJson)
        .then(results => {
          console.log(results)
          {document.location.href = '/admin/dashboard'}
        })
        .catch(error => {
            console.error(error);
        });
    }
  }

  /* The three functions below listen the changes in dialog */
  handleChange = (id, badge) => event => {
    if(badge == 'red'){
      this.setState({redInput: this.state.redInput.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.redInput)
    }
    else if(badge == 'green'){
      this.setState({greenInput: this.state.greenInput.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.greenInput)
    }
  };

  handleChangeQuestion = (id, badge) => event => {
    if(badge == 'red'){
      this.setState({redQuestion: this.state.redQuestion.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.redQuestion)
    }else if(badge == 'green'){
      this.setState({greenQuestion: this.state.greenQuestion.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.greenQuestion)
    }
  };

  handleChangeCondition = (id, badge) => event => {
    if(badge == 'red'){
      this.setState({redCondition: this.state.redCondition.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.redCondition)
    }else if(badge == 'green'){
      this.setState({greenCondition: this.state.greenCondition.map((item, _index) => _index == id ? event.target.value : item)})
      console.log(this.state.greenCondition)
    }
  };
  
  componentWillMount() {

    const { id } = this.props.match.params;
    if (id !== undefined) {
      fetchQuestionnaire(id).then(
        response => {
          this.setState({ questionnaireId: response.id, questionnaireBody: response.body });
          this.surveyCreator.text = JSON.stringify(this.state.questionnaireBody);
        }
      );
    }
  }

  componentDidMount() {
    let options = {
      showEmbededSurveyTab: true,
      showJSONEditorTab: true,
      showTestSurveyTab: true,
    };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  render() {

    var stylePaper = {'margin-left': '170px'}
    return(
      <div>

        <Dialog open={this.state.open} onClose={this.handleClose.bind(this)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
          <Paper>
            <Typography component="p">Red Badge
            <IconButton style = { stylePaper} aria-label="add" onClick={() => {
                  this.setState({
                    redInput: this.state.redInput.concat(['0']),
                    redQuestion: this.state.redQuestion.concat(['Question 1']),
                    redCondition: this.state.redCondition.concat(['gt'])
                  })
                }}>
              <AddIcon/>
            </IconButton>
        
            </Typography>
          </Paper>

          {this.state.redInput.map((item, idx) => {
            return <Board parent={this} index={idx} question={this.state.redQuestion[idx]} condition={this.state.redCondition[idx]} input={this.state.redInput[idx]} badge={'red'} questionList={this.state.questionList}/>;
          })}

          <Paper>
            <Typography component="p">Green Badge
            <IconButton style = { stylePaper} aria-label="add">
                <AddIcon onClick={() => {
                    this.setState({
                        greenInput: this.state.greenInput.concat(['0']),
                        greenQuestion: this.state.greenQuestion.concat(['Question 1']),
                        greenCondition: this.state. greenCondition.concat(['gt'])
                    })
                  }}/>
            </IconButton>
            </Typography>
          </Paper>

          {this.state.greenInput.map((item, idx) => {
            return <Board parent={this} index={idx} question={this.state.greenQuestion[idx]} condition={this.state.greenCondition[idx]} input={this.state.greenInput[idx]} badge={'green'} questionList={this.state.questionList}/>;
          })}
     

          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item xs={4}>Draft</Grid>
            <Grid item xs={4}>
              <Switch
                checked={this.state.checkedPublish}
                onChange={this.handleChangeSwitch('checkedPublish').bind(this)}
                value="checkedB"
                color="primary"
              />
            </Grid>
            <Grid item xs={4}>Published</Grid>
          </Grid>

          <Grid component="label" container alignItems="center" spacing={1} >
            <Grid item xs={4}>Private</Grid>
            <Grid item xs={4}>
              <Switch
                checked={this.state.checkedPublic}
                onChange={this.handleChangeSwitch('checkedPublic').bind(this)}
                value="checkedB"
                color="primary"
              />
            </Grid>
            <Grid item xs={4}>Public</Grid>
          </Grid>

        </DialogContent>

        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="info">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit.bind(this)} color="info">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

      <div id="surveyCreatorContainer"></div>
    </div>
    );
  }

  /*click the save survery button */
  saveMySurvey = () => {

    var survey_jsonRepresentation = JSON.parse(this.surveyCreator.text);

    if (survey_jsonRepresentation.title && survey_jsonRepresentation.description){ 
      this.setState({open: true, jsonRep: survey_jsonRepresentation});
      this.setState({questionList: []})
   
      for(var i = 0; i<survey_jsonRepresentation.pages.length; i++){
        if(survey_jsonRepresentation.pages[i].elements != undefined){
          for(var j = 0; j<survey_jsonRepresentation.pages[i].elements.length; j++){
            var questionName = survey_jsonRepresentation.pages[i].elements[j].name;
            this.state.questionList.push(<option value={questionName}>{questionName}</option>);
          }
        }
      }
    }
    else {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Please Enter Title & Description',
        footer: 'Check in Survery Setting'
      })
    }
  };
}


class Board extends React.Component {

  render() {

    var styleBoard = {'margin-left': '10px'}
    var styleTop = {'margin-top': '5px'}

    return (
      <div>
        <form autoComplete="off" style = {styleTop}>
          <FormControl >
            <InputLabel htmlFor="age-native-simple">Question</InputLabel>
              <Select
                native
                styleTop
                value={this.props.question}
                onChange={this.props.parent.handleChangeQuestion(this.props.index,this.props.badge).bind(this)}
                inputProps={{
                  name: 'question',
                  id: 'age-native-simple',
                }}
              >
              
              {this.props.questionList}

            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="age-native-simple">Condition</InputLabel>
            <Select
              native
              style = {styleBoard}
              value={this.props.condition}
              onChange={this.props.parent.handleChangeCondition(this.props.index, this.props.badge).bind(this)}
              inputProps={{
                name: 'condition',
                id: 'age-native-simple',
              }}
            >
      
              <option value={'great'}>gt</option>
              <option value={'less'}>ls</option>
              <option value={'equal'}>equal</option>
            </Select>
          </FormControl>

          <TextField
            id="value"
            value={this.props.input}
            onChange={this.props.parent.handleChange(this.props.index,this.props.badge).bind(this)}
            label="Value"
            type="number"
            style = {styleBoard}
            required = {true}
          />  
        </form>
      </div>
    );
  }
}


export default SurveyCreator;

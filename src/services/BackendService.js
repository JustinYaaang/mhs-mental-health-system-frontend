import axios from "axios";
import { array } from "prop-types";

const postNewSurvey = async (createSurveyUrl, surveyData) => {

  try {
    const response = await axios({
                      method: 'post',
                      url: createSurveyUrl,
                      data: surveyData
                    });

    return response;
  } catch (error) {
    console.log("POST server error: ", error);
  }
  console.log(createSurveyUrl)
  console.log(surveyData)
  axios.post(createSurveyUrl, surveyData)
    .then(function (response) {
      console.log("response");
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const fetchQuestionnaires = async () => {
    const url = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS";
    return await axios.get(url)
    .then(function(response){

      const data = response.data.data;
      const idPublishedList = [];
      const questionnairePublishedList = [];
      const idDraftList = [];
      const questionnaireDraftList = [];

      data.forEach(element => {
        if (element.status === 'PUBLISHED'){
          questionnairePublishedList.push([element.title, element.description, element.status]);
          idPublishedList.push(element._id);
        }
        else if(element.status === 'DRAFT'){
          questionnaireDraftList.push([element.title, element.description, element.status]);
          idDraftList.push(element._id);
        }
        
      });
      return {'idDraftList': idDraftList, 'idPublishedList': idPublishedList, 
              'questionnaireDraftList': questionnaireDraftList, 'questionnairePublishedList': questionnairePublishedList};
    })
    .catch(function (error){
      console.log(error);
    });
}

const fetchUserAnswers = async () => {
  console.log("fetchUserAnswers");
  var userAnswerUrl = "http://mhsbackend.azurewebsites.net/api/v1/patientanswers";
  try {
    const response = await axios.get(userAnswerUrl);
    // return response;
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

const getAnsweredQuestionnaire= async(theId) => {
  console.log(theId);
  const backendURL = "http://mhsbackend.azurewebsites.net/api/v1/patientanswers/";
  axios({
    method: "get",
    url: backendURL+theId,
  }).then(function(response){
    return response.data.data;
    
  });

  return await axios.get(backendURL+theId)
  .then(function(response){
    return response.data.data.body;
  })
  .catch(function (error){
    console.log(error);
  });
}

const fetchQuestionnaire = async (questionnaireId) => {
  const url = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS/" + questionnaireId;
  console.log(url);
  return await axios.get(url)
  .then(function(response){

    const data = response.data.data;
    return {'id': data._id, 'body': data.body};
  })
  .catch(function (error){
    console.log(error);
  });
}

const deleteQuestionnaire = async (questionnaireId) => {
  const url = "http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS/" + questionnaireId;
  return await axios({
    method: 'delete',
    url: url
  }).then(function(response){
    console.log(response);
  })
  .catch(function (error){
    console.log(error);
  });
}

const getQuestionnaire = async (testUrl) => {

  try {
    const response = await axios.get(testUrl);
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

const getAuthenticationToken = async () => {
  try {
    const response = await axios.get("http://mhsbackend.azurewebsites.net/api/v1/patients/authenticate");
    // return response.data.data;
    console.log(response);
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

export {postNewSurvey, fetchQuestionnaires, fetchUserAnswers, getQuestionnaire, getAnsweredQuestionnaire, fetchQuestionnaire, deleteQuestionnaire};


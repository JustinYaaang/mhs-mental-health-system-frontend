import axios from "axios";
import { baseUrl, fetchQuestionnairesUrl, patientanswersUrl } from "../variables/general";

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
    return await axios.get(baseUrl + fetchQuestionnairesUrl)
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
      return {'idDraftList': idDraftList, 
              'idPublishedList': idPublishedList, 
              'questionnaireDraftList': questionnaireDraftList, 
              'questionnairePublishedList': questionnairePublishedList
             };
    })
    .catch(function (error){
      console.log(error);
    });
}

const fetchUserAnswers = async () => {
  console.log("fetchUserAnswers");
  var userAnswerUrl = baseUrl + patientanswersUrl;
  try {
    const response = await axios.get(userAnswerUrl);
    // return response;
    console.log("response");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
}

const getAnsweredQuestionnaire= async(theId) => {
  console.log(theId);
  axios({
    method: "get",
    url: baseUrl + patientanswersUrl + '/' + theId,
  }).then(function(response){
    return response.data.data;
    
  });

  return await axios.get(baseUrl + patientanswersUrl + '/' +theId)
  .then(function(response){
    return response.data.data.body;
  })
  .catch(function (error){
    console.log(error);
  });
}

const fetchQuestionnaire = async (questionnaireId) => {
  return await axios.get(baseUrl + fetchQuestionnairesUrl + "/" + questionnaireId)
  .then(function(response){

    const data = response.data.data;
    return {'id': data._id, 'body': data.body};
  })
  .catch(function (error){
    console.log(error);
  });
}

const deleteQuestionnaire = async (questionnaireId) => {
  return await axios({
    method: 'delete',
    url: baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId
  }).then(function(response){
    console.log(response);
  })
  .catch(function (error){
    console.log(error);
  });
}

const getQuestionnaire = async (qustionId) => {
  try {
    const response = await axios.get(baseUrl + fetchQuestionnairesUrl + '/' + qustionId);
    return response.data.data;
  } catch (error) {
    console.log("GET server error: ", error);
  }
};

export {postNewSurvey, fetchQuestionnaires, fetchUserAnswers, getQuestionnaire, getAnsweredQuestionnaire, fetchQuestionnaire, deleteQuestionnaire};


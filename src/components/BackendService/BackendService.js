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

export {postNewSurvey, fetchQuestionnaires, fetchQuestionnaire, deleteQuestionnaire};


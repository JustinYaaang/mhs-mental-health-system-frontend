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
  axios.post(createSurveyUrl, 
    // surveyData,
    // {headers: {"Content-Type": "application/json", 
    // "Access-Control-Allow-Origin": "*"}}
    // )
    surveyData
    )
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
      const idList = [];
      const questionnaireList = [];

      data.forEach(element => {
        questionnaireList.push([element.title, element.description, element.status]);
        idList.push(element._id);
      });
      return {'idList': idList, 'questionnaireList': questionnaireList};
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
  // const url = 'http://mhsbackend.azurewebsites.net/api/v1/questionnaire_sJS/5d1a0d48c9acd3003068fe6b'
  console.log(url);
  axios.delete(url).catch((error) => {
    console.log(error);
  });
  // return await axios({
  //   method: 'delete',
  //   url: url
  // }).then(function(response){
  //   console.log(response);
  //   // const data = response.data.data;
  //   // return {'id': data._id, 'body': data.body};
  // })
  // .catch(function (error){
  //   console.log(error);
  // });
}

export {postNewSurvey, fetchQuestionnaires, fetchQuestionnaire, deleteQuestionnaire};
// export default postNewSurvey;


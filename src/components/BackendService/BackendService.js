import axios from "axios";

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
    axios.get(url)
    .then(function(response){
      console.log(response);
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
    console.log(response);
    return response;
    
  });
}

export {postNewSurvey, fetchQuestionnaires, fetchUserAnswers, getAnsweredQuestionnaire};
// export default postNewSurvey;


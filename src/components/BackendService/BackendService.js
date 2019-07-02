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
    axios.get(url)
    .then(function(response){
      console.log(response);
      const data = response.data;
      const idList = new Array(data.length);
      const questionnaireList = new Array(data.length);
      data.forEach(element => {
        questionnaireList.concat([element.title, element.description, element.status]);
        idList.concat(element._id);
        return {idList, questionnaireList};
      });
      
    })
    .catch(function (error){
      console.log(error);
    });
}

// export {postNewSurvey, fetchQuestionnaires};
export default postNewSurvey;


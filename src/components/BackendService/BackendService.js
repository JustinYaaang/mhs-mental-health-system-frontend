import axios from "axios";

const postNewSurvey = async (createSurveyUrl, surveyData) => {

  // try {
  //   const response = await axios({
  //                     method: 'post',
  //                     url: createSurveyUrl,
  //                     data: surveyData
  //                   });

  //   return response;
  // } catch (error) {
  //   console.log("POST server error: ", error);
  // }
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

export default postNewSurvey;


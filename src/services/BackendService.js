import axios from 'axios'
import { baseUrl, backendURL, fetchQuestionnairesUrl, patientanswersUrl, authenticationUrl, questionnaireWithoutToken } from '../variables/general'

const postNewSurvey = async (createSurveyUrl, surveyData) => {
  try {
    const response = await axios({
      method: 'post',
      url: createSurveyUrl,
      data: surveyData
    })
    return response
  } catch (error) {
    console.log('POST server error: ', error)
  }
  console.log(createSurveyUrl)
  console.log(surveyData)

  axios.post(createSurveyUrl, surveyData)
    .then(function (response) {
      console.log('response')
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

const updateSurvey = async (updateSurveyUrl, surveyData) => {
  try {
    const response = await axios({
      method: 'put',
      url: updateSurveyUrl,
      data: surveyData
    })
    return response
  } catch (error) {
    console.log('PUT server error: ', error)
  }
  // console.log(updateSurveyUrl)
  // console.log(surveyData)

  axios.put(updateSurveyUrl, surveyData)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
const fetchQuestionnaires = async () => {
  return await axios.get(baseUrl + fetchQuestionnairesUrl)
    .then(function (response) {
      const data = response.data.data
      const idPublishedList = []
      const questionnairePublishedList = []
      const idDraftList = []
      const questionnaireDraftList = []

      data.forEach(element => {
        if (element.status === 'PUBLISHED') {
          questionnairePublishedList.push([element.title, element.description, element.status])
          idPublishedList.push(element._id)
        } else if (element.status === 'DRAFT') {
          questionnaireDraftList.push([element.title, element.description, element.status])
          idDraftList.push(element._id)
        } else if (element.status === 'DRAFT') {
          questionnaireDraftList.push([element.title, element.description, element.status])
          idDraftList.push(element._id)
        }
      })
      return {
        'idDraftList': idDraftList,
        'idPublishedList': idPublishedList,
        'questionnaireDraftList': questionnaireDraftList,
        'questionnairePublishedList': questionnairePublishedList
      }
    })
}

const fetchUserAnswers = async () => {
  console.log('fetchUserAnswers')
  var userAnswerUrl = baseUrl + patientanswersUrl
  try {
    const response = await axios.get(userAnswerUrl)
    // return response;
    console.log('response')
    console.log(response)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const fetchWeeklyResult = async (startDate, lastDate) => {
  console.log('fetchWeeklyCount')
  var weeklyResultUrl = baseUrl + patientanswersUrl
  console.log(startDate)
  console.log(lastDate)
  try {
    const response = await axios.get(weeklyResultUrl, {
      params: {
        startDate: lastDate,
        endDate: startDate,
        groupby: 'date'
      }
    })

    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

// const getAnsweredQuestionnaire = async (theId) => {
//   axios({
//     method: 'get',
//     url: baseUrl + patientanswersUrl + '/' + theId
//   }).then(function (response) {
//     return response.data.data
//   })

//   return await axios.get(baseUrl + patientanswersUrl + '/' + theId)
//     .then(function (response) {
//       return response.data.data.body
//     })

//   return await axios.get(backendURL + theId)
//     .then(function (response) {
//       return response.data.data.body
//     })
//     .catch(function (error) {
//       console.log(error)
//     })

const getAnsweredQuestionnaire = async (theId) => {
  return await axios.get(baseUrl + patientanswersUrl + '/' + theId)
    .then(function (response) {
      console.log('ttttt')
      return response.data.data
    })
}

const fetchQuestionnaire = async (questionnaireId) => {
  return await axios.get(baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId)
    .then(function (response) {
      const data = response.data.data
      return { 'id': data._id, 'body': data.body }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const deleteQuestionnaire = async (questionnaireId) => {
  return await axios({
    method: 'delete',
    url: baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId
  }).then(function (response) {
    console.log(response)
  })
    .catch(function (error) {
      console.log(error)
    })
}

const getQuestionnaire = async (qustionId) => {
  try {
    const response = await axios.get(baseUrl + fetchQuestionnairesUrl + '/' + qustionId)
    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getAuthenticationToken = async (body) => {
  var headers = { 'Content-Type': 'application/json' }
  try {
    console.log('here')
    const response = await axios({
      method: 'post',
      url: baseUrl + authenticationUrl,
      headers: headers,
      data: body
    })
    console.log('getAuthenticationToken')
    console.log(response.data.data)
    return response
  } catch (error) {
    console.log('POST server error: ', error)
    throw error;
  }
}

const getQuestionnaireWithoutToken = async () => {
  try {
    console.log(baseUrl + questionnaireWithoutToken)
    const response = await axios.get(baseUrl + questionnaireWithoutToken)
    console.log('getQuestionnaireWithoutToken')
    console.log(response)
    return response
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getQuestionnaireWithToken = async (body) => {
  var headers = { 'Content-Type': 'application/json' }
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + authenticationUrl,
      headers: headers,
      data: body
    })
    console.log('getAuthenticationToken')
    console.log(response.data.data)
    var token = response.data.data
    try {
      const res = await axios.get(baseUrl + questionnaireWithoutToken, {
        headers: { 'Authorization': 'Bearer ' + token }
      })

      console.log('res.data.data')
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
    return response.data.data
  } catch (error) {
    console.log('POST server error: ', error)
  }

  // try {
  //   const token = getAuthenticationToken({"NHS_number": 1234567890})
  //   console.log(token);
  //   try {
  //     const res = await axios.get(baseUrl + questionnaireWithoutToken, {
  //       headers:{ 'Authorization': 'Bearer ' + token}
  //     });

  //     console.log("res")
  //     console.log(res)
  //     return res;
  //   } catch (error) {
  //     console.log("GET server error: ", error);
  //   }

  // } catch (error) {
  //   console.log("GET server error: ", error);
  // }
}

export { postNewSurvey, updateSurvey, fetchQuestionnaires, fetchWeeklyResult, fetchUserAnswers, getQuestionnaire, getAnsweredQuestionnaire, fetchQuestionnaire, deleteQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken, getQuestionnaireWithToken }

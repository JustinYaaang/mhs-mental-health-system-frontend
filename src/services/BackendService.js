import axios from 'axios'
import {
  baseUrl, backendURL, organizations, patients, personnel,
  fetchQuestionnairesUrl, patientanswersUrl, authenticationUrl,
  questionnaireWithoutToken
} from '../variables/general'

const postNewSurvey = async (createSurveyUrl, surveyData) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }

  try {
    const response = await axios({
      method: 'post',
      url: createSurveyUrl,
      data: surveyData,
      headers: headers
    })
    return response
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

const updateSurvey = async (updateSurveyUrl, surveyData) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  try {
    const response = await axios({
      method: 'put',
      url: updateSurveyUrl,
      data: surveyData,
      headers: headers
    })
    return response
  } catch (error) {
    console.log('PUT server error: ', error)
  }

  axios.put(updateSurveyUrl, surveyData)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
const fetchQuestionnaires = async () => {
  try {
    var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
    const response = await axios({
      method: 'get',
      url: baseUrl + fetchQuestionnairesUrl,
      headers: headers
    })

    const data = response.data.data
    const idPublishedList = []
    const questionnairePublishedList = []
    const idDraftList = []
    const questionnaireDraftList = []

    data.forEach(element => {
      var status = element.is_published ? 'PUBLISHED' : 'DRAFT'
      if (status === 'PUBLISHED') {
        questionnairePublishedList.push([element.title, element.description, status])
        idPublishedList.push(element._id)
      } else if (status === 'DRAFT') {
        questionnaireDraftList.push([element.title, element.description, status])
        idDraftList.push(element._id)
      }
    })
    return {
      'questionnaire':response.data.data,
      'idDraftList': idDraftList,
      'idPublishedList': idPublishedList,
      'questionnaireDraftList': questionnaireDraftList,
      'questionnairePublishedList': questionnairePublishedList
    }
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const fetchUserAnswers = async () => {
  console.log('fetchUserAnswers')
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'get',
    url: baseUrl + patientanswersUrl,
    headers: headers
  }).then(response => {
    return response.data.data
  }).catch(error => {
    console.log('GET server error: ', error)
  })
}

/**
 * Function that updates a case given the ID
 * @param {*} body
 */
const updateCase = async (body) => {
  try {
    try {
      var restofbody = body.body
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'put',
        url: baseUrl + patientanswersUrl + '/' + body.id,
        headers: headers,
        data: { status: 'RESOLVED' }
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

const fetchWeeklyResult = async (startDate, lastDate) => {
  console.log('fetchWeeklyCount')
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  var weeklyResultUrl = baseUrl + patientanswersUrl

  return await axios({
    method: 'get',
    url: weeklyResultUrl,
    params: {
      startDate: lastDate,
      endDate: startDate,
      groupby: 'date'
    },
    headers: headers
  }).then(response => {
    console.log(response.data.data)
    return response.data.data
  }).catch(error => {
    console.log('GET server error: ', error)
  })
}

const getAnsweredQuestionnaire = async (theId) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'get',
    url: baseUrl + patientanswersUrl + '/' + theId,
    headers: headers
  }).then(function (response) {
    return response.data.data
  })
}

const fetchQuestionnaire = async (questionnaireId) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'get',
    url: baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId,
    headers: headers
  })
    .then(function (response) {
      const data = response.data.data
      return { 'id': data._id, 'body': data.body, 'rules': data.rules }
    })
    .catch(function (error) {
      console.log(error)
    })
}

const fetchUserDetail = async (UserId) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'get',
    url: baseUrl + patients + '/' + UserId,
    headers: headers
  }).then(function (response) {
    return response.data.data
  })
    .catch(function (error) {
      console.log(error)
    })
}

const deleteQuestionnaire = async (questionnaireId) => {
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'delete',
    url: baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId,
    headers: headers
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
  console.log(body)
  var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  return await axios({
    method: 'post',
    url: baseUrl + authenticationUrl,
    headers: headers,
    data: body
  })
    .then(function (response) {
      console.log('getAuthenticationToken')
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
      throw error
    })
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
    try {
      const res = await axios.get(baseUrl + questionnaireWithoutToken, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      })

      console.log('res.data.data')
      console.log(res.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that return a the organization list given the type. If a id is given in the body
 * then the function returs the details for a single organization
 * @param {*} body
 */
const getOrganizations = async (body) => {
  var url = baseUrl + organizations
  if (body !== undefined) {
    url = baseUrl + organizations + '/' + body
  }
  console.log(url)
  try {
    try {
      const res = await axios.get(url, {
        headers: { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      })

      console.log('res.data.data')
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that updates an organization given the ID
 * @param {*} body
 */
const updateOrganization = async (body) => {
  try {
    try {
      var restofbody = body.body
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'put',
        url: baseUrl + organizations + '/' + body.id,
        headers: headers,
        data: restofbody
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that updates an organization given the ID
 * @param {*} body
 */
const createOrganization = async (body) => {
  try {
    try {
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'post',
        url: baseUrl + organizations,
        headers: headers,
        data: body
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that deletes an organization given the ID
 * @param {*} body
 */
const deleteOrganization = async (body) => {
  try {
    try {
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'delete',
        url: baseUrl + organizations + '/' + body,
        headers: headers,
        data: body
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that returs the personel given an organization id
 * @param {*} body
 */
const getPersonnel = async (body) => {
  var url = baseUrl + personnel
  var request = {
    method: 'get',
    url: url + '/' + body,
    headers: { 'Authorization': 'Bearer ' + sessionStorage.jwt }
  }
  if (body !== undefined && body.organisation_id !== undefined) {
    request = {
      method: 'get',
      url: url,
      headers: { 'Authorization': 'Bearer ' + sessionStorage.jwt },
      params: body
    }
  }
  try {
    const res = await axios(request)
    return res.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

/**
 * Function that updates a person given the ID
 * @param {*} body
 */
const updatePersonnel = async (body) => {
  try {
    console.log('update personel ' + JSON.stringify(body.body))
    try {
      var restofbody = body.id
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'put',
        url: baseUrl + personnel + '/' + body.id,
        headers: headers,
        data: body.body
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that creates a person
 * @param {*} body
 */
const createPersonnel = async (body) => {
  try {
    console.log(body)
    try {
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'post',
        url: baseUrl + personnel,
        headers: headers,
        data: body
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

/**
 * Function that deletes a person
 * @param {*} body
 */
const deletePersonnel = async (body) => {
  try {
    console.log(body)
    try {
      var headers = { 'Authorization': 'Bearer ' + sessionStorage.jwt }
      const res = await axios({
        method: 'delete',
        url: baseUrl + personnel + '/' + body,
        headers: headers,
        data: body
      })
      console.log(res.data.data)
      return res.data.data
    } catch (error) {
      console.log('GET server error: ', error)
    }
  } catch (error) {
    console.log('POST server error: ', error)
  }
}

export {
  postNewSurvey, updateSurvey, getOrganizations,
  fetchQuestionnaires, fetchUserDetail, fetchWeeklyResult, fetchUserAnswers,
  getQuestionnaire, getAnsweredQuestionnaire, fetchQuestionnaire,
  deleteQuestionnaire, getAuthenticationToken, getQuestionnaireWithoutToken,
  getQuestionnaireWithToken,
  getPersonnel, updatePersonnel, updateOrganization, deleteOrganization, deletePersonnel, createOrganization, createPersonnel
}

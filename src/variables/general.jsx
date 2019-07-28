// ##############################
// // // Tasks for TasksCard - see Dashboard view
// #############################

var bugs = [
  'Sign contract for "What are conference organizers afraid of?"',
  'Lines From Great Russian Literature? Or E-mails From My Boss?',
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Create 4 Invisible User Experiences you Never Knew About'
]
var website = [
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Sign contract for "What are conference organizers afraid of?"'
]
var server = [
  'Lines From Great Russian Literature? Or E-mails From My Boss?',
  'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
  'Sign contract for "What are conference organizers afraid of?"'
]

var baseUrl = 'http://localhost:3000/api/v1/'//'http://178.128.34.125/api/v1/'//'http://127.0.0.1:3000/api/v1/'// 'http://mhsbackend.azurewebsites.net/api/v1/'
var fetchQuestionnairesUrl = 'questionnaire_sJS'
var patientanswersUrl = 'patientanswers'
var backendUrl = 'http://178.128.34.125/api/v1/'
var createUserAnswers = 'useranswers'
var authenticationUrl = 'patients/authenticate'
var questionnaireWithoutToken = 'questionnaires'
var Organizations = 'Organisations'

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server,
  baseUrl,
  backendUrl,
  fetchQuestionnairesUrl,
  patientanswersUrl,
  createUserAnswers,
  authenticationUrl,
  questionnaireWithoutToken,
  Organizations
}

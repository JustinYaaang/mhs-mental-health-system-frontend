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

var baseUrl = 'https://mhsbackend.azurewebsites.net/api/v1'
var patients = '/patients'
var fetchQuestionnairesUrl = '/questionnaire_sJS'
// '/questionnaire'
// '/questionnaire_sJS'
var patientanswersUrl = '/patientanswers'
var createUserAnswers = '/useranswers'
var authenticationUrl = '/users/authenticate'
var questionnaireWithoutToken = '/questionnaires'
var organizations = '/organisations'
var personnel = '/users'
var createform = '/patientquestionnaire'

module.exports = {
  // these 3 are used to create the tasks lists in TasksCard - Dashboard view
  bugs,
  website,
  server,
  baseUrl,
  patients,
  fetchQuestionnairesUrl,
  patientanswersUrl,
  createUserAnswers,
  authenticationUrl,
  questionnaireWithoutToken,
  organizations,
  personnel,
  createform
}

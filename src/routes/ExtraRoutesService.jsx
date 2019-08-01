// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import TrustDetails from 'layouts/Trusts/TrustDetails.jsx'
import PersonForm from "views/Forms/PersonForm.jsx";
import QuestionnaireResult from "views/Forms/QuestionnaireResult.jsx";
import TrustAddForm from "views/Forms/TrustServiceForm.jsx";
import CreateClinician from 'layouts/Clinicians/CreateClinician';
import ClinicianDetails from 'layouts/Clinicians/ClinicianDetails';
import patientanswers from "views/Forms/SurveyResult";
import userdetail from "views/Forms/UserDetail";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/clinicians/new',
    name: 'Create New Clinician',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: CreateClinician,
    layout: '/service'
  },
  {
    path: '/clinicians/:id',
    name: 'Clinician Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ClinicianDetails,
    layout: '/service'
  },{
    path: '/triagelist/user/:id',
    name: 'User Detail',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: userdetail,
    layout: '/service'
  },
  {
    path: '/triagelist/:id',
    name: 'patient answer',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: patientanswers,
    layout: '/service'
  },
  {
    path: '/dashboard/questionnaire/:id',
    name: 'questionnaire',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: QuestionnaireResult,
    layout: '/service'
  },
  ,
  {
    path: '/questionnaire/questionnaire/:id?',
    name: 'Trust Overview',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: QuestionnaireResult,
    layout: '/service'
  }
]

export default dashboardRoutes

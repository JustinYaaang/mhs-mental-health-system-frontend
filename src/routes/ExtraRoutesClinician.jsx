// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import patientanswers from "views/Forms/QuestionnaireResult.jsx";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: 'triagelist/:id?',
    name: 'patient answer',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: patientanswers,
    layout: '/clinician'
  }
]

export default dashboardRoutes

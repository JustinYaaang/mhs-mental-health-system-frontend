// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import patientanswers from "views/Forms/SurveyResult";
import userdetail from "views/Forms/UserDetail";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/triagelist/user/:id',
    name: 'User Detail',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: userdetail,
    layout: '/clinician'
  },
  {
    path: '/triagelist/:id',
    name: 'patient answer',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: patientanswers,
    layout: '/clinician'
  }
]

export default dashboardRoutes

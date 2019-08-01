// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import ServiceDetails from 'layouts/Services/ServiceDetails.jsx'
import PersonForm from 'views/Forms/PersonForm.jsx';
import ServiceAddForm from 'views/Forms/TrustServiceForm.jsx';
import ServiceUserDetails from 'layouts/Services/ServiceUserDetails.jsx'
import ServiceCreateManager from 'layouts/Services/ServiceCreateManager.jsx'
import QuestionnaireResult from "views/Forms/QuestionnaireResult.jsx";


// core components/views for RTL layout
const dashboardRoutes = [
  {
    path: '/service/new',
    name: 'Service Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ServiceAddForm,
    layout: '/trust'
  },
  {
    path: '/service/manager/:id?',
    name: 'Service Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: PersonForm,
    layout: '/trust'
  },
  {
    path: '/service/:id?/manager/new',
    name: 'Service Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ServiceCreateManager,
    layout: '/trust'
  },
  {
    path: '/service/:id/:id',
    name: 'Service Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ServiceUserDetails,
    layout: '/trust'
  },
  {
    path: '/service/:id',
    name: 'Service Overview',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ServiceDetails,
    layout: '/trust'
  },
  {
    path: '/dashboard/questionnaire/:id',
    name: 'questionnaire',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: QuestionnaireResult,
    layout: '/trust'
  }
]

export default dashboardRoutes

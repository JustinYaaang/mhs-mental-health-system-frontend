// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
// import Out from "@material-ui/icons/ArrowBack";
import Setting from '@material-ui/icons/Settings'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import TableList from 'views/TableList/TableList.jsx'
import TrustList from 'layouts/Trusts/TrustList.jsx'
import TrustDetails from 'layouts/Trusts/TrustDetails.jsx'
import PersonForm from "views/Forms/PersonForm.jsx";
import TrustAddForm from "views/Forms/TrustServiceForm.jsx";
import TrustManagerForm from 'views/Forms/PersonForm.jsx'
import Typography from 'views/Typography/Typography.jsx'
import NotificationsPage from 'views/Notifications/Notifications.jsx'

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/service/new',
    name: 'Service Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustAddForm,
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
    path: '/service/:id',
    name: 'Service Overview',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustDetails,
    layout: '/trust'
  }

]

export default dashboardRoutes

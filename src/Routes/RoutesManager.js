// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
// import Out from "@material-ui/icons/ArrowBack";
import Setting from '@material-ui/icons/Settings'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx.js'
import ManagerPage from 'views/Dashboard/ManagerDashboard.jsx.js'
import UserProfile from 'views/UserProfile/UserProfile.jsx.js'
import TableList from 'views/TableList/TableList.jsx.js'
import Typography from 'views/Typography/Typography.jsx.js'
import NotificationsPage from 'views/Notifications/Notifications.jsx.js'

// core components/views for RTL layout

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'Dashboard',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: ManagerPage,
  layout: '/manager'
}

]

export default dashboardRoutes

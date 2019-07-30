// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
import Setting from '@material-ui/icons/Settings'
// core components/views for Admin layout
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
import TrustPage from 'views/Dashboard/TrustDashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import ListAlt from '@material-ui/icons/ListAlt' 
import TableList from 'views/TableList/TableList.jsx'
import Typography from 'views/Typography/Typography.jsx'
import NotificationsPage from 'views/Notifications/Notifications.jsx'
import IAPTList from 'layouts/Trusts/TrustList.jsx'
// core components/views for RTL layout

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'Dashboard',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: TrustPage,
  layout: '/trust'
},
{
  path: '/service',
  name: 'IAPT Services',
  rtlName: 'لوحة القيادة',
  icon: ListAlt,
  component: IAPTList,
  layout: '/trust'
},
{
  path: '/profile',
  name: 'Profile',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: TrustPage,
  layout: '/trust'
},
{
  path: '/settings',
  name: 'Settings',
  rtlName: 'لوحة القيادة',
  icon: Setting,
  component: TrustPage,
  layout: '/trust'
},
{
  path: '/logout',
  name: 'Logout',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: TrustPage,
  layout: '/trust'
}

]

export default dashboardRoutes

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
import Typography from 'views/Typography/Typography.jsx'
import NotificationsPage from 'views/Notifications/Notifications.jsx'

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/trust',
    name: 'Trusts',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: TrustList,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'Profile',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/settings',
    name: 'Settings',
    rtlName: 'لوحة القيادة',
    icon: Setting,
    component: DashboardPage,
    layout: '/admin'
  },
  {
    path: '/logout',
    name: 'Logout',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin'
  }
  


]

export default dashboardRoutes
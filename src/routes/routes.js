// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
// import Out from "@material-ui/icons/ArrowBack";
import Setting from '@material-ui/icons/Settings'
// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx'
import UserProfile from '../views/UserProfile/UserProfile.jsx'
import TableList from '../views/TableList/TableList.jsx'
import Typography from '../views/Typography/Typography.jsx'
import NotificationsPage from '../views/Notifications/Notifications.jsx'

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
    path: '/table',
    name: 'Triage List',
    rtlName: 'قائمة الجدول',
    icon: 'content_paste',
    component: TableList,
    layout: '/admin'
  },
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    rtlName: 'إخطارات',
    icon: Notifications,
    component: NotificationsPage,
    layout: '/admin'
  },
  {
    path: '/typography',
    name: 'Settings',
    rtlName: 'طباعة',
    icon: Setting,
    component: Typography,
    layout: '/admin'
  }

]

export default dashboardRoutes

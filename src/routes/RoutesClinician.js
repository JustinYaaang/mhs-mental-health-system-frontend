// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Notifications from '@material-ui/icons/Notifications'
import Setting from '@material-ui/icons/Settings'
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
import account from '@material-ui/icons/AccountCircle'
import List from  '@material-ui/icons/PlaylistPlay'
import PatientsIcon from  '@material-ui/icons/LocalHospitalTwoTone'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx'
import ClinicianPage from 'views/Dashboard/ClinicianDashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import TableList from 'views/TableList/TableList.jsx'
import Typography from 'views/Typography/Typography.jsx'
import NotificationsPage from 'views/Notifications/Notifications.jsx'

// core components/views for RTL layout

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'Dashboard',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: ClinicianPage,
  layout: '/clinician'
},
{
  path: '/patients',
  name: 'Patients',
  rtlName: 'لوحة القيادة',
  icon: PatientsIcon,
  component: ClinicianPage,
  layout: '/clinician'
},
{
  path: '/triagelist',
  name: 'Triage List',
  rtlName: 'لوحة القيادة',
  icon: List,
  component: TableList,
  layout: '/clinician'
},
{
  path: '/profile',
  name: 'Profile',
  rtlName: 'لوحة القيادة',
  icon: account,
  component: ClinicianPage,
  layout: '/clinician'
},
{
  path: '/settings',
  name: 'Settings',
  rtlName: 'لوحة القيادة',
  icon: Setting,
  component: ClinicianPage,
  layout: '/clinician'
},
{
  path: '/logout',
  name: 'Logout',
  rtlName: 'لوحة القيادة',
  icon: TransitEnterexit,
  component: ClinicianPage,
  layout: '/clinician'
}]

export default dashboardRoutes

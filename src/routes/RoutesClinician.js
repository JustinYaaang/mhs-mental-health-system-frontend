// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
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


const dashboardRoutes = [{
  path: '/dashboard',
  name: 'Dashboard',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: ClinicianPage,
  layout: '/clinician'
},
// {
//   path: '/patients',
//   name: 'Patients',
//   rtlName: 'لوحة القيادة',
//   icon: PatientsIcon,
//   component: PatientList,
//   layout: '/clinician'
// },
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
  component: UserProfile,
  layout: '/clinician'
},
{
  path: '/settings',
  name: 'Settings',
  rtlName: 'لوحة القيادة',
  icon: Setting,
  component: Setting,
  layout: '/clinician'
},
{
  path: '/logout',
  name: 'Logout',
  rtlName: 'لوحة القيادة',
  icon: TransitEnterexit,
  component: Dashboard,
  layout: ''
}]

export default dashboardRoutes

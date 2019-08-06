// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import List from  '@material-ui/icons/PlaylistPlay'
import PatientsIcon from  '@material-ui/icons/LocalHospitalTwoTone'
import ClinicianIco from  '@material-ui/icons/ListTwoTone'
// import Out from "@material-ui/icons/ArrowBack";
import Setting from '@material-ui/icons/Settings'
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
// core components/views for Admin layout
import ServiceDashboard from 'views/Dashboard/ServiceDashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import TableList from 'views/TableList/TableList.jsx'
import ClinicianList from 'layouts/Clinicians/ClinicianList.jsx'
import question from '@material-ui/icons/FormatListNumbered'
import SideQuestion from "../views/Forms/SideQuestion"
// core components/views for RTL layout

const dashboardRoutes = [{
  path: '/dashboard',
  name: 'Dashboard',
  rtlName: 'لوحة القيادة',
  icon: Dashboard,
  component: ServiceDashboard,
  layout: '/service'
},
{
  path: '/clinicians',
  name: 'Clinicians',
  rtlName: 'لوحة القيادة',
  icon: ClinicianIco,
  component: ClinicianList,
  layout: '/service'
},
{
  path: '/triagelist',
  name: 'Triage List',
  rtlName: 'لوحة القيادة',
  icon: List,
  component: TableList,
  layout: '/service'
},  
{
  path: '/questionnaire',
  name: 'Questionnaire',
  rtlName: 'لوحة القيادة',
  icon: question,
  component: SideQuestion,
  layout: '/service'
},
{
  path: '/profile',
  name: 'Profile',
  rtlName: 'لوحة القيادة',
  icon: Person,
  component: UserProfile,
  layout: '/service'
},
{
  path: '/settings',
  name: 'Settings',
  rtlName: 'لوحة القيادة',
  icon: Setting,
  component: Setting,
  layout: '/service'
},
{
  path: '/logout',
  name: 'Logout',
  rtlName: 'لوحة القيادة',
  icon: TransitEnterexit,
  component: Dashboard,
  layout: ''
}
]

export default dashboardRoutes

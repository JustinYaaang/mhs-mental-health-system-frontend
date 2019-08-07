// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Setting from '@material-ui/icons/Settings'
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
import ListAlt from '@material-ui/icons/ListAlt' 
import account from '@material-ui/icons/AccountCircle'
import question from '@material-ui/icons/FormatListNumbered'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.jsx'
import UserProfile from 'views/UserProfile/UserProfile.jsx'
import TrustList from 'layouts/Trusts/TrustList.jsx'
import trustdetails from 'layouts/Trusts/TrustDetails.jsx'
import SideQuestionAdmin from "../views/Forms/SideQuestionAdmin"


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
    path: '/trusts',
    name: 'Trusts',
    rtlName: 'لوحة القيادة',
    icon: ListAlt,
    component: TrustList,
    layout: '/admin'
  },
  {
    path: '/questionnaire',
    name: 'Questionnaires',
    rtlName: 'لوحة القيادة',
    icon: question,
    component: SideQuestionAdmin,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'Profile',
    rtlName: 'لوحة القيادة',
    icon: account,
    component: UserProfile,
    layout: '/admin'
  },
  {
    path: '/settings',
    name: 'Settings',
    rtlName: 'لوحة القيادة',
    icon: Setting,
    component: Setting,
    layout: '/admin'
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

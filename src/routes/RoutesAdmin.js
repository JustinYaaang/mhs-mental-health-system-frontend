// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Setting from '@material-ui/icons/Settings'
import TransitEnterexit from '@material-ui/icons/TransitEnterexit'
import ListAlt from '@material-ui/icons/ListAlt' 
//import account from 'routes/node_modules/@material-ui/icons/AccountCircle'
// core components/views for Admin layout
import DashboardPage from '../views/Dashboard/Dashboard.jsx'
import UserProfile from '../views/UserProfile/UserProfile.jsx'
import TrustList from '../layouts/Trusts/TrustList.jsx'
import trustdetails from '../layouts/Trusts/TrustDetails.jsx'



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
    // path: '/services',
    path: '/trusts',
    name: 'Trusts',
    rtlName: 'لوحة القيادة',
    icon: ListAlt,
    component: TrustList,
    layout: '/admin'
  },
  {
    path: '/profile',
    name: 'Profile',
    rtlName: 'لوحة القيادة',
    icon: UserProfile,
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
    component: DashboardPage,
    layout: '/admin'
  }
]

export default dashboardRoutes

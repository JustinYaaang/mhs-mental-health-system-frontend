// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import TrustDetails from 'layouts/Trusts/TrustDetails.jsx'
import PersonForm from "views/Forms/PersonForm.jsx";
import TrustAddForm from "views/Forms/TrustServiceForm.jsx";
import TrustUserDetails from "layouts/Trusts/TrustUserDetails.jsx"
import TrustCreateManager from "layouts/Trusts/TrustCreateManager.jsx"

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/trusts/new',
    name: 'Trust Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustAddForm,
    layout: '/admin'
  },
  {
    path: '/trusts/manager/:id?',
    name: 'Trust Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: PersonForm,
    layout: '/admin'
  },
  {
    path: '/trusts/:id?/manager/new',
    name: 'Trust Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustCreateManager,
    layout: '/admin'
  }, 
  {
    path: '/trusts/:id/:id',
    name: 'Trust Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustUserDetails,
    layout: '/admin'
  },
  {
    path: '/trusts/:id',
    name: 'Trust Overview',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustDetails,
    layout: '/admin'
  }

]

export default dashboardRoutes

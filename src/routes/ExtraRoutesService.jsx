// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import TrustDetails from 'routes/node_modules/layouts/Trusts/TrustDetails.jsx.js'
import PersonForm from "routes/node_modules/views/Forms/PersonForm.jsx.js";
import TrustAddForm from "routes/node_modules/views/Forms/TrustServiceForm.jsx.js";

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/service/new',
    name: 'Service Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustAddForm,
    layout: '/trust'
  },
  {
    path: '/service/manager/:id?',
    name: 'Service Manager Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: PersonForm,
    layout: '/trust'
  },
  {
    path: '/service/:id',
    name: 'Service Overview',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: TrustDetails,
    layout: '/trust'
  }

]

export default dashboardRoutes

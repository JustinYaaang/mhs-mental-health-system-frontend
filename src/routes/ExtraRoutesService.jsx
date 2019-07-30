// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
// core components/views for Admin layout
import TrustDetails from 'layouts/Trusts/TrustDetails.jsx'
import PersonForm from "views/Forms/PersonForm.jsx";
import TrustAddForm from "views/Forms/TrustServiceForm.jsx";
import CreateClinician from 'layouts/Clinicians/CreateClinician';
import ClinicianDetails from 'layouts/Clinicians/ClinicianDetails';

// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: '/service/clinicians/new',
    name: 'Create New Clinician',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: CreateClinician,
    layout: '/trust'
  },
  {
    path: '/service/clinicians/:id?',
    name: 'Clinician Details',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: ClinicianDetails,
    layout: '/trust'
  },

]

export default dashboardRoutes

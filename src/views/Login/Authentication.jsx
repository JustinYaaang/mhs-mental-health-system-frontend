import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// react plugin for creating charts
import ChartistGraph from 'react-chartist'
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles'
import Icon from '@material-ui/core/Icon'
// @material-ui/icons
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import AccessTime from '@material-ui/icons/AccessTime'
import Accessibility from '@material-ui/icons/Accessibility'
import Grade from '@material-ui/icons/Grade'
import Code from '@material-ui/icons/Code'
import All from '@material-ui/icons/AllInboxOutlined'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Tasks from 'components/Tasks/Tasks.jsx'
import CustomTabs from 'components/CustomTabs/CustomTabs.jsx'
import Card from 'components/Card/Card.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardIcon from 'components/Card/CardIcon.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import swal from 'sweetalert'
import InformationCard from 'components/DashboardComponent/InformationCard.jsx'
import LineGraph from 'components/DashboardComponent/LineGraph.jsx'
import CustomInput from 'components/CustomInput/CustomInput'
import 'assets/css/LoginForm.css'
class Authentication extends React.Component {
  // this.loginNow=this.loginNo w.bind(this)

  loginNow () {
    if (document.getElementById('mailInput').value === '' || document.getElementById('passwordInput').value === '') {
      console.log('empty')
    }
  }

  render () {
    const { classes } = this.props

    return (
      <form class='loginform'>
        <div class='form-group'>
          <label class='label-title' for='label'>Welcome to MHS</label>
          <label class='label-subtitle' for='label'>Please enter your login credentials.</label>
          <br />
          <label class='label-header' for='exampleInputEmail1'>Email address</label>
          <input type='email' class='form-control' id='mailInput' aria-describedby='emailHelp' placeholder='Enter email' />
          {/* <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small> */}
        </div>
        <div class='form-group'>
          <label class='label-header' for='exampleInputPassword1'>Password</label>
          <input type='password' class='form-control' id='passwordInput' placeholder='Enter Password' />
        </div>
        <Button
          onClick={() => { this.loginNow() }}
          id='loginbutton' type='button' color='primary'>Login</Button>
      </form>
    )
  }
}

export default Authentication

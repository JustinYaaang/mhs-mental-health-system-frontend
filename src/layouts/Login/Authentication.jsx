import React from 'react'
import 'assets/css/LoginForm.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as sessionActions from '../../actions/SessionActions'
import Button from 'components/CustomButtons/Button.jsx'

class Authentication extends React.Component {
  constructor (props) {
    super(props)
    this.state = { credentials: { email: '', password: '' } }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onChange (event) {
    const field = event.target.name
    const credentials = this.state.credentials
    credentials[field] = event.target.value
    return this.setState({ credentials: credentials })
  }

  onSave (event) {
    var flag = true
    if (this.state.credentials.email === '') {
      document.getElementById('maillabel').innerHTML = 'Please fill your email address'
      document.getElementById('mailInput').style.backgroundColor = '#FEC2C2'
      flag = false
    }
    if (this.state.credentials.password === '') {
      document.getElementById('passlabel').innerHTML = 'Please fill your password'
      document.getElementById('passwordInput').style.backgroundColor = '#FEC2C2'
      flag = false
    }
    if (flag) {
      document.getElementById('passwordInput').style.backgroundColor = 'white'
      document.getElementById('mailInput').style.backgroundColor = 'white'
      event.preventDefault()
      var auth = this.props.actions.logInUser(this.state.credentials)
      auth.then(response => {
        if (!response) {
          document.getElementById('mainlabel').style.color = 'red'
          document.getElementById('mainlabel').innerHTML = 'Wrong Username/Password'
        }
      })
    }
  }

  render () {
    return (
      <form class='loginform'>
        <div class='form-group'>
          <label className='label-title' for='label'>Welcome to MHS</label>
          <label className='label-subtitle' id='mainlabel' for='label'>Please enter your login credentials.</label>
          <br />
          <label className='label-header' id='maillabel' for='exampleInputEmail1'>Email address</label>
          <input name='email' type='email' class='form-control' id='mailInput' aria-describedby='emailHelp' placeholder='Enter email' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <label className='label-header' id='passlabel' for='exampleInputPassword1'>Password</label>
          <input name='password' type='password' class='form-control' id='passwordInput' placeholder='Enter Password' onChange={this.onChange} />
        </div>
        <Button onClick={this.onSave} id='loginbutton' type='button' color='primary'>Login</Button>
      </form>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Authentication)

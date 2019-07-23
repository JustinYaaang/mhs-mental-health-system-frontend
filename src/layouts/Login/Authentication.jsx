import React from 'react'
import 'assets/css/LoginForm.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/SessionActions';
import Button from 'components/CustomButtons/Button.jsx'

class Authentication extends React.Component {

  constructor(props) {
    super(props);
    this.state = {credentials: {email: '', password: ''}}
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({credentials: credentials});
  }

  onSave(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.state.credentials);
  }

  render () {

    return (

            <form class='loginform'>
        <div class='form-group'>
          <label class='label-title' for='label'>Welcome to MHS</label>
          <label class='label-subtitle' for='label'>Please enter your login credentials.</label>
          <br />
          <label class='label-header' for='exampleInputEmail1'>Email address</label>
          <input name='email'  type='email' class='form-control' id='mailInput' aria-describedby='emailHelp' placeholder='Enter email' onChange={this.onChange} />
          {/* <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small> */}
        </div>
        <div class='form-group'>
          <label class='label-header' for='exampleInputPassword1'>Password</label>
          <input name='password' type='password' class='form-control' id='passwordInput' placeholder='Enter Password' onChange={this.onChange} />
        </div>
        <Button onClick={this.onSave} id='loginbutton' type='button' color='primary'>Login</Button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Authentication);
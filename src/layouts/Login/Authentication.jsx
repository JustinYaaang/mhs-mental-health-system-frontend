import React from 'react'
import 'assets/css/LoginForm.css'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/SessionActions';

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
      <form className='loginform'>
        <div className='form-group'>
          <label className='label-header' htmlFor='exampleInputEmail1'>Email address</label>
          <input name='email' type='email' class='form-control' id='exampleInputEmail1' 
            aria-describedby='emailHelp' placeholder='Enter email'
            onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <label class='label-header' htmlFor='exampleInputPassword1'>Password</label>
          <input name='password' type='password' class='form-control' id='exampleInputPassword1' 
            placeholder='Password' 
            onChange={this.onChange}/>
        </div>
        {/* <div class='form-check'>
          <label class='form-check-label'>
            <input class='form-check-input' type='checkbox' value='' />
                Option one is this
            <span class='form-check-sign'>
              <span class='check' />
            </span>
          </label>
        </div> */}

        <button type='submit' class='btn btn-primary' onClick={this.onSave}>Submit</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Authentication);

// export default Authentication

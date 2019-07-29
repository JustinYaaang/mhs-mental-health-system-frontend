import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'
import { getPersonnel, updatePersonnel, createPersonnel } from 'services/BackendService.js'
import swal from 'sweetalert'

/**
 * Component that displays a form for a Trust Manager, Service Manager, Clinitian
 */
class PersonForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: this.props.id,
      hasDetails: this.props.hasDetails
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount () {
    console.log(this.state.hasDetails)
    if (this.state.hasDetails) {
      console.log('in  person form' + this.state.id)
      getPersonnel(this.state.id).then(response => {
        console.log(response)
        document.getElementById('firstnameinput').value = response.first_name
        document.getElementById('lastnameinput').value = response.last_name
        document.getElementById('emailinput').value = response.email
        document.getElementById('passwordinput').value = response.password
        document.getElementById('trustnameinput_postcodeinput').value = response.role //! !!!
      })
    } else {
      // document.getElementById('trustnameinput_postcodeinput').value = 'TRUSTMANAGER'
    }
    // if patient
    // document.getElementById("trustnameinput_postcodeinput").placeholder="Postcode"
  }

  onChange (event) {
  }

  onSave (event) {
    var body = {
      id: this.state.id,
      body: {
        first_name: document.getElementById('firstnameinput').value,
        last_name: document.getElementById('lastnameinput').value,
        email: document.getElementById('emailinput').value,
        role: 'TRUSTMANAGER'

      }
    }
    var flag = false
    var pass1 = document.getElementById('passwordchange1').value
    var pass2 = document.getElementById('passwordchange2').value
    if (pass1 !== '' || pass2 !== '') {
      if (pass2 !== pass1) {
        document.getElementById('passwordlabel').innerHTML = 'Passwords dont match.'
        document.getElementById('passwordchange1').style.backgroundColor = '#ED4747'
        document.getElementById('passwordchange2').style.backgroundColor = '#ED4747'
        return
      } else {
        body.body.password = pass1
        body.body.organisation_id = sessionStorage.organizationID
        flag = true
      }
    }

    if (this.state.hasDetails) {
      updatePersonnel(body).then(response => {
        console.log(response)
        document.getElementById('passwordchange1').value = ''
        document.getElementById('passwordchange2').value = ''
        swal('The entry has been updated!', {
          icon: 'success'
        })
      })
    } else {
      if (!flag) {
        document.getElementById('passwordlabel').innerHTML = 'Please specify a password.'
        document.getElementById('passwordchange1').style.backgroundColor = '#ED4747'
        document.getElementById('passwordchange2').style.backgroundColor = '#ED4747'
      }
      createPersonnel(body.body).then(response => {
        swal('The entry has been updated!', {
          icon: 'success'
        })
        this.componentWillMount()
        console.log(response)
      })
    }
  }

  render () {
    return (
      <form class='trustform'>
        <label className='label-subtitle' for='label'>Please enter the details of the NHS Person</label>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='firstnameinput' aria-describedby='emailHelp' placeholder='First Name' onChange={this.onChange} />
          <br />

          <input name='email' type='email' class='form-control' id='lastnameinput' aria-describedby='emailHelp' placeholder='Last Name' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='emailinput' aria-describedby='emailHelp' placeholder='email' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='passwordinput' aria-describedby='emailHelp' placeholder='password' onChange={this.onChange} readOnly />
          <br />
          <input name='email' type='email' class='form-control' id='trustnameinput_postcodeinput' aria-describedby='emailHelp' placeholder='Trust Name' value={sessionStorage.organizationID}onChange={this.onChange} readOnly />
        </div>
        <br />
        <label className='label-subtitle' id='passwordlabel' for='label'>{this.state.hasDetails ? 'Change the password here:' : 'Enter password here:'}</label>
        <div>
          <input name='email' type='email' class='form-control' id='passwordchange1' aria-describedby='emailHelp' placeholder='Enter password' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='passwordchange2' aria-describedby='emailHelp' placeholder='Enter password again' onChange={this.onChange} />

        </div>
        <Button onClick={this.onSave} id='loginbutton' type='button' color='primary'>Save</Button>
      </form>
    )
  }
}

export default PersonForm

// id
// name
// address line 1
// address line 2
// post code
// description
// website link
// email
// telephone

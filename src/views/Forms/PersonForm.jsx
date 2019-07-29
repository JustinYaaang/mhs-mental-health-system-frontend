import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'
import { getPersonnel,updatePersonnel} from 'services/BackendService.js'
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
    console.log('in  person form' + this.state.id)
    getPersonnel(this.state.id).then(response => {
      console.log(response)
      document.getElementById('firstnameinput').value = response.first_name
      document.getElementById('lastnameinput').value = response.last_name
      document.getElementById('emailinput').value = response.email
      document.getElementById('passwordinput').value = response.password
      document.getElementById('trustnameinput_postcodeinput').value = response.role //! !!!
    })
    // if patient
    // document.getElementById("trustnameinput_postcodeinput").placeholder="Postcode"
  }

  onChange (event) {
  }

  onSave (event) {
    var body={
      id:this.state.id,
      body:{
        first_name:document.getElementById('firstnameinput').value,
        last_name:document.getElementById('lastnameinput').value,
        email:document.getElementById('emailinput').value,
        password:document.getElementById('passwordinput').value,
        role:document.getElementById('trustnameinput_postcodeinput').value
      }
    }
    updatePersonnel(body).then(response => {
      console.log(response)
    })
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
          <input name='email' type='email' class='form-control' id='passwordinput' aria-describedby='emailHelp' placeholder='password' onChange={this.onChange} readOnly/>
          <br />
          <input name='email' type='email' class='form-control' id='trustnameinput_postcodeinput' aria-describedby='emailHelp' placeholder='Trust Name' onChange={this.onChange} readOnly/>
        </div>
        <br />
        <label className='label-subtitle' for='label'>Change the password here:</label>
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

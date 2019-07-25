import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'

class PersonForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
        id: '',
        hasDetails:'false',
        formDetails:''    
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    //if patient
   //document.getElementById("trustnameinput_postcodeinput").placeholder="Postcode"
}

  onChange (event) {
  }

  onSave (event) {
    
  }

  render () {
    return (
      <form class='trustform'>
        <label className='label-subtitle' for='label'>Please enter the details of the NHS Person</label>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='firstnameinput' aria-describedby='emailHelp' placeholder='First Name' onChange={this.onChange} />
          <br/>
          
          <input name='email' type='email' class='form-control' id='lastnameinput' aria-describedby='emailHelp' placeholder='Last Name' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='emailinput' aria-describedby='emailHelp' placeholder='email' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='passwordinput' aria-describedby='emailHelp' placeholder='password' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='trustnameinput_postcodeinput' aria-describedby='emailHelp' placeholder='Trust Name' onChange={this.onChange} />
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

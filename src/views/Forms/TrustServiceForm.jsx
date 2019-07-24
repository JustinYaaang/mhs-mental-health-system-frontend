import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'

class TrustAddForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
        id: '',
        hasDetails:'false'    
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount () {
    const { id } = this.props.match.params
    if(id!=''){
        var hasDetails:'true'
        
    }

}

  onChange (event) {
  }

  onSave (event) {
    var trustdetails = {
      name: document.getElementById('nameinput').value,
      address1: document.getElementById('address1input').value,
      address2: document.getElementById('address2input').value,
      postcode: document.getElementById('postcodeinput').value,
      description: document.getElementById('descriptioninput').value,
      website: document.getElementById('websiteinput').value,
      email: document.getElementById('emailinput').value,
      telephone: document.getElementById('telephoneinput').value
    }
    console.log(trustdetails)
  }

  render () {
    return (
      <form class='trustform'>
        <label className='label-subtitle' for='label'>Please enter the details of the NHS Trust.</label>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='nameinput' aria-describedby='emailHelp' placeholder='Name' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='address1input' aria-describedby='emailHelp' placeholder='Address Line 1' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='address2input' aria-describedby='emailHelp' placeholder='Address Line 2' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='postcodeinput' aria-describedby='emailHelp' placeholder='Postcode' onChange={this.onChange} />
        </div>
        <div class='form-group'>
          <input name='email' type='email' class='form-control' id='descriptioninput' aria-describedby='emailHelp' placeholder='Description' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='websiteinput' aria-describedby='emailHelp' placeholder='Website link' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='emailinput' aria-describedby='emailHelp' placeholder='email' onChange={this.onChange} />
          <br />
          <input name='email' type='email' class='form-control' id='telephoneinput' aria-describedby='emailHelp' placeholder='Telephone' onChange={this.onChange} />
        </div>

        <Button onClick={this.onSave} id='loginbutton' type='button' color='primary'>Submit</Button>
      </form>
    )
  }
}

export default TrustAddForm

// id
// name
// address line 1
// address line 2
// post code
// description
// website link
// email
// telephone

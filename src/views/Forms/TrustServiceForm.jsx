import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'
import { getTrust,updateTrust } from 'services/BackendService'
import { getOrganization ,updateOrganization} from 'services/BackendService';
class TrustAddForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      hasDetails: 'false'
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount() {
    console.log(this.props)
    const { id } = this.props.id
    const { organization } = this.props.organization
    getOrganization(id).then(response => {

      response = { 'message': 'Organisation retrieved successfully', 'data': [{ '_id': '5d3aff5326edba12fa4c5c98', 'role': 'SERVICE', 'name': 'Barts Mental Health Clinic', 'address1': '134 Barts Road', 'address2': '', 'postcode': 'BRTS1B', 'description': 'Barts Mental Health Clinic', 'link': 'barts.nhs.gov.uk', 'email': 'barts@nhs.gov.uk', 'telephone': '033448796645' }] }
      // getmanagers.then{
      var details = response.data[0]
      document.getElementById('nameinput').value = details.name
      document.getElementById('address1input').value = details.address1
      document.getElementById('address2input').value = details.address2
      document.getElementById('postcodeinput').value = details.postcode
      document.getElementById('descriptioninput').value = details.description
      document.getElementById('websiteinput').value = details.link
      document.getElementById('emailinput').value = details.email
      document.getElementById('telephoneinput').value = details.telephone
      // }
    })
  }

  onChange(event) {
  }

  onSave(event) {
    var trustdetails = {
      name: document.getElementById('nameinput').value,
      address1: document.getElementById('address1input').value,
      address2: document.getElementById('address2input').value,
      postcode: document.getElementById('postcodeinput').value,
      description: document.getElementById('descriptioninput').value,
      link: document.getElementById('websiteinput').value,
      email: document.getElementById('emailinput').value,
      telephone: document.getElementById('telephoneinput').value
    }
    updateOrganization(trustdetails).then(response => {
      console.log(response)
    })
    console.log(trustdetails)
  }

  render() {
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

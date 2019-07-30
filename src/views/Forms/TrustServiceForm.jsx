import React from 'react'
import 'assets/css/AddForm.css'
import Button from 'components/CustomButtons/Button.jsx'
import { getOrganizations, updateOrganization, createOrganization } from 'services/BackendService'
import swal from 'sweetalert2'
/**
 * Component that displays a form for a Trust or a Service
 */
class TrustAddForm extends React.Component {
  constructor (props) {
    super(props)
    var organization = ''
    var details = false
    // if we came fro history push there are no arguments so we search in the url
    if (this.props.hasDetails === undefined) {
      if (this.props.location.pathname === '/trust/service/new') {
        organization = 'service'
      } else {
        organization = 'trust'
      }
    } else {
      organization = this.props.organization
      details = true
    }

    this.state = {
      id: this.props.id, // the ID
      // hasDetails:true => form in edit mode(the form is populated)
      // hasDetails:false => form in creation mode(the form is not populated)
      hasDetails: details,
      // Organization type: 1)trust, 2)service
      organization: organization
    }
    console.log(this.props)

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentWillMount () {
    if (this.state.organization == 'trust') {
      if (this.state.hasDetails) {
        getOrganizations(this.state.id).then(response => {
          try {
            document.getElementById('nameinput').value = response.name
            document.getElementById('address1input').value = response.address1
            document.getElementById('address2input').value = response.address2
            document.getElementById('postcodeinput').value = response.postcode
            document.getElementById('descriptioninput').value = response.description
            document.getElementById('websiteinput').value = response.link
            document.getElementById('emailinput').value = response.email
            document.getElementById('telephoneinput').value = response.telephone
          } catch (error) {
            console.log(error + '\n' + response)
          }
        })
      }
    } else if (this.state.organization == 'service') {
      if (this.state.hasDetails) {
        getOrganizations(this.state.id).then(response => {
          try {
            document.getElementById('nameinput').value = response.name
            document.getElementById('address1input').value = response.address1
            document.getElementById('address2input').value = response.address2
            document.getElementById('postcodeinput').value = response.postcode
            document.getElementById('descriptioninput').value = response.description
            document.getElementById('websiteinput').value = response.link
            document.getElementById('emailinput').value = response.email
            document.getElementById('telephoneinput').value = response.telephone
          } catch (error) {
            console.log(error + '\n' + response)
          }
        })
      }
    }
  }

  onChange (event) {
  }

  onSave (event) {
    if (!this.allFieldsCompleted()) {
      return
    }
    if (this.state.organization === 'trust' || this.state.organization === 'service') {
      var trustdetails = {
        name: document.getElementById('nameinput').value,
        address1: document.getElementById('address1input').value,
        address2: document.getElementById('address2input').value,
        postcode: document.getElementById('postcodeinput').value,
        description: document.getElementById('descriptioninput').value,
        link: document.getElementById('websiteinput').value,
        email: document.getElementById('emailinput').value,
        telephone: document.getElementById('telephoneinput').value,
        role: 'TRUST'
      }

      var body = {
        id: this.state.id,
        body: trustdetails
      }
      if (this.state.hasDetails) {
        updateOrganization(body).then(response => {
          console.log(response)
          swal('The entry has been updated!', {
            icon: 'success'
          })
          this.componentWillMount()
        })
      } else {
        console.log(trustdetails)
        createOrganization(trustdetails).then(response => {
          console.log(response)
          swal('The entry has been created!', {
            icon: 'success'
          })
          this.componentWillMount()
        })
      }
    }
    // else{ IF there are different fields in for service
    //
    // }
  }

  allFieldsCompleted () {
    var a = document.getElementById('nameinput').value
    var b = document.getElementById('address1input').value
    var c = document.getElementById('address2input').value
    var d = document.getElementById('postcodeinput').value
    var e = document.getElementById('descriptioninput').value
    var f = document.getElementById('websiteinput').value
    var g = document.getElementById('emailinput').value
    var h = document.getElementById('telephoneinput').value
    if (a === '' || b === '' || c === '' || d === '' || e === '' || f === '' || g === '' || h === '') {
      swal('Please fill all the fields!', {
        icon: 'error'
      })
      return false
    }
    return true
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

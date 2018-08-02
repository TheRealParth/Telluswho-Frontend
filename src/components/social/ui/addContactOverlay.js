import React from 'react'
import { uploadContact } from '../../../actions/surveyAction'
import { connect } from 'react-redux'
@connect((store) => {
  return {
		user: store.user.user ? store.user.user : store.survey.user,
		profile: store.survey.profile,
		progress:store.survey.progress,
    interests:store.survey.interests ? store.survey.interests : store.survey.profile.interests,
    contacts: store.survey.contacts,
  }
})
export default class AddContactOverlay extends React.Component {
  constructor (props) {
    super();
      this.state = {
        firstName: '',
        lastName: '',
        email: [],
        phone: [],
        error: ""
      }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState))
  }
  getName = () => {
    return ((this.state.firstName ? this.state.firstName : "First") + (this.state.lastName ? this.state.lastName : "Last"))
  }
  getImage = () => {
      var avatarURL = 'http://api.adorable.io/avatars/50/' + this.getName() + '.jpg'
      return (<img src={avatarURL} className='userImg' style={{ minWidth: '30px',marginBottom: '0px', float: 'left', minHeight: '30px' }} />)
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.createContact()
    }
  }
  handleFirstName (event) {
    this.setState({ firstName:event.target.value })
  }
  handleLastName (event) {
    this.setState({ lastName:event.target.value })
  }
  handleEmail (event) {
    this.setState({ email:event.target.value })
  }
  handleContact (event) {
    this.setState({ phone: event.target.value })
  }
  createContact = () => {
    if(this.state.firstName.length) {
        this.props.dispatch(uploadContact({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          emails: this.state.email.length ? [this.state.email] : [],
          phones: this.state.phone.length ? ["+1" + this.state.phone] : []
        }
      )).then(()=>{
        if(!this.props.contacts.error){
          this.props.hideAddContact()
        } else {
          this.setState({error: this.props.contacts.error})
        }
      })
    } else {
      this.setState({error: "You must fill out at least the first name of the contact"})
    }
  }
  render () {
    return(
      <div className='edit_overlay' >
        <div className='overlay-inner-div' style={{ 'paddingRight':'5%', height: '100px' }}>
          <div className='success-message-container'>
              <div className='error'> {this.state.error} </div>
            <div id='self' className='contactCard no-highlight'>
              Please enter the information for your contact below: <br/>
              <div>
                <div className='row margin0'>
                  <div className='col-md-12 col-sm-12 formBox'>
                  {this.getImage()}
                  <h3 className='contactName'>
                    {this.state.firstName || '' } {this.state.lastName || ""}
                  </h3>
                  <p id='self' className='phone'>{this.state.phone.length ? this.state.phone : '' }</p>
                  <p id='self' className='email'>{this.state.email.length ? this.state.email : '' }</p>
                  </div>
                </div>

                <div>

                </div>
                  <div className='auth_input'>
                    <input style={{ width: '47.5%', marginRight: '5%' }} type='text' value={this.state.firstName} onKeyPress={this.handleKeyPress} onChange={this.handleFirstName.bind(this)} placeholder='First Name' />
                    <input style={{ width: '47.5%' }} type='text' value={this.state.lastName} onKeyPress={this.handleKeyPress} onChange={this.handleLastName.bind(this)} placeholder='Last Name (optional)' />
                  </div>

                  <div className='auth_input'>
                    <input type='email' value={this.state.email} onKeyPress={this.handleKeyPress} onChange={this.handleEmail.bind(this)} placeholder='Email (optional)' />
                  </div>
                  <div className='auth_input'>
                    <input type='text' maxLength='10' value={this.state.phone} onKeyPress={this.handleKeyPress} onChange={this.handleContact.bind(this)} placeholder='Mobile Number (optional)' />
                  </div>
              </div>
            </div>
          </div>
          <button className='btn btn-primary continue_btn pull-right' style={{marginTop: '-190px'}} onClick={() => { this.createContact() }}>Create</button>
          <a  style={{position: 'absolute', top: '450px'}} onClick={()=>{this.props.hideAddContact()}}>close window</a>
        </div>
      </div>
    )
  }
}

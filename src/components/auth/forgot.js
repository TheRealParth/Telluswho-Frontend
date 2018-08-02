import React from 'react'
import { connect } from 'react-redux'
import { sendResetPasswordLink } from '../../actions/userAuth'
import { loadSurveyData } from '../../actions/surveyAction'
import { browserHistory } from 'react-router'
import Header from '../../pages/ui/header'
import Footer from '../../pages/ui/footer'

@connect((store) => {
  return {
    user: store.user.user,
    error: store.user.error,
    userFetched: store.user.isLoggedIn,
    redirectURL: store.user.redirectURL
  }
})

export default class Forgot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      error: '',
      requestSent: false,
      isReset: false
 		}
  }
  handleEmail = (event) => {
    this.setState({ email:event.target.value })
  }
  handlePwd = (event) => {
    this.setState({ password:event.target.value })
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit()
    }
  }
  handleSubmit = () => {
    if (this.state.email != '') {
      this.setState({ requestSent: true })
      this.props.dispatch(sendResetPasswordLink(this.state.email)).then(() => {
        this.setState({ requestSent: false })
        if (this.props.error) {
          this.setState({ error: 'Invalid email or no user exists by that email' })
        } else {
          this.setState({ isReset: true })
          this.props.dispatch(loadSurveyData())
        }
      })
    } else {
      this.setState({ error: 'Please enter a valid email address' })
    }
  }
 	nextPage = (page) => {
 		browserHistory.push(page)
 	}
  render () {
	    return (
  <div className='auth_content' style={{ 'marginTop':'-2%' }}>
    <Header />
    <div className='edit_overlay' style={{ display: this.state.isReset ? '' : 'none' }}>
      <div className='overlay-inner-div' style={{ 'padding-right':'5%', height: '100px' }}>
        <div className='success-message-container'>
          <h3 className='success-message'>The email has been sent succesfully.<br />
                Check your email for instructions on resetting your password.</h3>
        </div>
        <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.nextPage('/') }}>Continue</button>
      </div>
    </div>
    <div className='error'>
      {this.state.error}
    </div>
    <div className='welcome_content' style={{ 'width':'30%', marginBottom: '20%' }}>
      <div className='auth_title'>Reset Password</div>
      <div className='auth_form'>
              Enter the email you used to sign up below, you will be sent an email with a reset link.
  					<div className='auth_input'>
    <input type='email' value={this.state.email} onKeyPress={this.handleKeyPress} onChange={this.handleEmail} placeholder='Your non NJIT email' />
  				    </div>
        <div style={{ 'height':'40px', marginTop: '10px' }}>
          <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.handleSubmit() }}>Send</button>
        </div>
        <div className='link_div' >
          <span disabled={this.state.requestSent} onClick={() => { this.nextPage('/terms') }}>New User?</span>
          <span className='pull-right' onClick={() => { this.nextPage('/') }}>Go back</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
	 	)
 	}
}

import React from 'react'
import { connect } from 'react-redux'
import { setNewPassword } from '../../actions/userAuth'
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

export default class SetPassword extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
 			confirmPassword:'',
      password: '',
      error: '',
      requestSent: false,
      isSet: false
 		}
  }
  handleUName = (event) => {
    this.setState({ username:event.target.value })
  }
  handlePwd = (event) => {
    this.setState({ password:event.target.value })
  }
  handleConfirmPwd = (event) => {
    this.setState({ confirmPassword:event.target.value })
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit()
    }
  }
  handleSubmit = () => {
    if ((this.state.password != '') && (this.state.password == this.state.confirmPassword)) {
      this.setState({ requestSent: true })
      this.props.dispatch(setNewPassword(this.props.params.email, this.props.params.code, this.state.password)).then(() => {
        this.setState({ requestSent: false })
        if (this.props.error) {
          this.setState({ error: this.props.error })
        } else if (!this.props.error) {
          this.setState({ isSet: true })
        }
      })
    }
  }
 	nextPage = (page) => {
 		browserHistory.push(page)
 	}
  render () {
	    return (
  <div className='auth_content' style={{ 'marginTop':'-2%' }}>
    <Header />
    <div className='edit_overlay' style={{ display: this.state.isSet ? '' : 'none' }}>
      <div className='overlay-inner-div' style={{ 'padding-right':'5%', height: '100px' }}>
        <div className='success-message-container'>
          <h3 className='success-message'>Your password has been updated succesfully.<br />
          </h3>
        </div>
        <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.nextPage('/login') }}>Sign in</button>
      </div>
    </div>
    <div className='error'>
      {this.state.error}
    </div>
    <div className='welcome_content' style={{ 'width':'30%', marginBottom: '20%' }}>
      <div className='auth_title'>Enter your new password</div>
      <div className='auth_form'>
        <div className='auth_input'>
          <input type='password' placeholder='Password' onKeyPress={this.handleKeyPress} value={this.state.password} onChange={this.handlePwd} />
        </div>
        <div className='auth_input'>
          <input type='password' placeholder='Confirm Password' onKeyPress={this.handleKeyPress} value={this.state.confirmPassword} onChange={this.handleConfirmPwd} />
        </div>
        <div style={{ 'height':'40px', marginTop: '10px' }}>
          <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.handleSubmit() }}>Set</button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
	 	)
 	}
}

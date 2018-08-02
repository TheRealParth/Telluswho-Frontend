import React from 'react'
import { connect } from 'react-redux'
import { login, forgotPassword } from '../../actions/userAuth'
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

export default class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
 			username:'',
 			password:'',
      error: '',
      requestSent: false
 		}
    this.handleUName = this.handleUName.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.handlePwd = this.handlePwd.bind(this)
  }
  handleUName (event) {
    this.setState({ username:event.target.value })
  }
  handlePwd (event) {
    this.setState({ password:event.target.value })
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit()
    }
  }
  handleSubmit = () => {
    if (this.state.username != '' && this.state.password != '' && !this.state.requestSent) {
      this.setState({ requestSent: true })
      this.props.dispatch(login(this.state.username, this.state.password)).then(() => {
        this.setState({ requestSent: false })
        
        
        if (this.props.error) {
          this.setState({ error: this.props.error })
        } else if (this.props.user) {
          this.props.dispatch(loadSurveyData())
          browserHistory.push('/home')
        }
      })
    }
  }
 	nextPage (page) {
 		browserHistory.push(page)
 	}
  render () {
	    return (
  <div className='auth_content' style={{ 'marginTop':'-2%' }}>
    <Header />
    <div className='error'>
      {this.state.error}
    </div>
    <div className='welcome_content' style={{ 'width':'30%', marginBottom: '20%' }}>
      <div className='auth_title'>Sign in</div>
      <div className='auth_form'>
        <div className='auth_input'>
          <input type='text' placeholder='Username' value={this.state.username} onChange={this.handleUName} />
        </div>
        <div className='auth_input'>
          <input type='password' placeholder='Password' onKeyPress={this.handleKeyPress} value={this.state.password} onChange={this.handlePwd} />
        </div>
        <div style={{ 'height':'40px', marginTop: '10px' }}>
          <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.handleSubmit() }}>Login</button>
        </div>
        <div className='link_div' >
          <span disabled={this.state.requestSent} onClick={() => { this.nextPage('/terms') }}>New User?</span>
          <span className='pull-right' onClick={() => { this.nextPage('/forgot') }}>Forgot Password?</span>
        </div>
      </div>
    </div>
    <Footer />
  </div>
	 	)
 	}
}

import React from 'react'
import { register } from '../../actions/userAuth'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Header from '../../pages/ui/header'
import Footer from '../../pages/ui/footer'
import { regexUCID, regexPhone, regexEmail } from './helpers/regex';

@connect((store) => {
  return {
    user: store.user.user,
    userFetched:store.user.isLoggedIn,
    signup: store.user.signup,
    error: store.user.error ? store.user.error : false
  }
})

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)
    // this.state = {
    //   name:'Parth',
    //   lastname:'Patel',
    //   email:'psyrotix@gmail.com',
    //   contact:'6097050224',
    //   ucid: 'prp66',
    //   username: 'psyrotix',
    //   password: 'lolTroll1',
    //   confirmPassword: 'lolTroll1',
    //   error: '',
    //   requestSent: false,
    // }
    this.state = {
      name:'',
      lastname:'',
      email:'',
      contact:'',
      ucid: '',
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
      requestSent: false,
    }
  }
  handleName (event) {
    this.setState({ name:event.target.value })
  }
  handleLastname (event) {
    this.setState({ lastname:event.target.value })
  }
  handleEmail (event) {
    this.setState({ email:event.target.value })
  }
  handleContact (event) {
    this.setState({ contact:event.target.value })
  }
  handleUsername (event) {
    this.setState({ username:event.target.value })
  }
  handlePassword (event) {
    this.setState({ password:event.target.value })
  }
  handleConfirmPassword (event) {
    this.setState({ confirmPassword:event.target.value })
  }
  handleUCID (e) {
    this.setState({ ucid:e.target.value })
  }
  handleSubmit (e) {

    var phone = '+1' + this.state.contact

    if (!phone.match(regexPhone)) {
      this.setState({ error: 'Invalid Phone' })
    } else if (this.state.email.indexOf('njit.edu') > -1){
      this.setState({ error: 'Dont enter your njit email in non NJIT email' })
    } else if (!this.state.email.match(regexEmail)) {
      this.setState({ error: 'Invalid Email' })
    } else if (this.state.confirmPassword != this.state.password) {
      this.setState({ error: "Passwords don't match" })
    } else if (this.state.ucid.indexOf('@') > -1) {
      this.setState({ error: 'Invalid UCID, do not include @njit.edu' })
    } else if (this.state.name != '' && this.state.lastname != '' && this.state.email != '' && this.state.username != '' && this.state.password != '') {
      this.setState({ requestSent: true })
      this.props.dispatch(register(this.state.name, this.state.lastname, this.state.email, this.state.username, this.state.password, this.state.ucid, phone)).then((res) => {
        if (this.props.error) {
          this.setState({requestSent: false, error: this.props.error })
        } else {
          setTimeout(()=>{
            browserHistory.replace('/home')
          }, 150);
        }
      })
    }
  }
  handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      this.handleSubmit()
    }
  }

  render () {
    return (
      <div className='auth_content' style={{ 'marginTop':'-2%' }}>
        <Header />
        <div className='error'>
          {this.state.error}
        </div>
        <div className='welcome_content' style={{ 'width':'30%' }}>

          <div className='auth_title'>Sign up</div>
          <div className='auth_form'>
            <div className='auth_input'>
              <input style={{ width: '47.5%', marginRight: '5%' }} type='text' value={this.state.name} onKeyPress={this.handleKeyPress} onChange={this.handleName.bind(this)} placeholder='First Name' />
              <input style={{ width: '47.5%' }} type='text' value={this.state.lastname} onKeyPress={this.handleKeyPress} onChange={this.handleLastname.bind(this)} placeholder='Last Name' />
            </div>

            <div className='auth_input'>
              <input type='email' value={this.state.email} onKeyPress={this.handleKeyPress} onChange={this.handleEmail.bind(this)} placeholder='Your non NJIT email' />
            </div>
            <div className='auth_input'>
              <input type='text' value={this.state.ucid} onKeyPress={this.handleKeyPress} onChange={this.handleUCID.bind(this)} placeholder='UCID (ex: asf123)' />
            </div>
            <div className='auth_input'>
              <input type='text' maxLength='10' value={this.state.contact} onKeyPress={this.handleKeyPress} onChange={this.handleContact.bind(this)} placeholder='Mobile Number' />
            </div>
            <div className='auth_input'>
              <input type='text' value={this.state.username} onKeyPress={this.handleKeyPress} onChange={this.handleUsername.bind(this)} placeholder='Username' />
            </div>
            <div className='auth_input'>
              <input type='password' value={this.state.password} onKeyPress={this.handleKeyPress} onChange={this.handlePassword.bind(this)} placeholder='Password' />
            </div>
            <div className='auth_input'>
              <input type='password' value={this.state.confirmPassword} onKeyPress={this.handleKeyPress} onChange={this.handleConfirmPassword.bind(this)} placeholder='Confirm Password' />
            </div>
            <div style={{ height:'40px', marginTop: '10px' }}>
              <button className='btn btn-primary continue_btn pull-right' onClick={this.handleSubmit.bind(this)}>Sign up</button>
            </div>

          </div>

        </div>
        <Footer />
      </div>
    )
  }
}

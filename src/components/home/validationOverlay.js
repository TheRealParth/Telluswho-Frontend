import React from 'react'
import { browserHistory } from 'react-router'
import { verifyPhone } from '../../actions/userAuth'
import { logout } from '../../actions/userAuth'
import { loadSurveyData } from '../../actions/surveyAction.js'
import { connect } from 'react-redux'
import Select from 'react-select'
import Header from '../../pages/ui/header'
var _ = require('lodash')

@connect((store) => {
  return {
    error: store.user.error ? store.user.error : false,
    user: _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
    userFetched: store.user.isLoggedIn
  }
})

export default class ValidationOverlay extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      code:'',
      error: '',
      phone: '',
      shouldLoad: false
    }

  }
  componentWillReceiveProps (nextProps, nextState) {
    this.setState({ phone: nextProps.user.phones[0].id })
  }
  componentDidMount () {
    this.setState({ phone: this.props.user.phones[0].id })
  }
  handleCode = (event) => {
    this.setState({ code:event.target.value })
  }
  logout () {
    this.props.dispatch(logout())
  }
  handleDropdown = (i) => {
    this.setState({ phone: this.props.user.phones[i.value].id })
  }
  handleSubmit = () => {
    this.props.dispatch(verifyPhone(this.state.phone, this.state.code)).then(() => {
      if (this.props.error) {
        this.setState({ error: 'Invalid code' })
      }
    })
  }
  getPhones=() => {
    return this.props.user.phones ? this.props.user.phones : { value: 0, label: 'loading' }
  }
  render () {
    return (
      <div className='validate_overlay'>
        <Header />
        <div className='overlay-inner-div' style={{ marginTop: '2%' }}>
          <h3>Please validate your phone number.</h3>
          <div className='error'> {this.props.error} </div>
          <div className='col-md-12 col-sm-12 formBox'>
            <div className='formWrapper' style={{ borderBottom: 0 + 'px' }}>
              <label>Select Phone Number</label>
              <Select style={{ width: '154px' }} className='customDropdown' value={{ label: this.props.user.phones[0].id ? this.props.user.phones[0].id : 'loading', value: 0 }} onChange={this.handleDropdown}
                options={this.getPhones().map((phone, i) => { return { value: i, label: phone.id } })} placeholder='Select your phone number' />
              <br />
              <label>Enter the code you received.</label>
              <br />
              <input style={{ width: 'auto' }} type='text' pattern='([0-9][0-9][0-9][0-9])' maxLength='6' onChange={this.handleCode} />
              <br />
            </div>
            <br />

          </div>
          <button type='button' className='btn continue_btn pull-right' onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

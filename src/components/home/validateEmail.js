import React from 'react'
import { logout } from '../../actions/userAuth'
import { connect } from 'react-redux'
import Select from 'react-select'
import { browserHistory } from 'react-router'
import Header from '../../pages/ui/header'

export default class ValidateEmail extends React.Component {
  constructor (props) {
    super(props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps != this.props)
  }
  render () {
    return (
      <div className='validate_overlay'>
        <Header />
        <div className='overlay-inner-div' style={{ marginTop: '2%', fontSize: '13px', minHeight: '200px' }}>
          <h3>Please check your NJIT email and click the verification link for the following emails:</h3>
          <br />
          <ul>
            {
              this.props.emails.map((email, i) => {
                return <li
                        style={{fontSize: '14px', listStyle: 'none', textDecoration: email.isValidated ? "line-through" : ''}}
                        key={i}>
                        {email.id}
                      </li>
              })
            }
          </ul>

          <br />

        </div>

      </div>
    )
  }
}

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { setRedirectUrl } from '../../actions/userAuth'
var _ = require('lodash')

class EnsureLoggedInContainer extends Component {

  componentDidMount () {
    const currentURL = this.props.location.pathname
    const { dispatch, redirectURL } = this.props

    if (!this.props.isLoggedIn && this.props.isLoggedOut) {
      dispatch(setRedirectUrl(currentURL))
      browserHistory.replace('/login')
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps != this.props) {
      if (!nextProps.isLoggedOut) browserHistory.replace('/login')
    }
  }
  render () {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}
const mapStateToProps = (state, ownProps) => {
  const newProps = {
    user: state.user.user ? state.user.user : state.survey.user,
    profile:state.survey.profile,
    progress:state.survey.progress,
    redirectURL: state.user.redirectURL,
    isLoggedIn:  state.user.isLoggedIn,
    isLoggedOut:  state.user.isLoggedOut,
  }
  return newProps
}

export default connect(mapStateToProps)(EnsureLoggedInContainer)

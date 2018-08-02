import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class EnsureLoggedOutContainer extends Component {

  componentDidMount () {
    const currentURL = this.props.location.pathname
    
    if (this.props.isLoggedIn && !this.props.isLoggedOut) {
      browserHistory.replace('/home')
    }
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps != this.props) {
      // this.props.loadSurveyData()
      if (nextProps.isLoggedIn) browserHistory.replace('/home')
    }
  }
  render () {
    if (!this.props.isLoggedIn) {
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
    isLoggedIn: state.user.isLoggedIn,
    isLoggedOut: state.user.isLoggedOut
  }
  return newProps
}
const mapDispatchToProps = dispatch => (
  {
    loadSurveyData: () => {
      dispatch(actions.surveyAction.loadSurveyData())
    }
  }
)
export default connect(mapStateToProps, mapDispatchToProps)(EnsureLoggedOutContainer)

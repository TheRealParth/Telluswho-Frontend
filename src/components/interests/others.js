import React from 'react'
import { connect } from 'react-redux'
import { setLookingForOthers, increaseProgress } from '../../actions/surveyAction.js'
import ToggleSelect from './ui/toggleSelect'
var _ = require('lodash')
import { browserHistory } from 'react-router'
@connect((store) => {
  return {
    user: store.user.user,
    profile:store.survey.profile,
    progress:store.survey.progress,
    interests:store.survey.interests ? store.survey.interests : store.survey.profile.interests
  }
})
export default class Others extends React.Component {
  constructor (props) {
    super(props)
    var applicableInterests = []
    this.props.interests.forEach(interest => {
      interest.lookingForOthers = _.isBoolean(interest.lookingForOthers) ? interest.lookingForOthers : false
      if (interest.doingInGroup > 1) applicableInterests.push(interest)
    })
    this.state = {
      interests: applicableInterests
    }
  }
  toggleSelected = (id) => {
    var temp = []
    this.state.interests.forEach((thing) => {
      if (id == thing.id) thing.lookingForOthers = !thing.lookingForOthers
      temp.push(thing)
    })
    this.setState({ interests: temp })
  }
  nextPage = () => {
    
    var allSet = false
    this.state.interests.forEach((interest) => {
      if (interest.lookingForOthers) allSet = true
    })
    if (allSet) {
      this.props.dispatch(setLookingForOthers(this.state.interests)).then((res) => {
        
        if (res.type != 'DATA_ERR') {
          browserHistory.push('/places')
          this.props.dispatch(increaseProgress())
        } else {
          this.setState({ error: 'Error saving to database' })
        }
      })
    } else {
      this.setState({ error: 'Must select at least one interest' })
    }

    window.scrollTo(0, 0)
  }
  render () {
    return (<div className='barFix section4'>

      <h2 id='page-heading-2'>Select all of the interests you would like to do with other people.</h2>
      <div className='error'>{this.state.error}</div>
      <div className='cardHolder dragFrame '>

        {
         this.state.interests.map((obj, i) => {
           return (<ToggleSelect toggleSelected={this.toggleSelected} key={i} interest={obj} />)
         })
       }

      </div>

      <div className='continue_btn_div' >
        <button className='btn btn-primary continue_btn pull-right' onClick={this.nextPage}>Continue</button>
      </div>
    </div>)
  }
}

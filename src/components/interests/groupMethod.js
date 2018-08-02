import React from 'react'

import { connect } from 'react-redux'
import { setMethodInGroup, increaseProgress } from '../../actions/surveyAction.js'
import { methodOptions } from './options/methodOptions.js'
import DropDownSelect from './ui/dropDownSelect'

@connect((store) => {
  return {
    user: store.user.user,
    profile:store.survey.profile.profile,
    progress:store.survey.progress,
    interests:store.survey.interests ? store.survey.interests : store.survey.profile.interests
  }
})
export default class GroupMethod extends React.Component {
  constructor (props) {
    super(props)

    var applicableInterests = []
    this.props.interests.forEach(interest => {
      
      if (interest.doingInGroup != 3) {
        interest.methodInGroup = interest.methodInGroup ? interest.methodInGroup : []
        applicableInterests.push(interest)
      }
    })
    this.state = {
      interests: applicableInterests,
      error: ''
    }
  }
  handleSelections = (item, selections) => {
    var temp = []
    this.state.interests.forEach((interest) => {
      if (item.id == interest.id) {
        var temp2 = []
        selections.forEach((selection) => {
          temp2.push(selection.value)
        })
        interest.methodInGroup = temp2
      }
      temp.push(interest)
    })
    this.setState({ interests: temp })
  }

  nextPage = (page) => {
    var allSet = true
    this.state.interests.forEach((interest) => {
      if (!interest.methodInGroup.length) allSet = false
    })
    if (allSet) {
      this.props.dispatch(setMethodInGroup(this.state.interests)).then((res) => {
        if (res.type != 'DATA_ERR') {
          this.props.dispatch(increaseProgress())
        } else {
          this.setState({ error: 'Error saving to database' })
        }
      })
    } else {
      this.setState({ error: 'You must select at least one method for each interest' })
    }
    window.scrollTo(0, 0)
  }
  render () {
    return (<div className='barFix section4'>

      <h2 id='page-heading-2'>Select how you would like to do these activities with others</h2>
      <br />
      <div className='error'>{this.state.error}</div>
      <div className='cardHolder dragFrame '>

        {
         this.state.interests.map((obj, i) => {
           return (<DropDownSelect handleSelections={this.handleSelections} options={methodOptions} key={i} interest={obj} />)
         })
       }

      </div>

      <div className='continue_btn_div' >
        <button className='btn btn-primary continue_btn pull-right' onClick={() => { this.nextPage('places') }}>Continue</button>
      </div>
    </div>)
  }
}

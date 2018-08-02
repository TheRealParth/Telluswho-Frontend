import React from 'react'
import { setPassionLevel } from '../../actions/surveyAction.js'
import BasicDnD from './basicDnD'

export default class Passion extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Please indicate how passionate you are about each of the activities by dragging them into the categories below',
      surveyType: 'levelOfPassion',
      dropBoxes: [ 'Not at all passionate', 'Slightly Passionate', 'Moderately Passionate', 'Very Passionate', 'Extremely Passionate'],
      nextPage: '/expertise'
    }
  }

  render () {
    return (
      <BasicDnD
        title={this.state.title}
        nextPage={this.state.nextPage}
        surveyType={this.state.surveyType}
        dropBoxes={this.state.dropBoxes}
           />
    )
  }
}

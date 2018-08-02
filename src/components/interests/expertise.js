import React from 'react'
import BasicDnD from './basicDnD'

export default class Expertise extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Please indicate your level of expertise for the following interests/activities by dragging them into the appropriate container',
      surveyType: 'levelOfExpertise',
      dropBoxes: [ 'Does Not Apply', 'Novice', 'Intermediate', 'Expert'],
      nextPage: '/teach'
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

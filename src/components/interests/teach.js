import React from 'react'

import { setWillingToTeach } from '../../actions/surveyAction.js'
import BasicDnD from './basicDnD'

export default class Teach extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      title: 'Please drag each interest into a bucket below based on if you want to teach, coach, or learn more about the interest.',
      surveyType: 'willingToTeach',
      dropBoxes: [ 'Does Not Apply', 'Willing to Teach', 'Willing to Coach'],
      nextPage: '/taught'
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

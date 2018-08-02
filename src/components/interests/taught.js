import React from 'react'

import { setWillingToTeach } from '../../actions/surveyAction.js'
import BasicDnD from './basicDnD'

export default class Taught extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      title: 'Please drag each interest into a bucket below based on if you want to be taught or coached.',
      surveyType: 'willingToBeTaught',
      dropBoxes: [ 'Does Not Apply', 'Want to be Taught', 'Want to be Coached'],
      nextPage: '/group'
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

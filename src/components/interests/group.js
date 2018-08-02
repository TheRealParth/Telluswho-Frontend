import React from 'react'
import BasicDnD from './basicDnD'

export default class Group extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: 'Please drag each interest into one of the three buckets below',
      surveyType: 'doingInGroup',
      dropBoxes: [ 'I do this as an individual only', 'I do this with a group', 'I’m don’t yet do this group activity'],
      nextPage: '/groupMethod'
    }
  }
  setLevel = (ints) => {
    return setDoingInGroup(ints)
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

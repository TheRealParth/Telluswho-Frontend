import React, { Component } from 'react'
import Select from 'react-select'
type DefaultProps = {
  handleSelections: any;
  interest: {
    id: string,
    title: string,
    category: string,
    methodInGroup: Array<string>
  },
  options: Array<Object>
}
export default class DropDownSelect extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      selections: this.props.interest.methodInGroup
    }
  }

  props: DefaultProps;

  logger = (options) => {
    let _tmp = []
    _tmp.push(options)
    //this.setState({ selections: options })
    this.setState({ selections: options })
    this.props.handleSelections(this.props.interest, _tmp)
  }
  render () {
    return (
      <div className='formBox formBox-drag reviewBox no-highlight' >
        <div className='interestHeader no-highlight' style={{ fontSize: 17 + 'px', fontWeight: 'semibold', lineHeight: 1.5 }}>{this.props.interest.title}</div>
        <div className='interestSubheader no-highlight' style={{ textAlign: 'center', marginBottom: 20 + 'px', marginTop: -40 + 'px', lineHeight: 0.8, color: '#a5a5a5', backgroundColor: 'rgba(0,0,0,0)', bottom: '0' + 'px' }} >
          {this.props.interest.category}
        </div>
        <Select style={{ marginBottom: 10 + 'px' }} className='customDropdown'
          onChange={this.logger}
        //  clearable={this.state.clearable}
          value={this.state.selections}
          options={this.props.options} placeholder='Please select a method(s)' />

        <div className='background' />
      </div>
    )
  }
}

import React, { Component } from 'react'
import Select from 'react-select'
import { Async } from 'react-select'
import { placeOptions } from '../options/placeOptions'
var _ = require('lodash')

type DefaultProps = {
  interest: Object,
  getOptions: any,
}
export default class PlacesAutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      places: [],
      creatablePlaces: false
    }
  }

  props: DefaultProps;

  handleInputChange = (newval) => {
    var temp = []
    newval.forEach((plc) => {
      if (_.isEmpty(plc.data)) {
        temp.push({ label: plc.structured_formatting.main_text, value: plc, data: plc })
      } else {
        temp.push({ label: plc.label, value: plc.value, data: plc.data })
      }
    })
    this.props.handleSelect(newval, this.props.interest.id)
    this.setState({ places: newval })
  }

  handleDropdown(type, value){
    let temp = []
    value.forEach((plc) => {
      if (_.isEmpty(plc.data)) {
        temp.push({ label: plc.value, value: plc.value, data: plc })
      } else {
        temp.push({ label: plc.value, value: plc.value, data: plc })
      }
    })
    this.props.handleSelect(value, this.props.interest.id)
    this.setState({ places: value })
  } 

  renderAutoComplete = (selectProps) => {
    return <Async multi {...selectProps} />
  };
  optionizer = ({ label, value }) => {
    return (<li className='ac-li'>
      <span className='ac-title'> {label ? label : ''} </span><br />
      <span className='ac-desc'> {value.structured_formatting.secondary_text} </span>
    </li>)
  }
  getOptions = (input, callback) => {
    setTimeout(() => {
      if (input.length) {
        this.props.getOptions(input, callback)
      } else {
        callback(true, {
        })
      }
    }, 100)
  };

  render () {
    return (
      <div className='formBox formBox-drag reviewBox no-highlight places' style={{ textAlign: 'left', margin: 8 + 'px' }}>
        <div className='interestHeader no-highlight' style={{ fontSize: 17 + 'px', fontWeight: 'semibold', lineHeight: 1.5 }}>{this.props.interest.title}</div>
        <div className='interestSubheader no-highlight' style={{ textAlign: 'center', marginBottom: 20 + 'px', marginTop: -40 + 'px', lineHeight: 0.8, color: '#a5a5a5', backgroundColor: 'rgba(0,0,0,0)', bottom: '0' + 'px' }} >
          {this.props.interest.category}
        </div>
          <Select className='customDropdown' value={this.state.places} onChange={this.handleDropdown.bind(this, 'place')}
              clearable={this.state.clearable} multi options={placeOptions} placeholder='I want to do this' />
        

        <div className='background' />
      </div>
    )
  }
}

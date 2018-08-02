import React, { Component } from 'react'
import { Async } from 'react-select'
var _ = require('lodash')

type DefaultProps = {
  getOptions: any,
}
export default class AddressInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  props: DefaultProps;

  handleInputChange = (newval) => {
    this.props.handleNewAddress(newval.value.description)
    this.setState({ place: newval })
  }

  renderAutoComplete = (selectProps) => {
    return <Async {...selectProps} />
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
      <div style={{ width: '600px', position: 'absolute' }}>
        {
          this.renderAutoComplete({
            loadOptions: this.getOptions,
            onChange: this.handleInputChange,
            value: this.state.place,
            placeholder: 'Enter the city, state, or country of where you grew up',
            optionRenderer: this.optionizer,
            cache: false,
            multi: false
          })
        }
      </div>
    )
  }
}

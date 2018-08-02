import React, { Component } from 'react'

type DefaultProps = {
  toggleSelected: any;
  interest: {
    id: string,
    title: string,
    category: string,
    lookingForOthers: boolean
  }
}
export default class ToggleSelect extends React.Component {

  constructor (props) {
    super(props)
  }

  props: DefaultProps;

  render () {
    return (
      <div onClick={() => { this.props.toggleSelected(this.props.interest.id) }} className='formBox formBox-drag reviewBox no-highlight'
        style={{
          backgroundColor: this.props.interest.lookingForOthers ? '#459aff' : '#fff'
        }}>
        <div className='interestHeader no-highlight' style={{
          fontSize: 17 + 'px',
          fontWeight: 'semibold',
          lineHeight: 1.5,
          color: this.props.interest.lookingForOthers ? 'rgb(243, 243, 243)' : ''
        }}>{this.props.interest.title}</div>
        <div className='interestSubheader no-highlight' style={{
          textAlign: 'center',
          marginBottom: 20 + 'px',
          marginTop: -40 + 'px',
          lineHeight: 0.8,
          color: this.props.interest.lookingForOthers ? 'rgb(243, 243, 243)' : '#a5a5a5',
          backgroundColor: 'rgba(0,0,0,0)', bottom: '0' + 'px'
        }} >
          {this.props.interest.category}
        </div>
        <div className='background' />
      </div>
    )
  }
}

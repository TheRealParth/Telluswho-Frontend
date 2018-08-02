import React from 'react'

type defaultProps = {
  color: string;
}

export default class Star extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  render () {
    return (
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='15px' width='15px'
        viewBox='0 0 50 50' style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace='preserve'>
        <path fill={this.props.color} d='M25.8,2.8l6.8,13.9c0.1,0.2,0.3,0.3,0.5,0.3l15.3,2.2c0.5,0.1,0.7,0.7,0.3,1L37.6,31c-0.1,0.1-0.2,0.3-0.2,0.5l2.6,15.3
          	c0.1,0.5-0.4,0.9-0.9,0.6l-13.7-7.2c-0.2-0.1-0.4-0.1-0.6,0l-13.7,7.2c-0.4,0.2-1-0.1-0.9-0.6L13,31.5c0-0.2,0-0.4-0.2-0.5L1.7,20.2
          	c-0.4-0.3-0.2-1,0.3-1L17.4,17c0.2,0,0.4-0.2,0.5-0.3l6.8-13.9C24.9,2.3,25.5,2.3,25.8,2.8z' />
      </svg>

    )
  }
 }

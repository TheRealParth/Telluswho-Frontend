import React from 'react'

type defaultProps = {
  color: string;
}

export default class Triangle extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  render () {
    return (
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='15px' width='15px'
        viewBox='0 0 50 50' style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace='preserve'>
        <path fill={this.props.color} d='M24.5,3.4L0.6,44.8c-0.2,0.4,0.1,0.9,0.5,0.9H49c0.5,0,0.8-0.5,0.5-0.9L25.6,3.4C25.3,3,24.8,3,24.5,3.4z' />
      </svg>

    )
  }
 }

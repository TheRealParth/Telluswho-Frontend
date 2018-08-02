import React from 'react'

type defaultProps = {
  color: string;
}

export default class Flower extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  render () {
    return (
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='15px' width='15px'
        viewBox='0 0 50 50' style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace='preserve'>
        <g>
          <path fill={this.props.color} d='M1.7,48.3c3.1-1,7.4-3.9,11.5-8s7-8.4,8-11.5c-3.1,1-7.4,3.9-11.5,8S2.7,45.1,1.7,48.3z' />
          <path fill={this.props.color} d='M28.7,21.3c3.1-1,7.4-3.9,11.5-8s7-8.4,8-11.5c-3.1,1-7.4,3.9-11.5,8S29.7,18.1,28.7,21.3z' />
        </g>
        <g>
          <path fill={this.props.color} d='M1.7,1.7c1,3.1,3.9,7.4,8,11.5s8.4,7,11.5,8c-1-3.1-3.9-7.4-8-11.5S4.9,2.7,1.7,1.7z' />
          <path fill={this.props.color} d='M28.7,28.7c1,3.1,3.9,7.4,8,11.5s8.4,7,11.5,8c-1-3.1-3.9-7.4-8-11.5S31.9,29.7,28.7,28.7z' />
        </g>
        <path fill={this.props.color} d='M1,25c2,1,5.4,1.7,9.2,1.7s7.3-0.7,9.2-1.7c-2-1-5.4-1.7-9.2-1.7S3,24,1,25z' />
        <path fill={this.props.color} d='M30.5,25c2,1,5.4,1.7,9.2,1.7S47,26,49,25c-2-1-5.4-1.7-9.2-1.7S32.5,24,30.5,25z' />
        <path fill={this.props.color} d='M25,1c-1,2-1.7,5.4-1.7,9.2s0.7,7.3,1.7,9.2c1-2,1.7-5.4,1.7-9.2S26,3,25,1z' />
        <path fill={this.props.color} d='M25,30.5c-1,2-1.7,5.4-1.7,9.2S24,47,25,49c1-2,1.7-5.4,1.7-9.2S26,32.5,25,30.5z' />
        <circle fill={this.props.color} cx={25} cy={25} r={3} />
      </svg>

    )
  }
 }

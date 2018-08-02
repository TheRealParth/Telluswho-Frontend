import React from 'react'

type defaultProps = {
  color: string;
}

export default class Sun extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  render () {
    return (
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='15px' width='15px'
        viewBox='0 0 50 50' style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace='preserve'>
        <path fill={this.props.color} d='M25.6,2.8l2.7,10c0.1,0.4,0.6,0.6,1,0.3l7.7-7c0.5-0.4,1.2,0,1,0.6l-3.1,9.9c-0.1,0.4,0.2,0.8,0.7,0.8l10.2-1.7
          	c0.6-0.1,1,0.7,0.5,1.1l-8,6.6c-0.3,0.3-0.3,0.8,0.1,1l9.5,4.1c0.6,0.2,0.4,1.1-0.2,1.1l-10.3,1.3c-0.4,0.1-0.7,0.6-0.4,0.9l5.8,8.6
          	c0.3,0.5-0.2,1.1-0.8,0.9l-9.4-4.5c-0.4-0.2-0.9,0.1-0.9,0.6l0.2,10.4c0,0.6-0.8,0.8-1.1,0.3l-5.4-8.9c-0.2-0.4-0.8-0.4-1,0
          	l-5.4,8.9c-0.3,0.5-1.1,0.3-1.1-0.3l0.2-10.4c0-0.4-0.5-0.7-0.9-0.6L8,41.4c-0.6,0.3-1.1-0.4-0.8-0.9l5.8-8.6c0.3-0.4,0-0.9-0.4-0.9
          	L2.3,29.7c-0.6-0.1-0.7-0.9-0.2-1.1l9.5-4.1c0.4-0.2,0.5-0.7,0.1-1l-8-6.6c-0.5-0.4-0.1-1.2,0.5-1.1l10.2,1.7
          	c0.4,0.1,0.8-0.3,0.7-0.8l-3.1-9.9c-0.2-0.6,0.5-1,1-0.6l7.7,7c0.3,0.3,0.9,0.1,1-0.3l2.7-10C24.6,2.2,25.5,2.2,25.6,2.8z' />
      </svg>

    )
  }
 }

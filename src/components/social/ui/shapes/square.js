import React from 'react'

type defaultProps = {
  color: string;
}

export default class Square extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  render () {
    return (
      <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' x='0px' y='0px' height='15px' width='15px'
        viewBox='0 0 50 50' style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace='preserve'>
        <path fill={this.props.color} d='M48.4,49H1.6C1.3,49,1,48.7,1,48.4V1.6C1,1.3,1.3,1,1.6,1h46.8C48.7,1,49,1.3,49,1.6v46.8C49,48.7,48.7,49,48.4,49z' />
      </svg>

    )
  }
 }

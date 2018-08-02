import React from 'react'
const path = require('path')
import Circle from './shapes/circle'
import Eclipse from './shapes/eclipse'
import Flower from './shapes/flower'
import Square from './shapes/square'
import Star from './shapes/star'
import Sun from './shapes/sun'
import Triangle from './shapes/triangle'

type defaultProps = {
  groupItem: any;
}

export default class Shape extends React.Component {
  constructor (props) {
    super(props)
  }
  getShape = () => {
    const shapes = [
      <Circle color={this.props.groupItem.color} />,
      <Eclipse color={this.props.groupItem.color} />,
      <Flower color={this.props.groupItem.color} />,
      <Square color={this.props.groupItem.color} />,
      <Star color={this.props.groupItem.color} />,
      <Sun color={this.props.groupItem.color} />
    ]
    return shapes[this.props.groupItem.id % shapes.length]
  }
  props: defaultProps
  render () {
    return (
      <span className='shape'>
        {
          this.getShape()

        }

      </span>
    )
  }
}

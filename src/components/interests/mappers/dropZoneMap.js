import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

const ItemTypes = {
  CONTACT:'contact',
  CARD:'card'
}
const interestTarget = {
  drop (props, monitor, component) {
  	  props.set(props.value)
    
  }
}

@DropTarget(ItemTypes.CARD, interestTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  item:monitor.getItem()

}))

export default class DropZoneMap extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      interests: this.props.interests
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return (this.props != nextProps || this.state != nextState)
  }
  render () {
    const { item, isOver, connectDropTarget } = this.props
    var intrsts = this.props.interests

    return (

			connectDropTarget(
  <div className='droppableOption'><h3>{this.props.title}</h3>
    <span className='dropbox'>
      {
	    				intrsts.map((obj, i) => {
      if (obj[this.props.fieldType] == this.props.value) {
	    					return (

  <div key={i} className='stackedcard'>
    {obj.title}
    <a onClick={() => (this.props.remove(obj))}><div className='closeCard no-highlight'>X</div></a>
  </div>

					          )
      }
	    				})
	    			}
    </span>
  </div>
			)
    )
  }
}

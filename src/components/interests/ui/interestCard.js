import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { DragSource } from 'react-dnd'

const ItemTypes = {
  CARD:'card'
}

const cardSource = {
  beginDrag (props) {
    props.callback()
    return props.interest
  }
}
// type Props = {
// 	isDragging: string;
//
// }

@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class InterestCard extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const { isDragging, connectDragSource } = this.props
   		const opacity = isDragging ? 0.5 : 1
   		var obj = this.props.interest
    return (
			connectDragSource(
  <div className='formBox formBox-drag reviewBox '>

    <div style={{ padding: 0 + 'px' }}>
      <div className='interestHeader no-highlight' style={{ fontSize: 17 + 'px', fontWeight: 'semibold', lineHeight: 1.5 }}>{obj.title}</div>
      <div className='interestSubheader no-highlight' style={{ textAlign: 'center', marginBottom: 20 + 'px', marginTop: -40 + 'px', lineHeight: 0.8, color: '#a5a5a5', backgroundColor: 'rgba(0,0,0,0)', bottom: '0' + 'px' }} >
        {obj.category}
      </div>
      <div className='background' />
    </div>
  </div>
			)
    )
  }
}

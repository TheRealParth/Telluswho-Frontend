import React from 'react'
import Shape from './shape'
import { ItemTypes } from './constants'
import { DragSource } from 'react-dnd'
// Drag sources and drop targets only interact
type defaultProps = {
  title: string;
  x: number;
  y: number;
  handleGroupItemRemove: any;
  selectGroup: any;
  index: number;
}
const cardSource = {
  beginDrag (props) {
    return props
  }
}

@DragSource(ItemTypes.GROUPITEM, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class GroupItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      changeColor: false,
      bgColor: 'white'
    }
    
    
  }
  props: defaultProps
  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.props != nextProps)
  }
  handleRemove = (e) => {
    ;
    this.props.handleGroupItemRemove(this.props.index)
  }
  updateGroupItem = (newPos) => {
    this.props.updateGroupItem(this.props.index, this.props.positionIndex, newPos)
  }

  selectGroup = () => {
    
    let groupColor = this.getRandomColor()
    this.props.selectGroup({index: this.props.index, title: this.props.title, color: groupColor, pos :{ x: this.props.x, y: this.props.y }})
    this.setState({ bgColor: groupColor})
  }
  
  getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getStyle = () => {
    
    if(this.state.changeColor){
      return {
        height: '60px',
        top: this.props.y,
        left: this.props.x,
        //background: this.props.groupSelected.color
      }
    } else {
      return {
        height: '60px',
        top: this.props.y,
        left: this.props.x

      }  
    }
    
  }
  getName = () => {

    return this.props.title
  }
  render () {
    const { connectDragSource } = this.props

    return (
      connectDragSource(

        <div  id='self' className='contactCard no-highlight' style={ this.getStyle() }>
          <a onClick={(e) => this.handleRemove(e)}>
            <svg className='closeButton ex' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 84 84' style={{ enableBackground: 'new 0 0 84 84', minWidth: '20px' }} xmlSpace='preserve' width='512px' height='512px'>
              <g className='ex'>
                <g className='ex'>
                  <path className='ex' d='M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z' fill='#4eadef' />
                </g>
              </g>
            </svg>
          </a>
          <div>
            <h3 className='contactName' style={{fontSize: '25px'}}>
              {this.props.title }</h3> <a onClick={ this.selectGroup.bind(this) }><span className='glyphicon glyphicon-plus glyphRight' /></a>
              <div style={{ width: '10px', height: '10px', 'border-radius' : '10px', background: this.state.bgColor}}><span></span></div>
              <br id='self' />

          </div>
        </div>

            )
    )
  }
}

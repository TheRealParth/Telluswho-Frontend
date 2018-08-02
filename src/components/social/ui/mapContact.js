import React from 'react'
import Shape from './shape'
import { ItemTypes } from './constants'
import { DragSource } from 'react-dnd'
import Circle from './shapes/circle'
import { pageTypes } from '../options/pageTypes'
// Drag sources and drop targets only interact
type defaultProps = {
  contact: Object;
  position: Object;
  positionIndex: number;
  handleRemove: any;
  updateContact: any;
  handleToggleGroup: any;
}
const cardSource = {
  beginDrag (props) {
    return props
  }
}

@DragSource(ItemTypes.MAPCONTACT, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

export default class MapContact extends React.Component {
  constructor (props) {
    super(props)
  }
  props: defaultProps
  shouldComponentUpdate = (nextProps, nextState) => {
    return (this.props != nextProps)
  }
  handleRemove = (e) => {
    
    this.props.handleRemove(this.props.contact.id, this.props.positionIndex)
  }
  getName = () => {
    var name = ''
    if (this.props.contact.firstName) {
      name += this.props.contact.firstName
      if (this.props.contact.lastName) {
          name += ' ' + this.props.contact.lastName
      }
    } else {
      name += this.props.contact.lastName
    }
    if(!name.length){
      if(this.props.contact.emails.length){
        name += this.props.contact.emails[0]
      } else if(this.props.contact.phones.length) {
        name += this.props.contact.phones[0]
      }
    }
    name = name.replace('/', '')
    return name
  }
  getImage () {
    if (this.props.contact.profilePic) {
      return <img src={'data:' + this.props.contact.profilePic.type + ';charset=utf-8;base64,' + this.props.contact.profilePic.imageData} className='userImg' style={{ minWidth: '30px', minHeight:  '30px' }} />
    } else {
      var avatarURL = 'http://api.adorable.io/avatars/50/' + this.getName() + '.jpg'
      return (<img src={avatarURL} className='userImg' style={{ minWidth: '30px', minHeight: '30px' }} />)
    }
  }
  updateContact = (newPos) => {
    this.props.updateContact(this.props.contact.id, this.props.positionIndex, newPos)
  }
  toggleGroup = (e) => {
    if ((e.target.className.baseVal !== 'closeButton ex') && (e.target.className.baseVal !== 'ex') && (e.target.className != 'glyphicon glyphicon-duplicate copy-button')) {
      this.props.handleToggleGroup()
    }
  }
  handleCopy = () => {
      this.props.handleCopyContact(this.props.contact, this.props.position)
  }
  closeDisabler = () => {
    if(this.props.noClose){
      return 'none'
    } else {
      return ''
    }
  }
  getGroupName = () =>{
    let GroupName = ''
    if (this.props.groupSelected != undefined && this.props.groupSelected.index != undefined){
      var contacts = this.props.contact.groups
      if(contacts != undefined){
        for(var i=0;i<contacts.length;i++){
          if(contacts[i].index == this.props.groupSelected.index){
            GroupName = this.props.groupSelected.title
          }
        }
      }
    }
    return GroupName
  }

  getStyle = () => {
    let style = {}
    if (this.props.groupSelected != undefined && this.props.groupSelected.index != undefined){
      var contacts = this.props.contact.groups
      if(contacts != undefined){
        for(var i=0;i<contacts.length;i++){
          if(contacts[i].index == this.props.groupSelected.index){
            style ={
              background: this.props.groupSelected.color,
              'border-radius': '10px'
            }
          }
        }
      }
    }
    return style
  }

  getMapContactStyles = () => {
    if(this.props.alreadySelected){
      return {
        top: this.props.position.y,
        left: this.props.position.x,
        backgroundColor:  'rgba(100,100,100,.5)'
      }
    } else if (this.props.groupSelected != undefined && this.props.groupSelected.index != undefined){
      var enableContact = false;
      var contacts = this.props.contact.groups
      if(contacts != undefined){
        for(var i=0;i<contacts.length;i++){
          if(contacts[i].index == this.props.groupSelected.index)
            enableContact = true
        }
      }
      if(enableContact){
        return {
          top: this.props.position.y,
          left: this.props.position.x,
          backgroundColor: 'white'
        }
      } else {
        return {
          top: this.props.position.y,
          left: this.props.position.x,
          backgroundColor:  'lightgray'
        }
      }
    } else if (this.props.type == 'SELECT_CONTACTS' && this.props.contact.technology != undefined && this.props.contact.technology != 6){
      var enableContact = false;
      if(enableContact){
        return {
          top: this.props.position.y,
          left: this.props.position.x,
          backgroundColor: 'green'
        }
      } else {
        return {
          top: this.props.position.y,
          left: this.props.position.x,
          backgroundColor:  'lightgray',

        }
      }
    } else if (this.props.type == pageTypes.BUCKET_QUESTIONS) {
      let display = true
      let grayOut = false
      if(this.props.bucketQuestion.id == 3){
        let key = this.props.bucketQuestion.key
        if(this.props.contact[key] != 0)
          display = false
        if(display){
          return {
            top: this.props.position.y,
            left: this.props.position.x,
            backgroundColor: this.props.contact.selected ? '#a3cdff' : ""
          }
        } else {
          return {
            top: this.props.position.y,
            left: this.props.position.x,
            display: 'none',
          }
        }
      } else {
        let key = this.props.bucketQuestion.key
        if(this.props.contact[key] != 0)
          grayOut = true
        if(!grayOut){
          return {
            top: this.props.position.y,
            left: this.props.position.x,
            backgroundColor: this.props.contact.selected ? '#a3cdff' : ""
          }
        } else {
          return {
            top: this.props.position.y,
            left: this.props.position.x,
            backgroundColor: 'lightgray'
          }
        }
      }
      
    } else {
      return {
        top: this.props.position.y,
        left: this.props.position.x,
        backgroundColor: this.props.contact.selected ? '#a3cdff' : ""
      }
    }
  }
  render () {
    const { connectDragSource } = this.props
    var groupDetails = null
    if(this.props.type == pageTypes.GROUP_CONTACTS){
      groupDetails = <div style={ this.getStyle(this.props.contact) }><h6 style={{ padding: '5px' }}> {this.getGroupName(this.props.contact)
              }</h6></div>
    }
    
    return (
      connectDragSource(
        <div onClick={(e) => { this.toggleGroup(e) }} id='self' className='contactCard no-highlight' style={this.getMapContactStyles()}>
          <a onClick={(e) => this.handleRemove(e)}>
            <svg className='closeButton ex' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 84 84' style={{display: this.closeDisabler(), enableBackground: 'new 0 0 84 84', minWidth: '20px' }} xmlSpace='preserve' width='512px' height='512px'>
              <g className='ex'>
                <g className='ex'>
                  <path className='ex' d='M42,0C18.803,0,0,18.807,0,42c0,23.197,18.803,42,42,42c23.193,0,42-18.803,42-42    C84,18.807,65.193,0,42,0z M50.643,42l15.303,15.302l-8.643,8.642L42.002,50.643L26.699,65.944l-8.641-8.642L33.359,42    l-15.3-15.298l8.641-8.646L42,33.357l15.301-15.299l8.643,8.641L50.643,42z' fill='#4eadef' />
                </g>
              </g>
            </svg>
          </a>
          <div>
            {this.getImage()}
            <h3 className='contactName'>
              {this.getName(this.props.contact)}</h3>
              <br id='self' /><p id='self' className='email'>{this.props.contact.emails.length ? this.props.contact.emails[0] : '' }</p>
            <hr />

            <div className='shapes-container'>
              {
                  this.props.contact.tags.map((tag, i) => {
                    return <Shape key={i} groupItem={tag} />
                  })
              }
              <hr />
              { groupDetails }
            </div>

          </div>
        </div>
      )
    )
  }
}

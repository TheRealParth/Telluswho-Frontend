import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './constants'

type defaultProps = {
   contact: Object;
 }
const cardSource = {
  beginDrag (props) {
    return props.contact
  }
}

 @DragSource(ItemTypes.LISTCONTACT, cardSource, (connect, monitor) => ({
   connectDragSource: connect.dragSource(),
   isDragging: monitor.isDragging()
 }))

export default class Contact extends React.Component {
  constructor (props) { 
    super(props)
  }
  props: defaultProps;
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState))
  }
  filterText (str) {
    if (str && str.length > 0) {
      if (str.indexOf('/') > -1) {
        str = str.repace('/', '')
      }
    }
    return str
  }
  getName () {
    var name = ''
    if (this.props.contact.firstName) {
      name += this.props.contact.firstName
      if (this.props.contact.lastName) {
        name += ' ' + this.props.contact.lastName
      }
    } else {
      name += this.props.contact.lastName
    }
    name = name.replace('/', '')
    return name
  }
  getImage () {
    var avatarURL = ''
    if (this.props.contact.profilePic) {
      avatarURL = 'data:' + this.props.contact.profilePic.type + ';charset=utf-8;base64,' + this.props.contact.profilePic.imageData
    } else {
      avatarURL = 'http://api.adorable.io/avatars/100/' + this.getName() + '.jpg'
    }
    return <img src={avatarURL} className='userImg' />
  }

  render () {
    const { connectDragSource } = this.props
    // Your component receives its own props as usual

  // These props are injected by React DnD,
  // as defined by your `collect` function above:
    return (
      connectDragSource(
        <li>
          <div className='contactsContainer'>
            {this.getImage()}
            <span className='userInfo'>
              <span className='contactName'>
                {this.props.contact.lastName ? (this.props.contact.firstName + ' ' + this.props.contact.lastName) : this.props.contact.firstName}
              </span>
              <br />
              <span className='phone'>
                {this.props.contact.phones.length ? this.props.contact.phones[0] : ' '}
              </span>
              <br />
              <span className='email'>
                {this.props.contact.emails.length ? this.props.contact.emails[0] : ' '}
              </span>
            </span>
          </div>

        </li>))
  }
}

import React from 'react'
import MapContact from './mapContact'
import GroupItem from './groupItem'
import { ItemTypes } from './constants'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'
import { pageTypes } from '../options/pageTypes'
var _ = require('lodash')
/**
 * Specifies the drop target contract.
 * All methods are optional.
 */
type defaultProps = {
   contacts: Array<Object>;
   undropContact: any;
   updateContact: any;
   handleGroupToggle: any;
 }
const mapTarget = {

  drop (props, monitor, component) {
    var type = monitor.getItemType()
    const item = monitor.getItem()
    const client = monitor.getClientOffset()
    const initialOffset = monitor.getInitialClientOffset()

    if (type == 'listcontact') {
      item.offsetY = event.offsetY + 70
      item.offsetX = event.offsetX + 70

      component.addContact(item.id, { x: event.offsetX, y: event.offsetY })
      return item
    } else if (type == 'mapcontact') {

      var cp = { x: (item.position.x - (initialOffset.x - client.x)), y: (item.position.y - (initialOffset.y - client.y)) }
      if (cp.x < 0 || cp.y < 0) {

      }
      component.props.updateContact(item.contact.id, item.positionIndex, cp)
      return item
    } else if( type == "groupitem") {
      var cp = { x: (item.x - (initialOffset.x - client.x)), y: (item.y - (initialOffset.y - client.y)) }
      if (cp.x < 0 || cp.y < 0) {
      }
      component.props.updateGroupItem(item.index, item, cp)
      return item
    }
  }
}

@DropTarget([ItemTypes.MAPCONTACT, ItemTypes.GROUPITEM, ItemTypes.LISTCONTACT], mapTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true }),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
export default class Map extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: props.contacts
    }
  }
  props: defaultProps
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState))
  }
  removeContact = (e, id, pos) => {
    this.props.undropContact(e, id, pos)
  }
  removeGroupItem = (i) => {
    this.props.removeGroupItem(i)
  }
  addContact = (id, pos) => {
    this.props.dropContact(id, pos)
  }
  getStyles = () => {
    if(this.props.type === pageTypes.BUCKET_QUESTIONS){
      return { position: 'static', height: '50vh' }
    } else {
      return { position: 'static', height: '80vh' }
    }
  }
  getContacts = () => {
    var stuff = []
    var x = 0
    if(this.props.type === pageTypes.BUCKET_QUESTIONS) {
      this.props.contacts.forEach((contact, i) => {
        contact.positions.forEach((pos, j) => {
          stuff.push(<MapContact
            key={x}
            noClose = {true}
            type= {this.props.type}
            handleRemove={this.removeContact}
            positionIndex={j}
            handleCopyContact={this.props.handleCopyContact}
            contact={contact}
            handleToggleGroup={() => this.props.handleGroupToggle(contact)}
            position={pos}
            bucketQuestion={this.props.bucketQuestion}
            updateContact={this.props.updateContact} />)
          x++
        })
      })
    } else if(this.props.type === pageTypes.SELECT_CONTACTS) {
      let nonTechtop = 80
      let nonTechleft = 10
      let techTop = 80
      let techLeft = 450
      this.props.contacts.forEach((contact, i) => {
        contact.selected = contact[this.props.selectContactsQuestion.key];
        contact.positions.forEach((pos, j) => {
          if(contact.technology == 6){
            pos.x = techLeft
            pos.y = techTop
            techTop = techTop + 100
            if(j%6 != 0){
              techTop = 80
              techLeft = techLeft + 100
            }
          } else{
            pos.x = nonTechleft
            pos.y = nonTechtop
            nonTechtop = nonTechtop + 100
            if(j%6 != 0){

              nonTechtop = 80
              nonTechleft = nonTechleft + 150
            }
          }
          stuff.push(<MapContact
            key={x}
            noClose = {true}
            type= {this.props.type}
            handleRemove={this.removeContact}
            positionIndex={j}
            handleCopyContact={this.props.handleCopyContact}
            contact={contact}
            handleToggleGroup={() => this.props.handleGroupToggle(contact)}
            position={pos}
            updateContact={this.props.updateContact} />)


          x++
        })
      })
    } else if(this.props.type == pageTypes.GROUP_CONTACTS){

      this.props.contacts.forEach((contact, i) => {
        contact.positions.forEach((pos, j) => {
          stuff.push(<MapContact
            key={x}
            noClose = {false}
            type= {this.props.type}
            handleRemove={this.removeContact}
            positionIndex={j}
            alreadySelected={(contact[this.props.bucketQuestion.key] > 0)}
            handleCopyContact={this.props.handleCopyContact}
            contact={contact}
            handleToggleGroup={() => this.props.handleGroupToggle(contact)}
            position={pos}
            groupSelected = {this.props.groupSelected}
            updateContact={this.props.updateContact} />)
          x++
        })
      })

    } else {
      this.props.contacts.forEach((contact, i) => {
        contact.positions.forEach((pos, j) => {
          stuff.push(<MapContact
            key={x}
            noClose = {false}
            type= {this.props.type}
            handleRemove={this.removeContact}
            positionIndex={j}
            alreadySelected={(contact[this.props.bucketQuestion.key] > 0)}
            handleCopyContact={this.props.handleCopyContact}
            contact={contact}
            handleToggleGroup={() => this.props.handleGroupToggle(contact)}
            position={pos}
            updateContact={this.props.updateContact} />)
          x++
        })
      })
    }
    return stuff
  }
  handleGroupItemRemove = (i) => {
    this.props.removeGroupItem(i)
  }
  getGroupItems = () => {
    var x = 0

    return _.map(this.props.groupItems, (groupItem, i)=>{
      return <GroupItem
        key={i}
        handleGroupItemRemove={this.handleGroupItemRemove}
        x={groupItem.x}
        title={groupItem.title}
        y={groupItem.y}
        updateGroupItem={this.props.updateGroupItem}
        selectGroup= { this.props.selectGroup }
        index={i}
      />
      x++
    })
  }
  render () {
    // const { position } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isOver, canDrop, connectDropTarget } = this.props
    return connectDropTarget(
      <div className='daZone no-highlight' style={this.getStyles()}>
        <div id='dropbox' className='dropbox' style={{ position: 'relative', overflow:'scroll', minHeight: 'inherit' }}>
          {
            this.getContacts().map(item => {
              return item
            })
          }
          {
            this.getGroupItems()
          }
        </div>
      </div>
    )
  }
}

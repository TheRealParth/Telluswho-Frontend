import React from 'react'
import { updateContact } from '../../../actions/surveyAction'

export default class ContactLane extends React.Component {
  constructor (props) {
    super();
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState))
  }
  getName = (contact) => {
    var name = ""
    if(contact.firstName && contact.firstName.length){
      name += contact.firstName
    }
    if(contact.lastName && contact.lastName.length) {
      if(name.length) name += " "
      name += contact.lastName
    }
    if(!name.length) {
      name += (contact.phones[0] || contact.emails[0])
    }
    return name
  }
  render () {
    return (
      <div className="contact-lane">
        <button className="btn btn-default" onClick={(e)=>{this.props.selectContacts(this.props.optionValue)}}> {this.props.title} </button>
        <ul className="contact-lane-list">
        {
            this.props.contacts.map((contact, i)=>{
              if(contact[this.props.contactsQuestion.key] == this.props.optionValue){
                return(
                    <li className="contact-lane-list-item" key={i}>
                        { this.getName(contact) }
                        <a onClick={() => (this.props.unselectContact(contact))}><div className='closeCard no-highlight'>X</div></a>
                    </li>
                  )
              }
            })
        }
        </ul>
      </div>
    )
  }
}

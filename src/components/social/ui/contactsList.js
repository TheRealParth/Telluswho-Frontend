import React from 'react'
import Contact from './contact'
var _ = require('lodash')

type defaultProps = {
  contacts: Array<Object>;
  handleAddContact: any;
}
export default class ContactList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts:  this.props.contacts || [],
      searchQuery: ''
    }
  }
  props: defaultProps;
  componentWillReceiveProps = (nextProps) => {
    if(nextProps.contacts){
      this.state.searchQuery.length ? this.setState({contacts: this.filterSearch(this.state.searchQuery, nextProps.contacts)}) : this.setState({contacts: nextProps.contacts})
    }
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    return ((this.props != nextProps) || (this.state != nextState));
  }
  handleAdd = () => {
    this.props.handleAddContact()
  }
  handleSearchInput = (e) => {
    if (e.target.value.length > 0) {
      const searchQuery = e.target.value.toLowerCase().replace(/[( )\-]/g, '');
      this.setState({searchQuery: searchQuery, contacts:
        this.filterSearch(searchQuery, this.props.contacts)
      })
    } else {
      this.setState({searchQuery: '', contacts: this.props.contacts})
    }
  }

  filterSearch = (searchQuery, contacts) => {
    return [... _.compact(
      _.map(contacts, (contact)=>{
        var emails = contact.emails ? contact.emails : [];
        var phones = contact.phones ? contact.phones : [];
        var lastName = contact.lastName ? contact.lastName : '' ;
        var haystack = contact.firstName + " " + lastName + " " + phones.join(" ") + " " + emails.join(" ")
        haystack = haystack.toLowerCase().replace(/[( )\-]/g, '');
        if(haystack.indexOf(searchQuery) > -1) return contact;
        else return null
      })
    )]
  }
  render () {
    return (
      <div className='tabContainer'>
        <div className='searchBar'>
          <input className='contactSearch'  onChange={(e)=>{this.handleSearchInput(e)}} placeholder='Search contacts' />
          <a onClick={() => this.handleAdd()}><span className='glyphicon glyphicon-plus glyphRight' /></a>
        </div>
        <ul className='contactsList'>
          {
            this.state.contacts.map((contact, i) => {
              return (<Contact key={i} contact={contact} />)
            })
        }

        </ul>

      </div>)
  }
}

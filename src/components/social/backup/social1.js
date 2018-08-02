import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ContactsList from './ui/contactsList'
import TagsList from './ui/tagsList'
import Tabs from './ui/tabs'
import Question from './ui/question'
import Map from './ui/map'
import { api } from '../../actions/api.config'
import { groupColors } from './options/groupColors'
import AddTagOverlay from './ui/addTagOverlay'
import AddContactOverlay from './ui/addContactOverlay'
import { contactsQuestions } from './options/contactsQuestions'
import ContactLane from './ui/contactLane.js'
import io from 'socket.io-client'
import { createTags, createSingleTag, createGroupItem} from './helpers.js'
var _ = require('lodash')

import {
  loadContacts,
  updateContact,
  collectContact,
  uploadTags,
  uploadTag,
  uploadGroups,
  setSocialProgress,
  setDoneSortContacts,
  setDoneGroupContacts,
  setDoneTagsQuestions,
  setDoneBucketQuestions,
  setdoneSocial,
  setContactsQuestionsProgress
} from '../../actions/surveyAction'

@connect((store) => {
  return {
		user: store.user.user ? store.user.user : store.survey.user,
		profile: store.survey.profile,
    doneTags: (store.survey.profile.doneTags || false),
    doneContacts: (store.survey.profile.doneContacts || false),
    doneContactsQuestions: (store.survey.profile.doneContactsQuestions || false),
    doneSocial: (store.survey.profile.doneSocial || false),
		progress: store.survey.progress,
    interests: store.survey.interests ? store.survey.interests : store.survey.profile.interests,
    contacts: store.survey.contacts,
  }
})
export default class Social extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedList: 0,
      contacts: this.props.contacts ? this.props.contacts : [],
      addContactOverlay: false,
      // TODO REENABLE THIS
      // hasContacts: this.props.user.hasContacts ? this.props.user.hasContacts : false,
      hasContacts: true,
      currQues:  this.props.profile.socialProgress ?  this.props.profile.socialProgress : 0,
      questions: this.props.profile.tags ?  this.props.profile.tags : [],
      showAddTagWindow: false,
      doesWorkOrVolunteer: false,
      addTagWindowType: 'default',
      offset: 10,
      groupItems: this.props.profile.groups ? this.props.profile.groups : [],
      contactsQuestions: contactsQuestions,
      contactsQuestionsProgress: this.props.profile.contactsQuestionsProgress ?  this.props.profile.contactsQuestionsProgress : 0,
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if(!this.state.contacts != nextProps.contacts){
      this.setState({
        contacts: [...nextProps.contacts ],
        hasContacts: true
      })
    }
  }
  componentWillUnmount = () => {
    this.socket.removeListener('contactsListener');
  }
  componentDidMount = () => {
    if(this.props.profile && !this.props.profile.hasTags) {

      let temp = createTags(this.props.interests, this.props.profile.schoolAndWork);

      this.props.dispatch(uploadTags(temp))
      this.setState({
       questions: temp
      })
    } else {
      this.setState({
        questions: this.props.profile.tags
      })
    }

   this.socket = io.connect('http://' + api.address + ':8082')

    if(this.props.user.hasContacts){
       this.props.dispatch(loadContacts());
       this.socket.removeListener('contactsListener')
     } else {
       this.socket.emit('contactsListener')
       this.socket.on('hasContacts',(val)=>{
         this.props.dispatch(loadContacts())
       })
     }
  }

  getTabs = () => {
    if(!this.props.doneContactsQuestions){
      return(
         <div className='socialContainer'>
          <div className='contactsContainer'>
            <div className='contacts'>
              <Tabs
                selectedList={this.state.selectedList}
                enableTags={this.props.doneTags}
                onSelect={this.selectTab}
              />
              {
                this.getList()
              }
            </div>
          </div>
        </div>
      )
    }
  }
  selectTab = (n) => {
    this.setState({ selectedList: n })
  }
  addContact = () => {
    this.setState({ addContactOverlay: true })
  }
  hideAddContact = () => {
    this.setState({addContactOverlay: false})
  }
  getAddContactOverlay = () => {
    if(this.state.addContactOverlay){
        return <AddContactOverlay  hideAddContact={this.hideAddContact}/>
    }
  }
  handleAddTag = (type, title) => {

    let newTag = createSingleTag(type, title, this.state.questions.length);

    if(newTag) {
      this.setState({questions: [...this.state.questions, newTag] , showAddTagWindow: false})
      this.props.dispatch(uploadTag(newTag))
    }

  }
  selectContacts = (value) => {
    var superNew = []
    this.state.contacts.forEach((c) => {
      var temp = c
      if (temp.selected) {
        temp.selected = false;
        temp[this.state.contactsQuestions[this.state.contactsQuestionsProgress].key] = value;
        this.props.dispatch(updateContact(temp))
      }
      superNew.push(temp)
    })
    this.setState({ contacts: superNew })
  }
  openAddWindow = (type) => {
    this.setState({showAddTagWindow: true, addTagWindowType: type})
  }
  closeAddWindow = (type) => {
    this.setState({showAddTagWindow: false})
  }
  addGroupItem = (title) => {
    let temp = _.isEmpty(this.state.groupItems) ? [] : [...this.state.groupItems]
    temp.push(createGroupItem(this.state.groupItems.length, title, this.state.offset))
    this.setState({groupItems: temp, offset: this.state.offset + 10})
    this.props.dispatch(uploadGroups(temp))
  }
  dropContact = (id, pos) => {
    var newContacts = []
    this.state.contacts.forEach((contact) => {
      var temp = contact
      if (temp.id == id) {
        if(!temp.positions.length) this.handleGroupToggle(temp);
        temp.positions = [...temp.positions, pos]
        this.props.dispatch(updateContact(temp))
      }
      newContacts.push({ ...temp })
    })
    this.setState({ mapContacts: newContacts })
  }
  undropContact = (id, pos) => {
    var superNew = []
    this.state.contacts.forEach((c) => {
      var temp = c
      if (temp.id == id) {
        temp.positions.splice(pos, 1)
        if(!temp.positions.length) temp.tags = []
        this.props.dispatch(updateContact(temp))
      }
      superNew.push(temp)
    })
    this.setState({ contacts: superNew })
  }
  updateContact = (id, index, newPos) => {
    var superNew = []
    this.state.contacts.forEach((c) => {
      var temp = c
      if (temp.id == id) {
        temp.positions.splice(index, 1)
        temp.positions.push(newPos)
        this.props.dispatch(updateContact(temp))
      }
      superNew.push(temp)
    })
    this.setState({ contacts: superNew })
  }
  updateGroupItem = (index, groupItem, newPos ) => {
    var temp = {...groupItem}
    temp.x = newPos.x
    temp.y = newPos.y
    var temparray = [...this.state.groupItems]
    temparray[index] = temp
    this.setState({groupItems:temparray})

    this.props.dispatch(uploadGroups(temparray))

  }
  handleSelectTag = (i) => {
    this.setState({ currQues: i })
  }
  handleGroupToggle = (contact) => {
    var contacts = _.flatten([..._.map(this.state.contacts, (cont) => {
      if (cont.id === contact.id) {
        if(this.props.doneContactsQuestions){
          if(cont.selected) {
            cont.selected = false;
          } else {
            cont.selected = true;
          }
        } else {
          if (_.includes(cont.tags, this.state.questions[this.state.currQues])) {
            cont.tags = _.compact(
                _.map(cont.tags, (grp) => {
                  if (grp.value == this.state.questions[this.state.currQues].value) {
                    return null
                  }
                  return grp
                })
            )
          } else {
            cont.tags.push(this.state.questions[this.state.currQues])
          }
        }
        this.props.dispatch(updateContact(cont))
      }
      return cont
    })])
    this.setState({ contacts: contacts })
  }
  getList = () => {
    if(this.props.doneTags){
      if (!this.state.selectedList) {
        return <ContactsList handleAddContact={this.addContact} contacts={this.state.contacts} />
      } else {
        return <TagsList doesWorkOrVolunteer={this.state.doesWorkOrVolunteer} openAddWindow={this.openAddWindow} handleSelectTag={this.handleSelectTag} tagList={this.state.questions} />
      }
    } else {
      return <ContactsList handleAddContact={this.addContact} contacts={this.state.contacts} />
    }
  }
  getAddTagOverlay = () => {
    if(this.state.showAddTagWindow) return <AddTagOverlay hideAddTag={this.closeAddWindow} type={this.state.addTagWindowType} handleAddTag={this.handleAddTag} />
  }
  unselectContact = (contact) => {
    var contacts = _.flatten([..._.map(this.state.contacts, (cont) => {
      if (cont.id === contact.id) {
          cont.selected = false;
          cont[this.state.contactsQuestions[this.state.contactsQuestionsProgress].key] = 0;
        this.props.dispatch(updateContact(cont))
      }
      return cont
    })])
    this.setState({ contacts: contacts })
  }
  getQuestion = () => {
        return <Question
            doneContactsQuestions = {this.props.doneContactsQuestions}
            doneGroups = {this.state.doneGroups}
            question={this.state.questions[this.state.currQues]}
            doneTags={this.props.doneTags}
            doneContacts={this.props.doneContacts}
            createGroupItem={this.addGroupItem}
            contactsQuestion={this.state.contactsQuestions[this.state.contactsQuestionsProgress]}
          />
  }
  getContactsLanes = () => {
    if(this.props.doneContactsQuestions){
      return this.state.contactsQuestions[this.state.contactsQuestionsProgress].options.map((option, i)=>{
          return <ContactLane
            key= {i}
            title = {option}
            unselectContact = {this.unselectContact}
            contacts = {this.state.contacts}
            contactsQuestion = {this.state.contactsQuestions[this.state.contactsQuestionsProgress]}
            optionValue = {i+1}
            selectContacts = {this.selectContacts}
          />
      })
    } else {
      return ''
    }
  }
  getMapStyles = () => {
    if(this.props.doneContactsQuestions && !this.state.doneSocial){
      return {
        width: '95%',
        marginLeft: '2%',
        marginRight: '5%'
      }
    } else {
      return {}
    }
  }
  handleCopyContact = (cont, position) => {
    var newContacts = []
    var pos = {...position};
    pos.x += 50;
    pos.y += 50;
    this.state.contacts.forEach((contact) => {
      var temp = contact
      if (temp.id == cont.id) {
        temp.positions = [...temp.positions, pos]
        this.props.dispatch(updateContact(temp))
      }
      newContacts.push({ ...temp })
    })
    this.setState({ mapContacts: newContacts })
  }
  removeGroupItem = (i) => {
    var temp = [...this.state.groupItems]
    temp.splice(i, 1);
    this.setState({groupItems: temp})
    this.props.dispatch(uploadGroups(temp))
  }
  nextPage = () => {
    if(this.props.doneContactsQuestions) {
      if(this.state.contactsQuestionsProgress < this.state.contactsQuestions.length) {
        if(this.state.contactsQuestionsProgress + 1 == this.state.contactsQuestions.length) {
          var newProgress = this.state.contactsQuestionsProgress + 1
          this.props.dispatch(setdoneSocial())
          this.props.dispatch(setContactsQuestionsProgress(newProgress))
        } else {
          var newProgress = this.state.contactsQuestionsProgress + 1
          this.props.dispatch(setContactsQuestionsProgress(newProgress))
        }
      }
    } else {
    if(this.state.doneGroups){
      this.props.dispatch(setDoneContactsQuestions())
    } else {
      if(this.props.doneContacts) {
       this.props.dispatch(setDoneGroups())
     } else {
       if(this.props.doneTags){
         this.props.dispatch(setDoneContacts())
       } else {
         if(this.state.currQues < this.state.questions.length){
           if(this.state.currQues + 1 == this.state.questions.length) {
             this.props.dispatch(setDoneTags())
           } else {
               var newProgress = this.state.currQues + 1
               this.setState({ currQues: newProgress })
               this.props.dispatch(setSocialProgress(newProgress))
             }
          }
        }
      }
     }
    }
    window.scrollTo(0, 0)
  }
  render () {
    if(this.state.doneSocial) {
      return <h1 className="thankyou-message">Thank you for participating! <br/> <br/> We'll see you soon :)</h1>
    }
    else if (!this.state.hasContacts) {
      return <h1>Please upload your contacts via the mobile app.</h1>
    } else {
      return (
        <div>
            {
              this.getAddContactOverlay()
            }
            {
              this.getAddTagOverlay()
            }
            {
              this.getTabs()
            }
          <div className='socialMap' style={this.getMapStyles()}>
            {
              this.getQuestion()
            }
            <Map
              doneContactsQuestions={this.props.doneContactsQuestions}
              contactsQuestion={this.state.contactsQuestions[this.state.contactsQuestionsProgress]}
              doneGroups={this.state.doneGroups}
              groupItems={this.state.groupItems}

              removeGroupItem={this.removeGroupItem}
              undropContact={this.undropContact}
              handleGroupToggle={this.handleGroupToggle}
              dropContact={this.dropContact}
              handleCopyContact={this.handleCopyContact}
              updateContact={this.updateContact}
              contacts={this.state.contacts}
              updateGroupItem={this.updateGroupItem}
            />
            {
              this.getContactsLanes()
            }

            <div className='continue_btn_div' >
              <button className='btn btn-primary continue_btn pull-right' style={{display: this.state.doneSocial ? 'none' : ''}} onClick={() => { this.nextPage() }}>Continue</button>
            </div>
          </div>

        </div>
      )
    }
  }
}

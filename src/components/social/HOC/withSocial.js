import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import ContactsList from '../ui/contactsList'
import TagsList from '../ui/tagsList'
import Tabs from '../ui/tabs'
import Question from '../ui/question'
import Map from '../ui/map'
import { api } from '../../../actions/api.config'
import { groupColors } from '../options/groupColors'
import AddTagOverlay from '../ui/addTagOverlay'
import AddContactOverlay from '../ui/addContactOverlay'
import { bucketQuestions } from '../options/bucketQuestions'
import { selectQuestions } from '../options/selectQuestions'
import ContactLane from '../ui/contactLane.js'
import io from 'socket.io-client'
import { createTags, createSingleTag, createGroupItem, createSocialGroups } from './helpers.js'
import { pageTypes } from '../options/pageTypes'
var _ = require('lodash')

import {
  loadContacts,
  updateContact,
  collectContact,
  uploadTags,
  uploadTag,
  uploadGroups,
  setDoneSortContacts,
  setDoneGroupContacts,
  setDoneTagsQuestions,
  setDoneBucketQuestions,
  setDoneSelectContacts,
  setDoneSocial,
  setTagsQuestionsProgress,
  setBucketQuestionsProgress,
  setSelectContactsProgress
} from '../../../actions/surveyAction'

@connect((store) => {
  return {
		user: store.user.user ? store.user.user : store.survey.user,
		profile: store.survey.profile,
    doneTagsQuestions: (store.survey.profile.doneTagsQuestions || false),
    doneSortContacts: (store.survey.profile.doneSortContacts || false),
    doneGroupContacts: (store.survey.profile.doneGroupContacts || false),
    doneBucketQuestions: (store.survey.profile.doneBucketQuestions || false),
    doneSelectContacts: (store.survey.profile.doneSelectContacts || false),
    doneSocial: (store.survey.profile.doneSocial || false),
		progress: store.survey.progress,
    interests: store.survey.interests ? store.survey.interests : store.survey.profile.interests,
    contacts: store.survey.contacts,
  }
})

export const withSocial = (pageProperties) => (WrappedComponent) => {
  return class WithSocial extends Component {
    constructor (props) {
      super(props)

      this.state = {
        selectedList: 0,
        contacts: this.props.contacts ? this.props.contacts : [],
        addContactOverlay: false,
        // TODO REENABLE THIS
        // hasContacts: this.props.user.hasContacts ? this.props.user.hasContacts : false,
        groupContactsSection: 0,
        hasContacts: true,
        sortContactsSection: 0,
        currQues:  this.props.profile.tagsQuestionsProgress ?  this.props.profile.tagsQuestionsProgress : 0,
        questions: this.props.profile.tags ?  this.props.profile.tags : [],
        showAddTagWindow: false,
        doesWorkOrVolunteer: false,
        addTagWindowType: 'default',
        offset: 10,
        groupItems: this.props.profile.groups ? this.props.profile.groups : [],
        bucketQuestions: bucketQuestions,
        bucketQuestionsProgress: this.props.profile.bucketQuestionsProgress ?  this.props.profile.bucketQuestionsProgress : 0,
        selectContactsQuestions: selectQuestions,
        selectContactsProgress: this.props.profile.selectContactsProgress ?  this.props.profile.selectContactsProgress : 0,
        selectedGroup: {},
        selectContactsGroupItems: [],
        showError: false
      }

      if(pageProperties.type == 'SELECT_CONTACTS') {
        this.state.selectContactsGroupItems = this.state.groupItems;
        let temp = []
        temp.push(createSocialGroups(this.state.groupItems.length, 'People I Met Through Technology', {x: 10, y: 10}))
        temp.push(createSocialGroups(this.state.groupItems.length, 'People I Didn\'t Meet Through Technology', {x: 450, y:10}))
        this.state.groupItems = temp;
        this.state.offset = this.state.offset+200;
      }

    }
    componentWillReceiveProps(nextProps) {
      if(!this.props.contacts != nextProps.contacts){
        this.setState({
          contacts: [...nextProps.contacts ],
          hasContacts: true
        })
      }
    }
    componentWillUnmount(){
      if(this.socket) this.socket.removeListener('contactsListener');
    }
    componentDidMount(){
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
      if(this.props.user.hasContacts && (this.state.contacts.length == 0)){
         this.props.dispatch(loadContacts());
       } else {
         this.socket = io.connect('http://' + api.address + ':8082')
         this.socket.emit('contactsListener')
         this.socket.on('hasContacts',(val)=>{
           this.props.dispatch(loadContacts())
         })
       }
    }
    getMap = () => {
      return <Map
        type={pageProperties.type}
        bucketQuestion={this.state.bucketQuestions[this.state.bucketQuestionsProgress]}
        selectContactsQuestion={this.state.selectContactsQuestions[this.state.selectContactsProgress]}
        groupItems={this.state.groupItems}
        removeGroupItem={this.removeGroupItem}
        undropContact={this.undropContact}
        handleGroupToggle={this.handleGroupToggle}
        dropContact={this.dropContact}
        handleCopyContact={this.handleCopyContact}
        updateContact={this.updateContact}
        contacts={this.state.contacts}
        updateGroupItem={this.updateGroupItem}
        selectGroup={this.selectGroup}
        groupSelected = {this.state.selectedGroup}
      />
    }
    getTabs = () => {
      if(pageProperties.type !== pageTypes.BUCKET_QUESTIONS){
        return(
           <div className='socialContainer'>
            <div className='contactsContainer'>
              <div className='contacts'>
                <Tabs
                  selectedList={this.state.selectedList}
                  enableTags={this.props.doneTagsQuestions}
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
          if(pageProperties.type === pageTypes.BUCKET_QUESTIONS){
            temp[this.state.bucketQuestions[this.state.bucketQuestionsProgress].key] = value;
            if(this.state.bucketQuestions[this.state.bucketQuestionsProgress].id == 2 && value != 3)
              temp[this.state.bucketQuestions[3].key] = 6
            if(this.state.bucketQuestions[this.state.bucketQuestionsProgress].id == 3 && value != 6){
              temp[this.state.bucketQuestions[4].key] = 2
            }

          }
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
      var contacts =
      _.flatten([..._.map(this.state.contacts, (cont) => {
        if (cont.id === contact.id) {
          if(pageProperties.type === pageTypes.BUCKET_QUESTIONS){
            if(cont.selected) {
              cont.selected = false;
            } else {
              cont.selected = true;
            }
          } else if (pageProperties.type === pageTypes.SELECT_CONTACTS) {
            if(contact.technology == 6){
              let currKey = this.state.selectContactsQuestions[this.state.selectContactsProgress].key;
              cont[currKey] = !cont[currKey];
              cont.selected = cont[currKey];
              cont.introducedBySomeone = true;
            }
          } else if (pageProperties.type === pageTypes.GROUP_CONTACTS){
            if(cont.id == contact.id){
              let selectedGroup = this.state.selectedGroup
              let newGroup = []
              if(cont.groups == undefined){
                cont.groups = []
                cont.groups.push(this.state.selectedGroup)
              }
              else {
                newGroup = cont.groups.filter(function(el) {
                  return el.index == selectedGroup.index;
                });
                if(newGroup.length == 0)
                  cont.groups.push(this.state.selectedGroup)
                else
                  cont.groups = cont.groups.filter(function(el) {
                  return el.index !== selectedGroup.index;
                });
              }
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
      // ;
      this.setState({ contacts: contacts })
    }

    /* Group Contacts Section */
    setGroupContactsSection = () => {
      this.setState({groupContactsSection: 1})
    }

    selectGroup = (group) => {

      this.setState({selectedGroup : group})
    }

    getList = () => {
      switch(pageProperties.type) {
        case(pageTypes.TAGS_QUESTIONS) : {
          return <ContactsList
            handleAddContact={this.addContact}
            contacts={this.state.contacts} />
        }
        case(pageTypes.SELECT_CONTACTS) :
        case(pageTypes.GROUP_CONTACTS) :
        case(pageTypes.SORT_CONTACTS) : {

          if(pageProperties.type == pageTypes.SORT_CONTACTS && this.state.sortContactsSection){
          // if(pageProperties.type == pageTypes.SORT_CONTACTS && (this.state.currQues+1 == this.state.questions.length)){
            return <TagsList
              doesWorkOrVolunteer={this.state.doesWorkOrVolunteer}
              openAddWindow={this.openAddWindow}
              handleSelectTag={this.handleSelectTag}
              tagList={this.state.questions} />
            } else {
              if (!this.state.selectedList) {
                return <ContactsList
                  handleAddContact={this.addContact}
                  contacts={this.state.contacts} />
              } else {
                return <TagsList
                  doesWorkOrVolunteer={this.state.doesWorkOrVolunteer}
                  openAddWindow={this.openAddWindow}
                  handleSelectTag={this.handleSelectTag}
                  tagList={this.state.questions} />
              }
            }

        }
      }
    }
    getAddTagOverlay = () => {
      if(this.state.showAddTagWindow)
        return <AddTagOverlay
          hideAddTag={this.closeAddWindow}
          type={this.state.addTagWindowType}
          handleAddTag={this.handleAddTag} />
    }
    unselectContact = (contact) => {
      var contacts = _.flatten([..._.map(this.state.contacts, (cont) => {
        if (cont.id === contact.id) {
            cont.selected = false;
            cont[this.state.bucketQuestions[this.state.bucketQuestionsProgress].key] = 0;
          this.props.dispatch(updateContact(cont))
        }
        return cont
      })])
      this.setState({ contacts: contacts })
    }

    getQuestion = () => {
        return <Question
              type={pageProperties.type}
              sortContactsSection={this.state.sortContactsSection}
              groupContactsSection={this.state.groupContactsSection}
              selectContactsQuestion={this.state.selectContactsQuestions[this.state.selectContactsProgress]}
              bucketQuestion={this.state.bucketQuestions[this.state.bucketQuestionsProgress]}
              question={this.state.questions[this.state.currQues]}
              addGroupItem={this.addGroupItem}
              setGroupContactsSection = {this.setGroupContactsSection}
              getError = {this.getError}
          />
    }
    getContactsLanes = () => {
      let options = this.state.bucketQuestions[this.state.bucketQuestionsProgress].options
      if(!this.props.profile.schoolAndWork.internationalStudentStatus){
        let indexOfUSA = options.indexOf('USA')
        if(indexOfUSA != -1)
          options.splice(indexOfUSA, 1)
      }
      if(pageProperties.type === pageTypes.BUCKET_QUESTIONS){
        return options.map((option, i)=>{
            return <ContactLane
              key= {i}
              title = {option}
              unselectContact = {this.unselectContact}
              contacts = {this.state.contacts}
              contactsQuestion = {this.state.bucketQuestions[this.state.bucketQuestionsProgress]}
              optionValue = {i+1}
              selectContacts = {this.selectContacts}
            />
        })
      } else {
        return ''
      }
    }
    getMapStyles = () => {
      if(pageProperties.type === pageTypes.BUCKET_QUESTIONS){
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

    // checkWhetherAllContactsMapped = () => {
    //   let contacts = this.state.contacts
    //   contacts.forEach((contact, i) => {
    //     let key = this.state.bucketQuestions[this.state.bucketQuestionsProgress].key
    //     if(contact[key] == 0)
    //       this.setState({ showError: true })
    //   })


    // }

    getError = () => {
      if (this.state.showError) {
        return (<div className='error' style={{ marginTop: '15%', marginBottom: '-13%' }}>{this.state.errorMessage ? this.state.errorMessage : 'Please select at least one interest.'}</div>)
      } else {
        return
      }
    }

    nextPage = () => {
      switch (pageProperties.type) {
        case(pageTypes.TAGS_QUESTIONS): {
          if(this.state.currQues < this.state.questions.length) {
            if(this.state.currQues + 1 == this.state.questions.length) {
              this.props.dispatch(setDoneTagsQuestions())
            } else {
                var newProgress = this.state.currQues + 1
                this.setState({ currQues: newProgress })
                this.props.dispatch(setTagsQuestionsProgress(newProgress))
              }
           }
           break;
        }
        case(pageTypes.SORT_CONTACTS): {
          if(this.state.sortContactsSection) {
              this.props.dispatch(setDoneSortContacts());
          } else {
            this.setState({sortContactsSection: 1});
          }
          break;
        }
        case(pageTypes.GROUP_CONTACTS): {
          if(this.state.groupContactsSection) {
              this.props.dispatch(setDoneGroupContacts());
          } else {
            this.setState({groupContactsSection: 1});
          }
          break;
        }
        case(pageTypes.BUCKET_QUESTIONS): {
          ;
          if(this.state.bucketQuestionsProgress < this.state.bucketQuestions.length) {
            if(this.state.bucketQuestionsProgress + 1 == this.state.bucketQuestions.length) {
              this.props.dispatch(setDoneBucketQuestions())
            } else {
                var newProgress = this.state.bucketQuestionsProgress + 1
                this.setState({ bucketQuestionsProgress: newProgress })
                this.props.dispatch(setBucketQuestionsProgress(newProgress))
              }
           }
           break;
        }
        case(pageTypes.SELECT_CONTACTS): {
          var temp = []
          temp.push(this.state.selectContactsGroupItems)
          temp.push(this.state.groupItems)
          this.setState({groupItems: temp})
          if(this.state.selectContactsProgress < this.state.selectContactsQuestions.length) {
            if(this.state.selectContactsProgress + 1 == this.state.selectContactsQuestions.length) {
              this.props.dispatch(setDoneSelectContacts())
            } else {
                var newProgress = this.state.selectContactsProgress + 1
                this.setState({ selectContactsProgress: newProgress })
                this.props.dispatch(setSelectContactsProgress(newProgress))
              }
           }
           break;
        }
      }
      window.scrollTo(0, 0)
    }
      render() {
        const state = this.state
        return <WrappedComponent {
          ...{
            props: {...this.props, state },
            getAddContactOverlay: this.getAddContactOverlay,
            getAddTagOverlay: this.getAddTagOverlay,
            getTabs: this.getTabs,
            getMapStyles: this.getMapStyles,
            getQuestion: this.getQuestion,
            getContactsLanes: this.getContactsLanes,
            getMap: this.getMap,
            nextPage: this.nextPage,
            //chagne this later
            dropContact: this.dropContact,
            updateContact: this.updateContact,
            handleCopyContact: this.handleCopyContact,
            updateGroupItem: this.updateGroupItem,
            removeGroupItem: this.removeGroupItem,
            handleGroupToggle: this.handleGroupToggle,
            undropContact: this.undropContact,
            getError: this.getError
          }
        }/>
      }
  }
}

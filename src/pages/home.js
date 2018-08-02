import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import TopNav from '../components/home/topNav'
import TermsConditions from '../components/home/termsandconditions'
import SenseOfCommunity from '../components/scientific/senseOfCommunity'
import Sociability from '../components/scientific/sociality'
import WellBeing from '../components/scientific/well-being'
import Background from '../components/basicInfo/background'
import SchoolWork from '../components/basicInfo/schoolWork'
import Passion from '../components/interests/passion'
import Expertise from '../components/interests/expertise'
import Teach from '../components/interests/teach'
import Taught from '../components/interests/taught'
import Group from '../components/interests/group'
import GroupMethod from '../components/interests/groupMethod'
import Places from '../components/interests/places'
import Others from '../components/interests/others'
import YourInterests from '../components/interests/yourInterests'
import Profile from '../components/profileFinalization/profile'
import TagsQuestions from '../components/social/tagsQuestions.js'
import SortContacts from '../components/social/sortContacts.js'
import SelectContacts from '../components/social/selectContacts.js'
import GroupContacts from '../components/social/groupContacts.js'
import BucketQuestions from '../components/social/bucketQuestions.js'
import CoordinatingHome from '../components/coordinating/coordinatingHome'
import ValidateEmail from '../components/home/validateEmail'
import ValidationOverlay from '../components/home/validationOverlay'
import io from 'socket.io-client'
import { loadSurveyData } from '../actions/surveyAction.js'
import { validatePhone, validateEmail } from '../actions/userAuth.js'
import { api } from '../actions/api.config'

@connect((store) => {
  return {
  		user:  _.isEmpty(store.user.user) ? store.survey.user : store.user.user,
  		profile: _.isEmpty(store.survey.profile.profile) ? store.survey.profile : store.survey.profile.profile,
  		progress: store.survey.progress,
      hasViewedTerms: store.user.hasViewedTerms
  }
})

export default class Home extends React.Component {
  constructor(props){
    super(props);
    let isEmailValid = true;
    let isPhoneValid = true;
    props.user.emails.forEach((email) => {
      if (!email.isValidated) {
          isEmailValid = false
      }
    })
    props.user.phones.forEach((phone) => {
      if (!phone.isValidated) {
          isPhoneValid = false
      }
    })
    this.state = {
      isPhoneValid: isPhoneValid,
      isEmailValid: isEmailValid,
      emails: props.user.emails,
    }
  }

  componentDidMount(){
    this.socket = io.connect('http://' + api.address + ':8082')
    this.socket.emit('emailValidationListener')
    this.socket.on('updatedEmail', (email)=>{
      if(email && email.isValidated){
        this.props.dispatch(validateEmail(email));
      }
    })
    this.socket.emit('phoneValidationListener')
    this.socket.on('updatedPhone',(phone)=>{
      if(phone && phone.isValidated){
        this.props.dispatch(validatePhone(phone));
      }
    })
  }
  componentWillReceiveProps(nextProps){
    if(!this.state.isPhoneValid) {
      let isPhoneValid = true;
      nextProps.user.phones.forEach((phone) => {
        if (!phone.isValidated) {
            isPhoneValid = false
        }
      })
      if(this.state.isEmailValid && isPhoneValid) this.removeListeners();
      this.setState({
        isPhoneValid: isPhoneValid
      })
    }
    if(!this.state.isEmailValid) {
      let isEmailValid = true;
      nextProps.user.emails.forEach((email) => {
        if (!email.isValidated) {
            isEmailValid = false
        }
      })
      if(this.state.isPhoneValid && isEmailValid) this.removeListeners();
      this.setState({
        isEmailValid: isEmailValid,
        emails: nextProps.user.emails
      })
    }
  }
  removeListeners = () => {
    this.socket.removeListener('phoneValidationListener')
    this.socket.removeListener('emailValidationListener')
  }
  componentWillUnmount(){
    this.removeListeners();
  }
  getComponent() {
    if (this.props.progress == 0) {
      return <SenseOfCommunity />
    } else if (this.props.progress == 1) {
      return <Background />
    } else if (this.props.progress == 2) {
      return <SchoolWork />
    } else if (this.props.progress == 3) {
      return <YourInterests />
    } else if (this.props.progress == 4) {
      return <Group />
    } else if (this.props.progress == 5) {
      return <GroupMethod />
    } else if (this.props.progress == 6) {
      return <Places />
    } else if (this.props.progress == 7) {
      return <Profile />
    } else if (this.props.progress == 8) {
      return <TagsQuestions />
    } else if (this.props.progress == 9) {
      return <SortContacts />
    } else if (this.props.progress == 10) {
      return <GroupContacts />
    } else if (this.props.progress == 11) {
      return <BucketQuestions />
    } else if (this.props.progress == 12) {
      return <SelectContacts />
    } else if (this.props.progress == 13) {
      return <CoordinatingHome />
    } else {
      return <h1> Loading </h1>
    }
  }

  render () {
    if(!this.state.isPhoneValid) {
       return <ValidationOverlay />
    } else if(!this.state.isEmailValid) {
       return <ValidateEmail emails={this.state.emails}/>
    } else
    return (
      <div>
        <TopNav />
        <div className='survey_content'>
          {this.getComponent()}
        </div>
      </div>
	 	)
  }
}

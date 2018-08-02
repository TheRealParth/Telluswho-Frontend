var _ = require('lodash')

export default function surveyReducer (state = {
  profile: {},
  senseOfCommunity:{},
  sociability:{},
  wellbeing:{},
  backgroundInfo:{},
  schoolAndWork:{},
  interests:[],
  contacts: [],
  user: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : false,
  progress:null,
  error:null,
  hasLoaded: false
}, action) {
  switch (action.type) {
    case ('LOAD_SURVEY_DATA_SUCCESS' || 'USER_LOGIN_SUCCESS'): {
      var profile = action.payload.profile
      var user = action.payload.user
      var prog = 0
      var contacts = action.payload.contacts
      if (profile.doneTagsQuestions) {
        prog = 9;
        if(profile.doneSortContacts)
          prog = 10;
        if(profile.doneGroupContacts)
          prog = 11;
        if(profile.doneBucketQuestions){
          //prog = 12;
          prog = 13;
        }
        if(profile.doneSelectContacts)
          prog = 13;
      } else
      if (profile.interests.length > 0) {
          prog = 4
        if (profile.hasGroup) {
          prog = 5
        }
        if (profile.hasGroupMethod) {
          prog = 6
        }
        if (profile.hasPlaces) {
          prog = 7
        }
        if (profile.hasReviewedProfile) {
          prog = 8
        }
      } else if (_.hasIn(profile, 'schoolAndWorkId')) {
        prog = 3
      } else if (_.hasIn(profile, 'backgroundInfoId')) {
        prog = 2
      } else if (_.hasIn(profile, 'senseOfCommunityId')) {
        prog = 1
      } else {
        prog = 0
      }

      return {
        ...state,
        error: null,
        profile: profile,
        interests: profile.interests,
        progress:prog, //prog,
        user: user,
        contacts: contacts,
        hasLoaded: true
      }
    }
    case 'CLEAR_DATA': {
      return {
        profile: {},
        senseOfCommunity:{},
        sociability:{},
        wellbeing:{},
        backgroundInfo:{},
        schoolAndWork:{},
        interests:[],
        contacts: [],
        user: false,
        progress:null,
        error:null,
        hasLoaded: false
      }
    }
    case 'USER_LOGOUT_SUCCESS': {
      ;
      return {
        profile: {},
        senseOfCommunity:{},
        sociability:{},
        wellbeing:{},
        backgroundInfo:{},
        schoolAndWork:{},
        interests:[],
        contacts: [],
        user: false,
        progress:null,
        error:null,
        hasLoaded: false
      }
    }
    case 'VALIDATE_PHONE' : {
      const phone = action.payload;
      if(state.user && state.user.phones) {
        const temp = state.user.phones.map((p) => {
            if(p.id == phone.id) {
              p.isValidated = phone.isValidated;
            }
            return {...p }
          })
        return {
          ...state,
            user: {
              ...state.user,
                phones: temp
              }
          }
      } else {
        return state
      }
    }
    case 'VALIDATE_EMAIL' : {
      const email = action.payload;
      if(state.user && state.user.emails) {
        const temp = state.user.emails.map((e) => {
            if(e.id == email.id) {
              e.isValidated = email.isValidated;
            }
            return {...e }
        })
        return {
          ...state,
            user: {
              ...state.user,
                emails: temp
              }
          }
      } else {
        return state
      }
    }
    case 'PROFILE_REVIEW_SUCCESS': {
      const profile = action.payload.profile
      const interests = action.payload.profile.interests
      return {
        ...state,
        profile: profile,
        interests: interests
      }
    }
    case 'LOAD_SURVEY_DATA_ERR': {
      return {
        ...state,
        user: {},
        isLoggedIn: false,
        isLoggedOut: true,
        progress: 0
      }
    }
    case 'INCREASE_PROGRESS': {
      const new_prog = state.progress + 1
      return {
        ...state,
        progress:new_prog
      }
    }
    case 'SENSE_OF_COMM_SUCCESS': {
      return {
        ...state,
        error:null,
        senseOfCommunity:action.payload
      }
    }
    case 'SOCIABILITY_SUCCESS': {
      return {
        ...state,
        error:null,
        sociability:action.payload
      }
    }
    case 'WELLBEING_SUCCESS': {
      return {
        ...state,
        error:null,
        wellbeing:action.payload
      }
    }
    case 'BACKGROUND_SUCCESS': {
      return {
        ...state,
        error:null,
        profile: action.payload.profile,
        backgroundInfo:action.payload
      }
    } case 'SCHOOLWORK_SUCCESS': {
      return {
        ...state,
        error:null,
        schoolAndWork:action.payload
      }
    } case 'METHOD_IN_GROUP_SUCCESS': {
      return {
        ...state,
        methodInGroup: action.payload
      }
    } case 'INTERESTS_SUCCESS': {
      return {
        ...state,
        error: null,
        interests: action.payload.interests
      }
    }
    case 'CONTACTS_UPLOAD_SUCCESS' : {
      let temp = state.contacts ? [...state.contacts] : []
      temp.push(action.payload.contact)
      return {
        ...state,
        error: null,
        contacts: [...temp]
      }
    }

    case 'CONTACTS_UPLOAD_FAILED' : {
      return {
        ...state,
        error: "Failed to upload contact"
      }
    }
    case 'DATA_ERR': {
      return {
        ...state,
        error:action.payload
      }
    }
    case 'PLACES_SUCCESS': {
      return {
        ...state,
        interests: action.payload.interests,
        profile: action.payload.profile
      }
    }
    case 'LOAD_USER': {
      return {
        ...state,
        user:action.payload
      }
    }
    case 'UPLOAD_TAGS_SUCCESS' : {
      var temp = state.profile
      temp.tags = [...action.payload.tags]
      return {
        ...state,
        profile: temp
      }
    }
    case 'UPLOAD_GROUPS_SUCCESS' : {
      var temp = state.profile
      temp.groups = [...action.payload.groups]
      return {
        ...state,
        profile: temp
      }
    }

    case 'LOAD_CONTACTS_DATA_SUCCESS' : {
      return {
        ...state,
        contacts: [...action.payload.contacts]
      }
    }
    case 'LOAD_CONTACTS_DATA_ERR' : {
      return {
        ...state,
        contacts: [],
        error: action.payload
      }
    }

    case 'SET_SOCIAL_PROGRESS_SUCCESS' : {
      var temp = {...state.profile}
      temp.socialProgress = action.payload.progress
      ;
      ;
      return {
        ...state,
        profile: temp
      }
    }
    case 'SET_TAGS_QUESTIONS_PROGRESS' : {
      var temp = {...state.profile}
      temp.tagsQuestionsProgress = action.payload.progress
      ;
      ;
      return {
        ...state,
        profile: temp
      }
    }
    case 'SET_SELECT_CONTACTS_PROGRESS_SUCCESS' : {
      var temp = {...state.profile}
      temp.selectContactsProgress = action.payload.progress
      return {
        ...state,
        profile: temp
      }
    }
    case 'SET_BUCKET_QUESTIONS_PROGRESS_SUCCESS' : {
      var temp = {...state.profile}
      temp.bucketQuestionsProgress = action.payload.progress
      return {
        ...state,
        profile: temp
      }
    }
    case 'SET_DONE_CONTACTS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneContacts: true,
        }
      }
    }
    case 'SET_DONE_CONTACTS_QUESTIONS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneContactsQuestions: true,
        }
      }
    }
    case 'SET_DONE_GROUP_CONTACTS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneGroupContacts: true,
        },
        progress: state.progress+1
      }
    }
    case 'SET_DONE_BUCKET_QUESTIONS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneBucketQuestions: true,
        },
        progress: state.progress+2
      }
    }
    case 'SET_DONE_SELECT_CONTACTS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneSelectContacts: true,
        },
        progress: state.progress+1
      }
    }
    case 'SET_DONE_SORT_CONTACTS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneSortContacts: true,
        },
        progress: state.progress+1
      }
    }
    case 'SET_DONE_TAGS_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneTagsQuestions: true,
        },
        progress: state.progress+1
      }
    }
    case 'SET_DONE_SOCIAL_SUCCESS' : {
      return {
        ...state,
        profile: {
          ...state.profile,
          doneSocial: true,
        }
      }
    }
  }
  return state
}

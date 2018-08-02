import axios from 'axios'
import { setLocalUser, setProfilePic } from './helpers'
axios.defaults.headers.post['Content-Type'] = 'application/json'
var config = {
  withCredentials:true
}
// places Id goes -> address + placesId + key
var placesKey = '&key=AIzaSyD-v360ct6TwFbj1PeCwF_UoGCPDunALAA'
var placesAddr = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='

import { api } from './api.config'
var base_url = 'http://' + api.address + ':' + api.port + '/api/telluswho/'
var contacts_url = 'http://' + api.address + ':' + api.port + '/api/contact'

export function loadSurveyData () {
  return function (dispatch) {
    return axios.get(base_url, config)
		.then((res) => {
      var user = res.data.user
      setLocalUser(user)
      dispatch({ type:'LOAD_SURVEY_DATA_SUCCESS', payload:res.data })
    }).catch((err) => {
      localStorage.clear()
      dispatch({ type:'LOAD_SURVEY_DATA_ERR', payload:err })
    })
  }
}

export function clearSurveyData () {
  return function (dispatch) {
      dispatch({ type:'CLEAR_DATA', payload:{ user: {}, profile: {} } })
      localStorage.clear()
  }
}
export function collectContact (contact) {
  return function (dispatch) {
    return dispatch({ type:'CONTACTS_UPLOAD_SUCCESS', payload:{contact: contact} })
  }
}
export function postSenseOfCommunity (obj) {
  return function (dispatch) {
    return axios.post(base_url + 'senseOfCommunity', obj, config)
		.then((response) => {
      return dispatch({ type:'SENSE_OF_COMM_SUCCESS', payload:response.data })
    })
    		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload:err })
    })
  }
}

export function postSociability (obj) {
  return function (dispatch) {
    return axios.post(base_url + 'sociability', obj, config)
		.then((response) => {
      
      return dispatch({ type:'SOCIABILITY_SUCCESS', payload:response.data })
    })
		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload:err })
    })
  }
}
export function postWellbeing (obj) {
  return function (dispatch) {
    return axios.post(base_url + 'wellbeing', obj, config)
		.then((response) => {
      
      return dispatch({ type:'WELLBEING_SUCCESS', payload:response.data })
    })
		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload:err })
    })
      }
}
export function postBackground (obj) {
  return function (dispatch) {
    return axios.post(base_url + 'backgroundInfo', obj, config)
		.then((response) => {
      
      return dispatch({ type:'BACKGROUND_SUCCESS', payload:response.data })
    })
		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload:err })
    })
  }
}
export function postSchoolWork (obj) {
  return function (dispatch) {
    return axios.post(base_url + 'schoolandwork', obj, config)
		.then((response) => {
      
      return dispatch({ type:'SCHOOLWORK_SUCCESS', payload:response.data })
    })
		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload:err })
    })
  }
}
export function postInterests (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'interests', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'INTERESTS_SUCCESS', payload: response.data })
    })
    		.catch((err) => {
      return dispatch({ type:'DATA_ERR', payload: err })
    })
  }
}

export function setPassionLevel (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/levelOfPassion', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'PASSION_SUCCESS', payload: response.data })
    })
		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setExpertiseLevel (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/levelOfExpertise', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'EXPERTISE_SUCCESS', payload: response.data })
    })
		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}


export function setWillingToTeach (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/willingToTeach', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'WILLING_TO_TEACH_SUCCESS', payload: response.data })
    })
		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setWillingToBeTaught (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/willingToBeTaught', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'WILLING_TO_BE_TAUGHT_SUCCESS', payload: response.data })
    })
    		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setDoingInGroup (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/doingInGroup', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'DOING_IN_GROUP_SUCCESS', payload: response.data })
    })
    		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}

export function setLookingForOthers (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/lookingForOthers', { interests: interests }, config)
		.then((response) => {
  return dispatch({ type: 'LOOKING_FOR_OTHERS_SUCCESS', payload: response.data })
})
		.catch((err) => {
  return dispatch({ type: 'DATA_ERR', payload: err })
})
  }
}

export function setMethodInGroup (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'levels/methodInGroup', { interests: interests }, config)
		.then((response) => {
  return dispatch({ type: 'METHOD_IN_GROUP_SUCCESS', payload: response.data })
})
		.catch((err) => {
  return dispatch({ type: 'DATA_ERR', payload: err })
})
  }
}
export function postProfile (data) {
  return function (dispatch) {
    return axios.post(base_url + 'profileReview', data, config)
		.then((response) => {
      if (response.profilePic) setProfilePic(res.data.profilePic)
      return dispatch({ type: 'PROFILE_REVIEW_SUCCESS', payload: response.data })
    })
    		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setPlaces (interests) {
  return function (dispatch) {
    return axios.post(base_url + 'places', { interests: interests }, config)
		.then((response) => {
      return dispatch({ type: 'PLACES_SUCCESS', payload: response.data })
    })
		.catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function loadContacts () {
  return function (dispatch) {
    return axios.get(contacts_url, config)
		.then((res) => {
      dispatch({ type:'LOAD_CONTACTS_DATA_SUCCESS', payload:res.data })
    })
    .catch((err) => {
      dispatch({ type:'LOAD_CONTACTS_DATA_ERR', payload:err })
    })
  }
}

export function uploadContact (contact) {
  return function (dispatch) {
    return axios.post(contacts_url + '/single', { contact: contact }, config)
		.then((response) => {
      return dispatch({ type: 'CONTACTS_UPLOAD_SUCCESS', payload: response.data })
    })
		.catch((err) => {
      return dispatch({ type: 'CONTACTS_UPLOAD_FAILED', payload: err })
    })
  }
}
export function updateContact (contact) {
  return function (dispatch) {
    return axios.post(base_url + 'updateContact', { contact: contact }, config)
    .then((response) => {
      return dispatch({ type: 'UPDATE_CONTACT_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function uploadTags (tags) {
  return function (dispatch) {
    return axios.post(base_url + 'uploadTags', { tags: tags }, config)
    .then((response) => {
      return dispatch({ type: 'UPLOAD_TAGS_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function uploadTag (tag) {
  return function (dispatch) {
    return axios.post(base_url + 'uploadTag', { tag: tag }, config)
    .then((response) => {
      return dispatch({ type: 'UPLOAD_TAGS_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function uploadGroups (groups) {
  return function (dispatch) {
    return axios.post(base_url + 'uploadGroups', { groups: groups }, config)
    .then((response) => {
      return dispatch({ type: 'UPLOAD_GROUPS_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setSelectContactsProgress (progress) {
  return function (dispatch) {
    return axios.post(base_url + 'setSelectContactsProgress', { progress: progress }, config)
    .then((response) => {
      return dispatch({ type: 'SET_SELECT_CONTACTS_PROGRESS_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setTagsQuestionsProgress (progress) {
  return function (dispatch) {
    return axios.post(base_url + 'setTagsQuestionsProgress', { progress: progress }, config)
    .then((response) => {
      return dispatch({ type: 'SET_TAGS_QUESTIONS_PROGRESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setBucketQuestionsProgress (progress) {
  return function (dispatch) {
    return axios.post(base_url + 'setBucketQuestionsProgress', { progress: progress }, config)
    .then((response) => {
      return dispatch({ type: 'SET_BUCKET_QUESTIONS_PROGRESS_SUCCESS', payload: response.data })
    })
    .catch((err) => {
      return dispatch({ type: 'DATA_ERR', payload: err })
    })
  }
}
export function setDoneBucketQuestions () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/bucketQuestions', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_BUCKET_QUESTIONS_SUCCESS', payload:res.data })
    })
  }
}
export function setDoneSortContacts () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/sortContacts', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_SORT_CONTACTS_SUCCESS', payload:res.data })
    })
  }
}
export function setDoneSelectContacts () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/selectContacts', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_SELECT_CONTACTS_SUCCESS', payload:res.data })
    })
  }
}
export function setDoneGroupContacts () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/groupContacts', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_GROUP_CONTACTS_SUCCESS', payload:res.data })
    })
  }
}
export function setDoneTagsQuestions () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/tagsQuestions', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_TAGS_SUCCESS', payload:res.data })
    })
  }
}
export function setDoneSocial () {
  return function (dispatch) {
    return axios.get(base_url + 'setDone/social', config)
    .then((res) => {
      dispatch({ type:'SET_DONE_TAGS_SUCCESS', payload:res.data })
    })
  }
}
export function updatedPhone (updatedPhone) {
  return function (dispatch) {
    return dispatch({ type: "UPDATED_PHONE", payload: updatedPhone})
  }
}
export function updatedEmail (updatedEmail) {
  return function (dispatch) {
    return dispatch({ type: "UPDATED_EMAIL", payload: updatedEmail})
  }
}
export function increaseProgress () {
  return function (dispatch) {
    
    dispatch({ type:'INCREASE_PROGRESS', payload:{} })
  }
}

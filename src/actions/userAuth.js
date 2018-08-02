import axios from 'axios'
import { setLocalUser, setProfilePic, updatePhoneValidation } from './helpers'

var config = {
  withCredentials:true
}
import { api } from './api.config'
var base_url = 'http://' + api.address + ':' + api.port + '/'

export function register (fname, lname, email, uname, pwd, ucid, phoneNumber) {
  return function (dispatch) {
    return axios.post(base_url + 'auth/signup/telluswho', {
      firstName:fname,
      lastName:lname,
      email:email,
      username:uname,
      password:pwd,
      ucid: ucid,
      phone: phoneNumber,
      profile: {}
    }, config)
		.then((res) => {
      setLocalUser(res.data.user)
      dispatch({ type:'USER_LOGIN_SUCCESS', payload:res.data })
    })
  	.catch((err) => {
      localStorage.clear()
      const error = Object.assign({}, err)
      dispatch({ type:'USER_SIGNUP_ERR', payload:error })
    })
  }
}
export function getUserImage (imageId) {
  return function (dispatch) {
    return axios.get(base_url + 'api/image/' + imageId, config)
				.then((res) => {
          setProfilePic(res.data.image)
          dispatch({ type:'USER_PROFILE_PIC_SUCCESS', payload:res.data.image })
          })
          .catch((err) => {
            //TODO THROW ERROR
      })
  }
}
export function login (uname, pwd) {
  return function (dispatch) {
    return axios.post(base_url + 'auth/login/telluswho', {
      username:uname,
      password:pwd
    }, config
		)
		.then((res) => {
  setLocalUser(res.data.user)
  dispatch({ type:'USER_LOGIN_SUCCESS', payload: res.data })
  dispatch({ type:'LOAD_SURVEY_DATA_SUCCESS', payload: res.data })
})
		.catch((err) => {
  localStorage.clear()
  const error = Object.assign({}, err)

  dispatch({ type:'USER_LOGIN_ERR', payload: error })
})
  }
}
export function verifyPhone (phoneNumber, validationCode) {
  return function (dispatch) {
    return axios.get(base_url + 'auth/phone/' + phoneNumber + '/' + validationCode, config)
		.then((res) => {
      if ((res.data.status == 200) || (res.data.status == 202)) {
        updatePhoneValidation()
        dispatch({ type: 'PHONE_VALIDATION_SUCCESS', payload: res.data })
      } else {
        dispatch({ type: 'PHONE_VALIDATION_FAILED', payload: res.data })
      }
    }).catch((err) => {
      dispatch({ type: 'PHONE_VALIDATION_FAILED', payload: {message: "Invalid token or error connecting" }})
    })
  }
}
export function validatePhone(phone) {
  return function(dispatch) {
    return dispatch({ type: 'VALIDATE_PHONE', payload: phone })
  }
}
export function validateEmail(email) {
  return function(dispatch) {
    return dispatch({ type: 'VALIDATE_EMAIL', payload: email })
  }
}
export function sendResetPasswordLink (email) {
  return function (dispatch) {
    return axios.get(base_url + 'auth/resetPassword/byEmail/' + email, config)
		.then((res) => {
  if ((res.data.status == 200) || (res.data.status == 202)) {
    dispatch({ type:'PASSWORD_RESET_SUCCESS', payload: res.data })
  } else {
    dispatch({ type:'PASSWORD_RESET_FAILED', payload: res.data })
  }
})
		.catch((err) => {
  dispatch({ type:'PASSWORD_RESET_FAILED', payload: err })
})
  }
}
export function setNewPassword (email, code, password) {
  return function (dispatch) {
    return axios.post(base_url + 'auth/setNewPassword/' + email + '/' + code, {
      password: password
    }, config)
		.then((res) => {
  if ((res.data.status == 200) || (res.data.status == 202)) {
    dispatch({ type: 'SET_PASSWORD_SUCCESS', payload: res.data })
  } else {
    dispatch({ type: 'SET_PASSWORD_FAILED', payload: res.data })
  }
})
		.catch((err) => {
  dispatch({ type: 'SET_PASSWORD_FAILED', payload: 'Link has expired.' })
})
  }
}
export function logout () {
  return function (dispatch) {
    return axios.post(base_url + 'auth/logout', {}, config)
  		.then((response) => {
          dispatch({ type:'USER_LOGOUT_SUCCESS', payload:response.data })
          localStorage.clear()
      })
      .catch((err) => {
        dispatch({ type:'USER_LOGOUT_SUCCESS', payload: {} })
      })
    }
}
export function setRedirectUrl (url) {
  return function (dispatch) {
    return dispatch({ type: 'SET_REDIRECT_URL', payload: url })
  }
}
export function setViewedTerms () {
  return function (dispatch) {
    return dispatch({ type: 'USER_VIEWED_TERMS' })
  }
}

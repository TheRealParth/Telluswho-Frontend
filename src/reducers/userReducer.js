export default function userReducer (state = {
  user:  JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : {},
  profilePic: localStorage.getItem('profilePic') ? JSON.parse(localStorage.getItem('profilePic')) : {},
  isLoggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
  isLoggedOut: JSON.parse(localStorage.getItem('user')) ? false : true,
  signup:false,
  action:null,
  isPhoneValidated: false,
  isEmailValidated: false,
  hasViewedTerms: localStorage.getItem('hasViewedTerms') ? localStorage.getItem('hasViewedTerms') : false,
  error:null
}, action) {
  switch (action.type) {
    case 'USER_SIGNUP_SUCCESS': {
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
        signup:true,
        error:null,
        action:'signup',
        user: action.payload.user
      }
    }
    case 'USER_PROFILE_PIC_SUCCESS' : {
      const imageType = action.payload.type
      const imageData = action.payload.imageData
      return {
        ...state,
        profilePic: {
          type: imageType,
          imageData: imageData
        }
      }
    }
    case 'SET_PASSWORD_SUCCESS' : {
      return {
        ...state,
        error: false
      }
    }
    case 'SET_PASSWORD_FAILED' : {
      const error = action.payload.response ? action.payload.response.data.message : false
      return {
        ...state,
        error: error ? error : 'Unknown Error'
      }
    }
    case 'PASSWORD_RESET_SUCCESS' : {
      return {
        ...state,
        error: false
      }
    }
    case 'PASSWORD_RESET_FAILED' : {
      const error = action.payload.response ? action.payload.response.data.message : ''
      return {
        ...state,
        error: error ? error : 'Unknown Error'
      }
    }
    case 'SET_USER_FROM_LOAD_SURVEY': {
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        isLoggedOut: false
      }
    }
    case 'LOAD_SURVEY_DATA_SUCCESS': {
      return {
        ...state,
        isLoggedIn:true,
        isLoggedOut: false,
        error:null,
        action:'login',
        user: action.payload.user
      }
      break
    }
    case 'USER_SIGNUP_ERR': {
      const error = action.payload.response ? action.payload.response.data.message : ''
      return {
        ...state,
        signup:false,
        isLoggedIn: false,
        isLoggedOut: true,
        action:null,
        error: error ? error : 'Unknown Error'
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
      break
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
      break
    }
    case 'PHONE_VALIDATION_SUCCESS': {
      var obj = action.payload.phone
      return {
        ...state,
        isPhoneValidated: true
      }
    }
    case 'PHONE_VALIDATION_FAILED': {

      return Object.assign({}, state, {
        user:{
          ...state.user,
          user:{
            ...state.user.user,
            isPhoneValidated: false
          }
        },
        error: action.payload.message
      })
    }
    case 'USER_LOGIN_SUCCESS': {
      return {
        ...state,
        isLoggedIn:true,
        isLoggedOut: false,
        error:null,
        action:'login',
        user: action.payload.user
      }
    }

    case 'USER_LOGIN_ERR': {
      const error = action.payload.response ? action.payload.response.data.message : ''
      return {
        ...state,
        isLoggedIn:false,
        isLoggedOut: true,
        action:null,
        error: error ? error : false
      }
    }
    case 'SET_REDIRECT_URL': {
      return {
        ...state,
        redirectURL: action.payload
      }
    }
    case 'USER_LOGOUT_SUCCESS': {
      return {
        ...state,
        isLoggedIn: false,
        isLoggedOut: true,
        action:'logout',
        user: {},
        error:null
      }
    }
    case 'USER_VIEWED_TERMS': {
      return {
        ...state,
        hasViewedTerms: true
      }
    }
    case 'USER_LOGOUT_ERR': {
      return {
        ...state,
        isLoggedIn: true,
        isLoggedOut: false,
        action:null,
        error:action.payload
      }
    }

  }
  return state
}

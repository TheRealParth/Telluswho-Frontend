export function setLocalUser (user) {
  localStorage.setItem('userId', user.id)
  localStorage.setItem('user', JSON.stringify(user))

  var isPhoneValid = false
  var isEmailValid = false

  user.phones.forEach((phone) => {
    if (phone.isValidated) isPhoneValid = true
  })

  user.emails.forEach((email) => {
    if (email.isValidated && (email.id.indexOf('njit.edu') > 0)) isEmailValid = true
  })

  localStorage.setItem('isPhoneValid', isPhoneValid)
  localStorage.setItem('isEmailValid', isEmailValid)
  localStorage.setItem('hasViewedTerms', false)
  return
}
export function getLocalUser () {
  return JSON.parse(localStorage.getItem('user'))
}
export function updatePhoneValidation () {
  localStorage.setItem('isPhoneValid', true)
  return
}
export function setProfilePic (pic) {
  localStorage.setItem('profilePic', JSON.stringify(pic))
  return
}

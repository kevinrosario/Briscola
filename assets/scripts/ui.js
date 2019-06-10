const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')

const setSignIn = () => {
  const showSignIn = signInTemplate()
  $('.container').html(showSignIn)
}

const removeSignIn = () => {
  $('.row').remove()
}

const setSignUpModal = () => {
  const showSignUp = signUpTemplate()
  $('.container').append(showSignUp)
}

const removeSignUpModal = () => {
  $('.modal').remove()
  $('.fade').remove()
}

const addSuccess = (target) => {
  $(target).addClass('is-valid')
}

const removeSuccess = (target) => {
  if ($(target).hasClass('is-valid')) {
    $(target).removeClass('is-valid')
  }
}

const addInvalid = (target) => {
  $(target).addClass('is-invalid')
}

const removeInvalid = (target) => {
  if ($(target).hasClass('is-invalid')) {
    $(target).removeClass('is-invalid')
  }
}

module.exports = {
  setSignIn,
  removeSignIn,
  setSignUpModal,
  removeSignUpModal,
  addSuccess,
  removeSuccess,
  addInvalid,
  removeInvalid
}

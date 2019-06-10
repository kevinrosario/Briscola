const getFormFields = require('./../../lib/get-form-fields')
const ui = require('./ui.js')
const api = require('./api.js')
const config = require('./config.js')
const store = require('./store.js')

const setSignIn = () => {
  ui.setSignIn()
}

const onSignIn = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData, config.apiUrl)
    .then((response) => {
      store.user = response.user
      ui.removeSignIn()
    })
    .catch(() => {
      ui.addInvalid($('.login-form'))
    })
}

const onSignUp = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData, config.apiUrl)
    .then((response) => {
      ui.removeSignUpModal()
      onSignIn(event)
    }).catch(() => {
      ui.addInvalid($('.sign-up-form'))
    })
}

const onShowSignUpModal = (event) => {
  ui.setSignUpModal()
}
const onRemoveSignUpModal = () => {
  ui.removeSignUpModal()
}

module.exports = {
  setSignIn,
  onSignIn,
  onSignUp,
  onShowSignUpModal,
  onRemoveSignUpModal
}

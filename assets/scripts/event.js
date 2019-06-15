'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const ui = require('./ui.js')
const api = require('./api.js')
const config = require('./config.js')
const store = require('./store.js')

const onSetSignIn = () => {
  ui.removeSignFailure()
  ui.setSignIn()
}

const onSetBoard = () => {
  ui.setBoard()
}

const onSignIn = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signIn(formData, config.apiUrl)
    .then((response) => {
      store.user = response.user
      ui.removeFromContainer()
      ui.setSignOut()
      ui.setBoard()
    })
    .catch(() => {
      ui.addInvalid($('.login-form'))
      ui.clearForms()
      ui.setSignFailure()
    })
}

const onSignUp = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.signUp(formData, config.apiUrl)
    .then((response) => {
      ui.removeModal()
      onSignIn(event)
    }).catch(() => {
      ui.addInvalid($('.sign-up-form'))
      ui.clearForms()
      ui.setSignFailure()
    })
}

const onSignOut = (event) => {
  api.signOut(config.apiUrl, store.user.token)
    .then((response) => {
      ui.removeFromContainer()
      ui.removeSignOut()
      ui.removeInvalid()
      ui.removeSignFailure()
      ui.removeGameFinishedAlert()
      onSetSignIn()
      store.game = {}
    }).catch((error) => {
      console.log(error)
    })
}

const onCardSelected = (event) => {
  const index = addCardToCurrentCards(event)
  ui.moveCard(index)
  api.update(store.game, config.apiUrl, store.game.id, store.user.token)
    .then((response) => {
      store.game = response.game
      setTimeout(() => {
        addPlayerSelection()
      }, 200)
      setTimeout(() => {
        ui.setGame(store.game)
      }, 600)
    })
    .catch((error) => {
      console.log(error)
    })
}

const addPlayerSelection = () => {
  if (store.game.player_two_last_selection[0]) {
    ui.addPlayerTwoSelection(store.game.player_two_last_selection[0])
  }
}

const addCardToCurrentCards = (event) => {
  const index = $(event.target).data('id')
  const card = store.game.player_one_hand.splice(index, 1)
  store.game.current_cards.push(card[0])
  return index
}

const onNewGame = (event) => {
  api.create(config.apiUrl, store.user.token)
    .then((response) => {
      store.game = response.game
      ui.setGame(store.game)
      ui.removeGameFinishedAlert()
    })
    .catch((error) => {
      console.log(error)
    })
}

const onShowIndexModal = (event) => {
  api.getGames(config.apiUrl, store.user.token)
    .then((response) => {
      ui.setIndexModal(response)
      if (store.game.id) {
        ui.setGameLoaded(store.game.id) // sets current game as loaded
      }
      $('#index-games').modal('toggle')
    })
    .catch((error) => {
      console.log(error)
    })
}

const onDeleteGame = (event) => {
  const id = $(event.target).data('button')
  api.destroy(id, config.apiUrl, store.user.token)
    .then((response) => {
      ui.removeGameFromModal(id)
      console.log(store.game)
      if (store.game.id !== undefined && id === store.game.id) { // remove current game
        store.game = {}
        ui.setGame(store.game)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const onLoadGame = (event) => {
  const id = $(event.target).data('load')
  api.getGame(id, config.apiUrl, store.user.token)
    .then((response) => {
      if (store.game.id) {
        ui.removeGameLoaded(store.game.id)
      }
      store.game = response.game
      addPlayerSelection()
      ui.setGame(store.game)
      ui.setGameLoaded(store.game.id)
      ui.removeGameFinishedAlert()
    })
    .catch((error) => {
      console.log(error)
    })
}

const onShowSignUpModal = (event) => {
  ui.setSignUpModal()
}

const onShowSettingModal = (event) => {
  ui.setSettingModal()
}

const onChangePassword = (event) => {
  event.preventDefault()
  const formData = getFormFields(event.target)
  api.changePassword(formData, config.apiUrl, store.user.token)
    .then((response) => {
      ui.addValid($('.setting-form'))
    })
    .catch((error) => {
      console.log(error)
      ui.addInvalid($('.setting-form'))
      ui.clearForms()
    })
}

const onRemoveModal = () => {
  ui.removeModal()
}

module.exports = {
  onCardSelected,
  onChangePassword,
  onDeleteGame,
  onLoadGame,
  onNewGame,
  onSetSignIn,
  onSetBoard,
  onSignIn,
  onSignUp,
  onSignOut,
  onShowIndexModal,
  onShowSignUpModal,
  onShowSettingModal,
  onRemoveModal
}

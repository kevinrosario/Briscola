'use strict'

const getFormFields = require('./../../lib/get-form-fields')
const ui = require('./ui.js')
const api = require('./api.js')
const config = require('./config.js')
const store = require('./store.js')

const onSetSignIn = () => {
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
      console.log(store)
      ui.removeFromContainer()
      ui.setSignOut()
      onSetBoard()
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

const onSignOut = (event) => {
  api.signOut(config.apiUrl, store.user.token)
    .then((response) => {
      ui.removeFromContainer()
      ui.removeSignOut()
      onSetSignIn()
      store.game = {}
    }).catch((error) => {
      console.log(error)
    })
}

const onCardSelected = (event) => {
  const index = addCardToCurrent(event)
  ui.moveCard(index)

  setTimeout(() => {
    api.update(store.game, config.apiUrl, store.game.id, store.user.token)
      .then((response) => {
        store.game = response.game
        ui.setGame(store.game)
        addListenerToAll() // add listener if it have a card
      })
      .catch((error) => {
        console.log(error)
      })
  }, 500)
}

const addCardToCurrent = (event) => {
  const index = $(event.target).data('id')
  const card = store.game.player_one_hand.splice(index, 1)
  store.game.current_cards.push(card[0])
  $(event.target).removeClass('can-play') // Remove class to stop listener.
  return index
}

const onNewGame = (event) => {
  api.create(config.apiUrl, store.user.token)
    .then((response) => {
      store.game = response.game
      ui.setGame(store.game)
      addListenerToAll()
    })
    .catch((error) => {
      console.log(error)
    })
}

const onShowIndexModal = (event) => {
  api.getGames(config.apiUrl, store.user.token)
    .then((response) => {
      ui.setIndexModal(response)
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
      if (id === store.game.id) { // remove current game
        console.log('deleted')
        store.game = {}
        ui.setGame(store.game)
        removeListenerToAll()
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

const onLoadGame = (event) => {
  const id = $(event.target).data('button')
  api.getGame(id, config.apiUrl, store.user.token)
    .then((response) => {
      store.game = response.game
      ui.setGame(store.game)
    })
    .catch()
}

const addListenerToAll = () => {
  $('.user-card').addClass('can-play')
}

const removeListenerToAll = () => {
  $('.user-card').removeClass('can-play')
}

// const addEventListener = (event, response) => {
//   if (response.game.player_one_hand.length === 3) {
//     $(event.target).addClass('can-play')
//   }
// }

const onShowSignUpModal = (event) => {
  ui.setSignUpModal()
}

const onRemoveSignUpModal = () => {
  ui.removeModal()
}

const onRemoveIndexModal = () => {
  ui.removeModal()
}

module.exports = {
  onSetSignIn,
  onSetBoard,
  onSignIn,
  onSignUp,
  onSignOut,
  onNewGame,
  onDeleteGame,
  onLoadGame,
  onShowIndexModal,
  onCardSelected,
  onShowSignUpModal,
  onRemoveSignUpModal,
  onRemoveIndexModal
}

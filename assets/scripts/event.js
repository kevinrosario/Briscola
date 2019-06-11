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
      ui.removeFromContainer()
      ui.setSignOut()
      onSetBoard()
      loadGame()
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
  event.preventDefault()
  api.signOut(config.apiUrl, store.user.token)
    .then((response) => {
      ui.removeFromContainer()
      ui.removeSignOut()
      onSetSignIn()
    }).catch((error) => {
      console.log(error)
    })
}

const loadGame = () => {
  api.getGame(1, config.apiUrl, store.user.token)
    .then((response) => {
      store.game = response.game
      ui.setGame(store.game.player_one_hand, store.game.briscola,
        store.game.current_cards, store.game.deck.length)
    })
    .catch()
}

const onCardSelected = (event) => {
  $(event.target).removeClass('user-card') // Remove class to stop listener.
  const index = $(event.target).data('id')
  const card = store.game.player_one_hand.splice(index, 1)
  store.game.current_cards.push(card[0])
  ui.moveCard(index)

  const game = {game:
    {
      player_one_hand: store.game.player_one_hand,
      current_cards: store.game.current_cards
    }
  }
  setTimeout(() => {
    api.update(game, config.apiUrl, 1, store.user.token)
      .then((response) => {
        addEventListener(event, response)
        store.game = response.game
        ui.setGame(store.game.player_one_hand, store.game.briscola,
          store.game.current_cards, store.game.deck.length)
      })
      .catch((error) => {
        console.log(error)
      })
  }, 500)
}

const onNewGame = (event) => {
  event.preventDefault()
  api.create(config.apiUrl, store.user.token)
    .then((response) => {
      console.log(response)
      store.game = response.game
      ui.setGame(store.game.player_one_hand, store.game.briscola,
        store.game.current_cards, store.game.deck.length)
    })
    .catch((error) => {
      console.log(error)
    })
}

const addEventListener = (event, response) => {
  if (response.game.player_one_hand.length === 3) {
    $(event.target).addClass('user-card')
  }
}

const onShowSignUpModal = (event) => {
  ui.setSignUpModal()
}
const onRemoveSignUpModal = () => {
  ui.removeSignUpModal()
}

module.exports = {
  onSetSignIn,
  onSetBoard,
  onSignIn,
  onSignUp,
  onSignOut,
  onNewGame,
  onCardSelected,
  onShowSignUpModal,
  onRemoveSignUpModal
}

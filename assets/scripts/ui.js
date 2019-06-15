'use strict'

const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')
const boardTemplate = require('./templates/board.handlebars')
const signOutTemplate = require('./templates/nav-bar.handlebars')
const indexGamesTemplate = require('./templates/index-games.handlebars')
const settingsTemplate = require('./templates/settings.handlebars')
const gameFinishedTemplate = require('./templates/game-finished.handlebars')
const score = require('./templates/helpers/score.js')

const setSignIn = () => {
  const showSignIn = signInTemplate()
  $('.container').html(showSignIn)
}

const setBoard = () => {
  const showBoard = boardTemplate()
  $('.container').html(showBoard)
}

const setSignOut = () => {
  const signOut = signOutTemplate()
  $('.navbar-nav').append(signOut)
}

const setSignUpModal = () => {
  const showSignUp = signUpTemplate()
  $('.container').append(showSignUp)
}

const setSettingModal = () => {
  const showSetting = settingsTemplate()
  $('.navbar-nav').append(showSetting)
}

const setIndexModal = (games) => {
  const showIndexModal = indexGamesTemplate(games)
  $('.navbar-nav').append(showIndexModal)
}

const addValid = (target) => {
  $(target).addClass('is-valid')
}

const addInvalid = (target) => {
  $(target).addClass('is-invalid')
}

const removeFromContainer = () => {
  $('.row').remove()
}

const removeSignOut = () => {
  $('.log').remove()
}

const removeModal = () => {
  $('.modal').remove()
  $('.fade').remove()
}

const removeGameFromModal = (id) => {
  $(`[data-game=${id}]`).text(`Game #${id} Deleted!`)
}

const setGameLoaded = (id) => {
  $(`[data-load=${id}]`).text('Game Loaded!')
}

const removeGameLoaded = (id) => {
  $(`[data-load=${id}]`).text('Load Game')
}

const removeSuccess = (target) => {
  if ($(target).hasClass('is-valid')) {
    $(target).removeClass('is-valid')
  }
}

const removeInvalid = (target) => {
  if ($(target).hasClass('is-invalid')) {
    $(target).removeClass('is-invalid')
  }
}

const setGame = (game) => {
  $('.cards').empty().removeClass('card-representation').removeClass('user-card') // removes listerner and representation
  if (!game.over) {
    $('.game-text').empty()
    $('#current-computer-selection').empty().removeClass('card-representation')
    $('#current-user-selection').empty().removeClass('card-representation')
    $('#deck').text(`Cards Left: ${game.deck.length}\n`)
    $('#briscola').text(`Briscola\nSuit: ${game.briscola.suit}\nRank: ${game.briscola.rank}\n`)
    game.player_one_hand.forEach((card, index) => {
      console.log(`Drawing ${card.suit}, ${card.rank} with Index: ${index}`)
      $(`[data-id=${index}]`).text(`Suit: ${card.suit}\nRank: ${card.rank}\n`)
      $(`[data-id=${index}]`).addClass('user-card').addClass('card-representation')
    })
    if (game.current_cards.length !== 0) {
      $('#current-computer-selection').append(`CPU\nSuit: ${game.current_cards[0].suit}\nRank: ${game.current_cards[0].rank}\n`).addClass('card-representation')
    }
  } else {
    setGameFinishedAlert(game.player_one_earned)
  }
}

const setGameFinishedAlert = (playerEarnedCards) => {
  const finalScore = score(playerEarnedCards)
  let text = ``
  let alertType = ``
  if (finalScore > 60) {
    text += `You win with ${finalScore} points!`
    alertType += 'alert alert-success'
  } else if (finalScore === 60) {
    text += `The game is a draw!`
    alertType += 'alert alert-warning'
  } else {
    text += `You lose with ${finalScore} points!`
    alertType += 'alert alert-danger'
  }
  const showGameWin = gameFinishedTemplate()
  $('main').append(showGameWin)
  $('.game-end').addClass('alert').addClass(alertType).attr('role', 'alert').text(text)
}

const removeGameFinishedAlert = () => {
  $('.alert').remove()
}

const moveCard = (id) => {
  const text = $(`[data-id=${id}]`).text()
  $(`[data-id=${id}]`).empty().removeClass('card-representation')
  $('#current-user-selection').append(`User\n${text}\n`).addClass('card-representation')
}

const addPlayerTwoSelection = (card) => {
  $('#current-computer-selection').append(`CPU\nSuit: ${card.suit}\nRank: ${card.rank}`)
    .addClass('card-representation')
}

const clearForms = () => {
  $('.form').trigger('reset')
}

const setSignFailure = () => {
  $('.sign-failure').text('Wrong email or password!')
}

const removeSignFailure = () => {
  $('.sign-failure').empty()
}

module.exports = {
  addValid,
  addPlayerTwoSelection,
  addInvalid,
  setSignIn,
  setBoard,
  setSignOut,
  setSignUpModal,
  setIndexModal,
  setSettingModal,
  setGame,
  setSignFailure,
  setGameLoaded,
  moveCard,
  removeSuccess,
  removeInvalid,
  removeFromContainer,
  removeSignOut,
  removeModal,
  removeSignFailure,
  removeGameFromModal,
  removeGameLoaded,
  removeGameFinishedAlert,
  clearForms
}

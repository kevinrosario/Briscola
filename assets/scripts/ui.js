'use strict'

const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')
const boardTemplate = require('./templates/board.handlebars')
const signOutTemplate = require('./templates/nav-bar.handlebars')
const indexGamesTemplate = require('./templates/index-games.handlebars')
const settingsTemplate = require('./templates/settings.handlebars')
const gameFinishedTemplate = require('./templates/game-finished.handlebars')
const rulesTemplate = require('./templates/rules.handlebars')
const userFeedbackTemplate = require('./templates/user-feedback.handlebars')
const score = require('./templates/helpers/score.js')

const setSignIn = () => {
  const showSignIn = signInTemplate()
  $('.container').html(showSignIn)
}

const setBoard = () => {
  const showBoard = boardTemplate()
  const userFeedBack = userFeedbackTemplate()
  $('.container').html(showBoard)
  $('main').append(userFeedBack)
  setBeginningFeedback()
}

const removeUserFeedback = () => {
  $('.user-feedback').remove()
}

const setSignUpModal = () => {
  const showSignUp = signUpTemplate()
  $('.container').append(showSignUp)
}

const setSignOut = () => {
  const signOut = signOutTemplate()
  $('.navbar-nav').append(signOut)
}

const setRulesModal = () => {
  const showRules = rulesTemplate()
  $('.navbar-nav').append(showRules)
}

const setSettingModal = () => {
  const showSetting = settingsTemplate()
  $('.navbar-nav').append(showSetting)
}

const setIndexModal = (games) => {
  const showIndex = indexGamesTemplate(games)
  $('.navbar-nav').append(showIndex)
}

const removeModal = () => {
  $('.modal').remove()
  $('.fade').remove()
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

const removeGameFromModal = (id) => {
  $(`[data-game=${id}]`).text(`Game #${id} Deleted!`)
}

const setGameLoaded = (id) => {
  $(`[data-load=${id}]`).text('Game Loaded!')
}

const removeGameLoaded = (id) => {
  $(`[data-load=${id}]`).text('Load Game')
}

const removeValidOrInvalid = (target) => {
  $(target).removeClass('is-invalid').removeClass('is-valid')
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
      $(`[data-id=${index}]`).text(`Suit: ${card.suit}\nRank: ${card.rank}\n`)
      $(`[data-id=${index}]`).addClass('user-card').addClass('card-representation')
    })
    if (game.current_cards.length !== 0) {
      computerWinLastRoundFeedback()
      $('#current-computer-selection').append(`CPU\nSuit: ${game.current_cards[0].suit}\nRank: ${game.current_cards[0].rank}\n`).addClass('card-representation')
    } else {
      playerWonLastRoundFeedback()
    }
  } else {
    setBeginningFeedback()
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
  $('.game-end').remove()
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

const setSignInFailure = () => {
  $('.sign-in-failure').text('Wrong email or password!')
}

const setSignUpFailure = () => {
  $('.sign-up-failure').text('Wrong email or password!')
}

const removeSignInFailure = () => {
  $('.sign-in-failure').empty()
}

const removeSignUpFailure = () => {
  $('.sign-up-failure').empty()
}

const setChangePasswordFailure = () => {
  $('.change-password-failure').text('Unable to change password').addClass('failure')
}

const setChangePasswordSuccess = () => {
  $('.change-password-failure').text('Password changed successfully!').addClass('success')
}

const removeChangePasswordText = () => {
  $('.change-password-failure').empty().removeClass('failure').removeClass('success')
}

const setBeginningFeedback = () => {
  $('.user-feedback').removeClass('alert-danger alert-info alert-success alert-light')
  $('.user-feedback').text("Click on 'New Game' to begin").addClass('alert-light')
}

const waitingForComputerFeedBack = () => {
  $('.user-feedback').removeClass('alert-danger alert-info alert-success alert-light')
  $('.user-feedback').text('Waiting for computer...').addClass('alert-info')
}

const playerTurnFeedback = () => {
  $('.user-feedback').removeClass('alert-danger alert-info alert-success alert-light')
  $('.user-feedback').text('Choose one card').addClass('alert-light')
}

const computerWinLastRoundFeedback = () => {
  $('.user-feedback').removeClass('alert-danger alert-info alert-success alert-light')
  $('.user-feedback').text('Computer won last round\n Choose one card').addClass('alert-danger')
}

const playerWonLastRoundFeedback = () => {
  $('.user-feedback').removeClass('alert-danger alert-info alert-success alert-light')
  $('.user-feedback').text('You won last round\n Choose one card').addClass('alert-success')
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
  setRulesModal,
  setGame,
  setSignInFailure,
  setSignUpFailure,
  setGameLoaded,
  setChangePasswordSuccess,
  setChangePasswordFailure,
  moveCard,
  removeValidOrInvalid,
  removeFromContainer,
  removeSignOut,
  removeModal,
  removeSignUpFailure,
  removeSignInFailure,
  removeGameFromModal,
  removeGameLoaded,
  removeGameFinishedAlert,
  removeChangePasswordText,
  removeUserFeedback,
  clearForms,
  playerTurnFeedback,
  waitingForComputerFeedBack
  // computerWinLastRoundFeedback,
  // playerWonLastRoundFeedback
}

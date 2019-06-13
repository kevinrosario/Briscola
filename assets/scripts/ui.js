'use strict'

const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')
const boardTemplate = require('./templates/board.handlebars')
const signOutTemplate = require('./templates/nav-bar.handlebars')
const indexGamesTemplate = require('./templates/index-games.handlebars')
const settingsTemplate = require('./templates/settings.handlebars')

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
  $(`[data-game=${id}]`).remove()
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
  if (game.deck) {
    $('.game-text').empty()
    $('#current-computer-selection').empty().removeClass('card-representation')
    $('#current-user-selection').empty().removeClass('card-representation')
    $('#deck').text(`Cards Left: ${game.deck.length}\n`)
    $('#deck').append(`Score: ${calculateScore(game.player_one_earned)}\n`)
    $('#briscola').text(`Briscola\nSuit: ${game.briscola.suit}\nRank: ${game.briscola.rank}\n`)
    game.player_one_hand.forEach((card, index) => {
      $(`[data-id=${index}]`).text(`Suit: ${card.suit}\nRank: ${card.rank}\n`)
      $(`[data-id=${index}]`).addClass('user-card').addClass('card-representation')
    })
    if (game.current_cards.length !== 0) {
      $('#current-computer-selection').append(`CPU\nSuit: ${game.current_cards[0].suit}\nRank: ${game.current_cards[0].rank}\n`).addClass('card-representation')
    }
  } else {
    $('.game-text').empty()
  }
}

const moveCard = (id) => {
  const text = $(`[data-id=${id}]`).text()
  $(`[data-id=${id}]`).empty().removeClass('card-representation')
  $(`.cards`).removeClass('user-card') // remove listener
  $('#current-user-selection').append(`User\n${text}\n`).addClass('card-representation')
}

const addPlayerTwoSelection = (card) => {
  $('#current-computer-selection').append(`CPU\nSuit: ${card.suit}\nRank: ${card.rank}`)
    .addClass('card-representation')
}

const calculateScore = (playerEarned) => {
  let score = 0
  playerEarned.forEach((card) => {
    score += card.point_value
  })
  return score
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
  moveCard,
  removeSuccess,
  removeInvalid,
  removeFromContainer,
  removeSignOut,
  removeModal,
  removeGameFromModal
}

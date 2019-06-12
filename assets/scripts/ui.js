'use strict'

const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')
const boardTemplate = require('./templates/board.handlebars')
const signOutTemplate = require('./templates/nav-bar.handlebars')
const indexGamesTemplate = require('./templates/index-games.handlebars')

const setSignIn = () => {
  const showSignIn = signInTemplate()
  $('.container').html(showSignIn)
}

const removeFromContainer = () => {
  $('.row').remove()
}

const setBoard = () => {
  const showBoard = boardTemplate()
  $('.container').html(showBoard)
}

const setSignOut = () => {
  const signOut = signOutTemplate()
  $('.navbar-nav').append(signOut)
}

const removeSignOut = () => {
  $('.log').remove()
}

const setSignUpModal = () => {
  const showSignUp = signUpTemplate()
  $('.container').append(showSignUp)
}

const removeModal = () => {
  $('.modal').remove()
  $('.fade').remove()
}

const removeGameFromModal = (id) => {
  $(`[data-game=${id}]`).remove()
}

const setIndexModal = (games) => {
  const showIndexModal = indexGamesTemplate(games)
  $('.navbar-nav').append(showIndexModal)
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

const setGame = (game) => {
  if (game.deck) {
    $('#current-selection').empty()
    $('#deck').text(`Cards Left: ${game.deck.length}`)
    $('#briscola').text(`Briscola\nSuit: ${game.briscola.suit}\nRank: ${game.briscola.rank}\n`)
    game.player_one_hand.forEach((card, index) => {
      $(`[data-id=${index}]`).text(`Suit: ${card.suit}\nRank: ${card.rank}\n`)
    })
    if (game.current_cards.length !== 0) {
      $('#current-selection').append(`Suit: ${game.current_cards[0].suit}
                                      Rank:${game.current_cards[0].rank}`)
    }
  } else {
    $('.game-text').empty()
  }
}

const moveCard = (id) => {
  const text = $(`[data-id=${id}]`).text()
  $(`[data-id=${id}]`).empty()
  $('#current-selection').append(text)
}

module.exports = {
  setSignIn,
  setBoard,
  setSignOut,
  setSignUpModal,
  setIndexModal,
  setGame,
  removeFromContainer,
  removeSignOut,
  removeModal,
  addSuccess,
  addInvalid,
  removeSuccess,
  removeInvalid,
  moveCard,
  removeGameFromModal
}

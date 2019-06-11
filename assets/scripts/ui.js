const signInTemplate = require('./templates/sign-in.handlebars')
const signUpTemplate = require('./templates/sign-up.handlebars')
const boardTemplate = require('./templates/board.handlebars')
const signOutTemplate = require('./templates/nav-bar.handlebars')

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

const setGame = (hand, briscola, computerSelection, remainingCards) => {
  $('#current-selection').empty()
  $('#deck').text(`Cards Left: ${remainingCards}`)
  $('#briscola').text(`Briscola\nSuit: ${briscola.suit}\nRank: ${briscola.rank}\n`)
  hand.forEach((card, index) => {
    $(`[data-id=${index}]`).text(`Suit: ${card.suit}\nRank: ${card.rank}\n`)
  })
  if (computerSelection.length !== 0) {
    $('#current-selection').append(`Suit: ${computerSelection[0].suit} Rank:${computerSelection[0].rank}`)
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
  setGame,
  removeFromContainer,
  removeSignOut,
  removeSignUpModal,
  addSuccess,
  addInvalid,
  removeSuccess,
  removeInvalid,
  moveCard
}

'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const eventHandler = require('./event.js')

$(() => {
  eventHandler.onSetSignIn()
  $('.container').on('submit', '#sign-in', eventHandler.onSignIn)
  $('.container').on('submit', '#sign-up', eventHandler.onSignUp)
  $('.container').on('click', '#display-sign-up-modal', eventHandler.onShowSignUpModal)
  $('.container').on('hide.bs.modal', '#sign-up-modal', eventHandler.onRemoveModal)
  $('.navbar-nav').on('click', '#sign-out', eventHandler.onSignOut)

  $('.navbar-nav').on('click', '#index-games-button', eventHandler.onShowIndexModal)
  $('.navbar-nav').on('hide.bs.modal', '#index-games', eventHandler.onRemoveModal)

  $('.navbar-nav').on('click', '.btn-info', eventHandler.onLoadGame)
  $('.navbar-nav').on('click', '.btn-danger', eventHandler.onDeleteGame)
  $('.navbar-nav').on('click', '#new-game', eventHandler.onNewGame)
  $('.container').on('click', '.can-play', eventHandler.onCardSelected)

  $('.navbar-nav').on('click', '#settings', eventHandler.onShowSettingModal)
  $('.navbar-nav').on('submit', '#change-password', eventHandler.onChangePassword)
  $('.navbar-nav').on('hide.bs.modal', '#setting-modal', eventHandler.onRemoveModal)
})

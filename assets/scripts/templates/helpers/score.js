'use strict'

const score = (playerEarned) => {
  let score = 0
  playerEarned.forEach((card) => {
    score += card.point_value
  })
  return score
}

module.exports = score

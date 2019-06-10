
const signIn = (data, url) => {
  return $.ajax({
    url: url + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signUp = (data, url) => {
  return $.ajax({
    url: url + '/sign-up',
    method: 'POST',
    data: data
  })
}

const logOut = (url, token) => {
  return $.ajax({
    url: url + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const changePassword = (data, url, token) => {
  return $.ajax({
    url: url + '/change-password',
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const getGame = (id, url, token) => {
  return $.ajax({
    url: url + '/games/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const getGames = (url, token) => {
  return $.ajax({
    url: url + '/games',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const create = (url, token) => {
  return $.ajax({
    url: url + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

const update = (data, url, id, token) => {
  return $.ajax({
    url: url + '/games/' + id,
    method: 'PATCH',
    data: data,
    headers: {
      Authorization: 'Token token=' + token
    }
  })
}

// const getFinishedGames = () => {
//   return $.ajax({
//     url: url + '/games?over=true',
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + store.user.token
//     }
//   })
// }

module.exports = {
  signIn,
  signUp,
  logOut,
  changePassword,
  create,
  update,
  getGames,
  getGame
}

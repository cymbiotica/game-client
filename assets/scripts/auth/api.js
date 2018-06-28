const config = require('../config')
const store = require('../store')

/**
 * Request to the authentication api to register an user.
 *
 * @param data Information of the user.
 */
const signUp = function (data) {

  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data)
  });

}
/**
 * Request to the authentication api to log in an user.
 *
 * @param data Information of the user.
 */
const signIn = function (data) {

  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data)
  });

}
/**
 * Request to the authentication api to change password of an user.
 *
 * @param data Information of the user.
 */
const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

/**
 * Request to the authentication api to sign out an user.
 *
 * @param data Information of the user.
 */
const signOut = function (data) {
  //console.log(store.user.token);
  return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  signUp,
  signIn,
  signOut,
  changePassword
}

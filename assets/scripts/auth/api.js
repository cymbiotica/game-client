const config = require('../config')
const store = require('../store')

/* Register an user in the system */
const signUp = function (data) {

  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data)
  });

}
/* Log in an user in the system */
const signIn = function (data) {

  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify(data)
  });

}
const changePassword = function (data) {
  return $.ajax({
    url: config.apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
    // data: data
  })
}

/* Sign out an user in the system */
const signOut = function (data) {
  console.log(store.user.token);
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

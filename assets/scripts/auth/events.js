const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');

// call the api
const onSignUp = function (event) {
  event.preventDefault()
  console.log('sign up ran!')

  const data = getFormFields(this)
  //alert(data.credentials.email)

  api.signUp(data)
    .then(alert('success'))
    .catch(alert('error'))
}

// manage the event
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  // $('#sign-in').on('submit', onSignIn);
  // $('#change-password').on('submit', onChangePassword);
  // $('#sign-out').on('submit', onSignOut);
}

module.exports = {
  addHandlers
}

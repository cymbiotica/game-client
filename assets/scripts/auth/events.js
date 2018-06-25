const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const store = require('../store')

// call the api
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this)

  api.signUp(data)
    .then(() => {
      clearFields();
      showModalMessage('UserRegistrated');
      console.log('sign up ran!');
    })
    .catch((error) => {
      showModalMessage('error', error);
    });

}
/* Log in */
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  api.signIn(data)
    .then((result) => {

      $('#logged-user,#div-content').fadeIn();
      $('#div-content-account').hide();
      $('#user-email').text(result.user.email);
      store.user = result.user;
      console.log('sign In ran!');

    })
    .catch((error) => {
      showModalMessage('error', error);
    });
}
/* Change password */
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  $('#modal-change-password, .modal-backdrop').remove();

  api.changePassword(data)
    .then(() => {
      showModalMessage('success')
    })
    .catch((error) => {
      showModalMessage('error', error);
    });

  console.log('changing password in ran!')
}
/* sing out */
const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  api.signOut(data)
    .then(() => {
      clearFields();
      $('#logged-user,#div-content').hide();
      $('#div-content-account').fadeIn();
      $('#logged-user').fadeOut();
      $('#user-email').text(''), store.user = null;
    })
    .catch((error) => {
      showModalMessage('error', error);
    });

  console.log('sign out ran!')
}
/* show password modal */
const showPasswordForm = () => {

  $('#modal-change-password').modal({
    backdrop: 'static',
    keyboard: false
  });
}
const showBoard = () => {
  $('#game-board').fadeIn();
}
/* clear fields */
const clearFields = () => {
  $('.form-control').val('');
}
/* show the message modal */
const showModalMessage = (type, error) => {

  $('#myModal').modal({
    backdrop: 'static',
    keyboard: false
  });

  switch (type) {
    case 'UserRegistrated':
      $('#modal-message').text('Thank you for sign In in Tic Tac Toe Game :)');
      break;
    case 'success':
      $('#modal-message').text('Your request was successful :)');
      break;
      case 'error':
      $('#modal-message').text(`Something went wrong :( error: ${JSON.stringify(error)}`);
      break;
    default:
      return;
  }
}
// manage the event
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('click', onSignOut);
  $('#show-board').on('click',  showBoard);
  $('#show-change-password').on('click', showPasswordForm);
}

module.exports = {
  addHandlers
}

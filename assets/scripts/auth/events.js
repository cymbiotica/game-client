const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const store = require('../store');
const ui = require('../uifiles/ui');

/**
 * Register the user.
 *
 * @param event submit event.
 */
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  ui.showProgress();

  api.signUp(data)
    .then(() => {
      clearFields(); ui.hideProgress();
      ui.showModalMessage('UserRegistrated');
      console.log('sign up ran!');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

}
/* Log in */
const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this);
  ui.showProgress();
  setTimeout(function() {

    api.signIn(data)
    .then((result) => {
      ui.hideProgress();

      $('#logged-user,#div-content').fadeIn();
      $('#div-content-account').hide();
      $('#user-email').text(result.user.email);
      store.user = result.user;
      console.log('sign In ran!');

    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });

  }, 1000);

}
/* Change password */
const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(this);
  //$('#modal-change-password, .modal-backdrop').hide();
  ui.showProgress();

  api.changePassword(data)
    .then(() => {

      ui.hideProgress(); ui.showModalMessage('success');
      console.log('changing password in ran!')
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });


}
/* sing out */
const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(this);

  ui.showProgress();

  api.signOut(data)
    .then(() => {

      clearFields(); ui.hideProgress();
      $('#logged-user,#div-content').hide();
      $('#div-content-account').fadeIn();
      $('#logged-user').fadeOut();
      $('#user-email').text(''), store.user = null;
      console.log('sign out ran!')
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });
}
/* show password modal */
const showPasswordForm = () => {

  $('#modal-change-password').modal({
    backdrop: 'static',
    keyboard: false
  });
}
/* clear fields */
const clearFields = () => {
  $('.form-control').val('');
}
// manage the events
const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp);
  $('#sign-in').on('submit', onSignIn);
  $('#change-password').on('submit', onChangePassword);
  $('#sign-out').on('click', onSignOut);
  $('#show-change-password').on('click', showPasswordForm);
}

module.exports = {
  addHandlers
}

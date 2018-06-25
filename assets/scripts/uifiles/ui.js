const showProgress = () => {
  $('#modal-progress').modal({
    backdrop: 'static',
    keyboard: false
  });
}
const hideProgress = () => {
  $('#modal-progress').modal('hide');
}
/* show the message modal */
const showModalMessage = (type, error, player) => {

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
    case 'userWon':
      $('#modal-message').text(`${player} has won!`);
      break;
    case 'tie':
      $('#modal-message').text('It is a tie');
      break;
    default:
      return;
  }
}
module.exports = {
  showProgress,
  hideProgress,
  showModalMessage
}

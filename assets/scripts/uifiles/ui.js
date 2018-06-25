const showProgress = () => {
  $('#modal-progress').modal({
    backdrop: 'static',
    keyboard: false
  });
}
const hideProgress = () => {
  $('#modal-progress').modal('hide');
}

module.exports = {
  showProgress,
  hideProgress
}

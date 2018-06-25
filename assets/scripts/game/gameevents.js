const gamelogic = require('./gameLogic')

/* Show board */
const showBoard = () => {
  $('#game-board').fadeIn();
}
/* reset board */
const resetBoard = () => {
  gamelogic.resetGame();
}
const selectSize = () => {
  $('#div-score').fadeIn(); gamelogic.paintBoard($("#selectsize option:selected").val());
}
// manage the event
const addHandlers = () => {
  $('#show-board').on('click',  showBoard);
  $('#reset-board').on('click',  resetBoard);
  $('#selectsize').on('change',  selectSize);
}

module.exports = {
  addHandlers
}

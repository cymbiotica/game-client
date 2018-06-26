const gamelogic = require('./gameLogic');
const api = require('./api');
const ui = require('../uifiles/ui');

/* Show board */
const showBoard = () => {
  $('#game-board, #div-score').fadeIn();
}
/* reset board */
const resetBoard = () => {
  gamelogic.resetGame();
}
const showNotCompleted = () => {
  gamelogic.resetGame();
  ui.showProgress();

  api.getGames(false)
     .then((data) => {

       ui.hideProgress();
       console.log('get all games ran!')
       console.log(data);
       $('#list-games-not-complete').fadeIn();

       $.each(data.games, (index, element) => {
        $('#table-games > tbody').append('<tr><td>' + element.id + '</td><td>' + element.over + '</td><td><button id="btn-select-game' + index + '" type="button" class="btn btn-info btn-xs pull-right">Complete game</button></td></tr>');
          console.log(element.id, element.over)

          $('#btn-select-game' + index).click(function (e) {
             e.preventDefault();

             api.getGameById(element.id)
                .then((result) => {
                  console.log(result);
                })
                .catch((error) => {
                  ui.hideProgress(); ui.showModalMessage('error', error);
                });
          });
       });

      //  data.games.forEach(element => {
      //   $('#table-games > tbody').append('<tr><td>' + element.id + '</td><td>' + element.over + '</td><td><button id="btn-select-game ' + index + '" type="button" class="btn btn-info btn-xs pull-right">Complete game</button></td></tr>');
      //    console.log(element.id, element.over)

      //    $('#btn-select-game' + index).click(function (e) {
      //     e.preventDefault();

      //    });
      //  });

      //  if(data.games.length > 0) {
      //    ui.showModalConfirm();
      //  }

     })
     .catch((error) => {
       ui.hideProgress(); ui.showModalMessage('error', error);
     });
}
/* Generate game table */
const selectSize = () => {
  gamelogic.paintBoard($("#selectsize option:selected").val());
}
// manage the events
const addHandlers = () => {
  $('#show-board').on('click',  showBoard);
  $('#reset-board').on('click',  resetBoard);
  $('#selectsize').on('change',  selectSize);
  $('#show-not-completed').on('click',  showNotCompleted);
}

module.exports = {
  addHandlers
}

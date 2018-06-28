const gamelogic = require('./gameLogic');
const api = require('./api');
const ui = require('../uifiles/ui');

/* create game */
const createGame = () => {
  $('#list-games-not-complete').hide();
  $('#game-board,#reset-game, #div-score').fadeIn();
  gamelogic.paintBoard(3);
}
/* reset board */
const resetGame = () => {
  gamelogic.resetGame();
}
const showNotCompleted = () => {
  $('#list-games-not-complete').fadeIn(); $('#game-board, #div-score').hide();
  gamelogic.resetGame();
  ui.showProgress();

  api.getGames(false)
     .then((data) => {

       ui.hideProgress();
       //console.log('get all games ran!')

       $('#list-games-not-complete').fadeIn();

       $('#table-games > tbody').empty();

       $.each(data.games, (index, element) => {
        $('#table-games > tbody').append('<tr><td>' + element.id + '</td><td>' + element.over + '</td><td><button id="btn-select-game' + index + '" type="button" class="btn btn-info btn-xs pull-right">Complete game</button></td></tr>');


          $('#btn-select-game' + index).click(function (e) {
             e.preventDefault();

             api.getGameById(element.id)
                .then((result) => {

                  //console.log('get game by id ran!')
                  // painting the board with the object game that is coming.
                  gamelogic.paintBoardGameCreated(3, result);

                  // Show the board to load the game
                  $('#list-games-not-complete').hide();
                  $('#game-board, #div-score').fadeIn();
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
// const selectSize = () => {
//   gamelogic.paintBoard(3); //gamelogic.paintBoard($("#selectsize option:selected").val());
// }
// manage the events
const addHandlers = () => {
  $('#create-game').on('click',  createGame);
  $('#reset-game').on('click',  resetGame);
  //$('#selectsize').on('change',  selectSize);
  $('#show-not-completed').on('click',  showNotCompleted);
}

module.exports = {
  addHandlers
}

const ui = require('../uifiles/ui');
const api = require('./api');

let moves = 0,
  data = {},
  grid_size = 0,
  score_x = 0,
  score_o = 0,
  tie = 0;

const paintBoard = (size) => {

  let parentElement = document.querySelector('.game-panel');
  let board = parentElement.querySelector('.board');

  grid_size = size;
let count=-1;
  let table = '<table>';
  for (let i = 0; i < grid_size; i++) {
    table += '<tr>';
    for (let j = 0; j < grid_size; j++) {
      ++count;
      table += '<td id="' + count + '" row="' + i + '" column="' + j + '"></td>';
    }
    table += "</tr>";
  }
  count=-1;
  //console.log(table)

  board.innerHTML = table;

  let columns = board.getElementsByTagName('td');
  for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener('click', markElement);
  }

  // calling the api to create a game
  // api.creategame()
  //    .then((data) => {
  //      console.log(data)
  //      ui.hideProgress();
  //      console.log('created game ran!')
  //    })
  //    .catch((error) => {
  //      ui.hideProgress(); ui.showModalMessage('error', error);
  //    });
}
const markElement = () => {

  let td = event.target;

  if (td.innerHTML) {
    return;
  }

  // get values rows and collums
  let row = td.getAttribute('row'), column = td.getAttribute('column');

  let current_mark = moves % 2 === 0 ? 'X' : 'O';

  td.innerHTML = current_mark;
  td.classList.add(current_mark);
  data[row + '' + column] = current_mark;
  //console.log('data', data)
  moves++;


  if (checkForWin(current_mark, grid_size)) {

    let winner = null;

    if (current_mark === 'X') {
      winner = 'Player 1 (x)';
      score_x += 1;
      $("#score_x").text(score_x);
    } else {
      winner = 'Player 2 (o)';
      score_o += 1;
      $("#score_o").text(score_o);
    }

    //let winner = current_mark === 'X' ? 'Player 1 ' : 'Player 2 '
    ui.showModalMessage('userWon', null, winner);
  } else if (moves === Math.pow(grid_size, 2)) {
    ui.showModalMessage('tie');
    tie += 1;
    $("#tie-games").text(tie);
    resetGame();
  }

}
const checkForWin = (mark, grid_size) => {
  let vertical_count = 0,
    horizontal_count = 0,
    right_to_left_count = 0,
    left_to_right_count = 0;

  for (let i = 0; i < grid_size; i++) {

    vertical_count = 0;
    horizontal_count = 0;

    for (let j = 0; j < grid_size; j++) {

      if (data[i + '' + j] == mark) {
        horizontal_count++;
      }

      if (data[j + '' + i] == mark) {
        vertical_count++;
      }

    }

    if (data[i + '' + i] == mark) {
      left_to_right_count++;
    }

    if (data[(grid_size - 1 - i) + '' + i] == mark) {
      right_to_left_count++;
    }

    if (horizontal_count == grid_size || vertical_count == grid_size) {
      return true;
    }

  }

  if (left_to_right_count == grid_size || right_to_left_count == grid_size) {
    return true;
  }

  return false;
}

const resetGame = () => {
  $('#div-table-board').empty();
  moves = 0;
  paintBoard(0);
  data = {};
  $("#selectsize").val("0");
}
module.exports = {
  paintBoard,
  resetGame
}

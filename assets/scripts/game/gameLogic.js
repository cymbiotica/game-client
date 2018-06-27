const ui = require('../uifiles/ui');
const api = require('./api');

let moves = 0,
  data = {},
  grid_size = 0,
  score_x = 0,
  score_o = 0,
  tie = 0,
  gameData = {},
  lastPlayMade = null;


const paintBoardGameCreated = (size, game) => {

  let parentElement = document.querySelector('.game-panel');
  let board = parentElement.querySelector('.board');

  grid_size = size;

  let arr = game.game.cells;
  // filling this variable to update the game.
  gameData = game;
  //let arr = ["X", "O", "", "X", "", "", "", "", "O"]; // test array
  let x_count = 0;
  let o_count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 'X') {
      x_count++
    } else if (arr[i] == 'O') {
      o_count++;
    }
  }
  console.log(x_count, o_count)
  if (x_count >= o_count) {
    lastPlayMade = "O";
  } else {
    lastPlayMade = "X"
  }
  console.log(lastPlayMade)
  // spliting the array in three arrays
  let arrayList = chunkArray(arr, 3);
  let arrayOne = arrayList[0];
  let arrayTwo = arrayList[1];
  let arrayThree = arrayList[2];

  // bastard code begings here
  let table = '<table>';
  table += '<tr>';
  for (let i = 0; i < arrayOne.length; i++) {

    table += '<td row="' + 0 + '" column="' + i + '">' + arrayOne[i].toUpperCase() + '</td>';
    data[0 + '' + i] = arrayOne[i]
  }

  table += "</tr>";
  //console.log(arrayOne);
  table += '<tr>';

  for (let i = 0; i < arrayTwo.length; i++) {

    table += '<td row="' + 1 + '" column="' + i + '">' + arrayTwo[i].toUpperCase() + '</td>';
    data[1 + '' + i] = arrayTwo[i]
  }

  table += "</tr>";
  //console.log(arrayTwo);
  table += '<tr>';

  for (let i = 0; i < arrayThree.length; i++) {

    table += '<td row="' + 2 + '" column="' + i + '">' + arrayThree[i].toUpperCase() + '</td>';
    data[2 + '' + i] = arrayThree[i]

  }

  table += "</tr>";
  //console.log(arrayThree);
  //console.log(data)
  board.innerHTML = table;

  let columns = board.getElementsByTagName('td');
  for (let i = 0; i < columns.length; i++) {
    columns[i].addEventListener('click', markElement);
  }
}
const paintBoard = (size) => {

  ui.showProgress();
  //calling the api to create a game
  api.creategame()
    .then((data) => {

      ui.hideProgress();
      console.log('created game ran!');

      let parentElement = document.querySelector('.game-panel');
      let board = parentElement.querySelector('.board');

      grid_size = size;
      let table = '<table>';
      for (let i = 0; i < grid_size; i++) {
        table += '<tr>';
        for (let j = 0; j < grid_size; j++) {
          table += '<td row="' + i + '" column="' + j + '"></td>';
        }
        table += "</tr>";
      }

      board.innerHTML = table;

      let columns = board.getElementsByTagName('td');
      for (let i = 0; i < columns.length; i++) {
        columns[i].addEventListener('click', markElement);
      }
      console.log('render board ran!');
    })
    .catch((error) => {
      ui.hideProgress(); ui.showModalMessage('error', error);
    });
}
const markElement = () => {

  let td = event.target;

  if (td.innerHTML) {
    console.log('You can not update this cell :('); return;
  }

  // get values rows and collums
  let row = td.getAttribute('row'), column = td.getAttribute('column');

  let current_mark = moves % 2 === 0 ? 'X' : 'O';
  console.log(Math.pow(grid_size, 2))
  // let current_mark;
  // if(lastPlayMade == null) {
  //   current_mark = moves % 2 === 0 ? 'X' : 'O';
  // } else {
  //   if(lastPlayMade == 'X'){
  //     current_mark = 'O';
  //   } else {
  //     current_mark = lastPlayMade;
  //   }
  // }
  console.log(current_mark)
  td.innerHTML = current_mark;
  data[row + '' + column] = current_mark;
  moves++;

  // getting the index that is going to be update.
  let index = setCellValue(row, column, current_mark, gameData);

  updateCell(gameData, index, current_mark, false);

  if (checkForWin(current_mark, grid_size)) {

    let winner = null;

    if (current_mark === 'X') {
      winner = 'Player 1 (X)';
      score_x += 1;
      $("#score_x").text(score_x);
    } else {
      winner = 'Player 2 (O)';
      score_o += 1;
      $("#score_o").text(score_o);
    }

    updateCell(gameData, index, current_mark, true);

    // reset game
    resetGame();
    //let winner = current_mark === 'X' ? 'Player 1 ' : 'Player 2 '
    ui.showModalMessage('userWon', null, winner);
  } else if (moves === Math.pow(grid_size, 2)) { // Math.pow(grid_size, 2)
    ui.showModalMessage('tie');
    tie += 1;
    $("#tie-games").text(tie);

    updateCell(gameData, index, current_mark, true);

    // reset game
    resetGame();
  }

}
const updateCell = (gameData, index, current_mark, isOver) => {
  api.updateGame(gameData, index, current_mark, isOver)
    .then((result) => {

      console.log('update cell ran!');
      console.log(result.game);

    })
    .catch((error) => {
      ui.showModalMessage('error', error);
    });
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
/**
 * Set the value to the cell in the array of cells in the game array with the cell marked in the board.
 *
 * @param row  Type => Number. Row selected in the html board.
 * @param column  Type => Number. Column selected in the html board.
 * @param current_mark  Type => String. Value asigned to row and column in the html board.
 * @param gamedata  Type => Object. Object with all the information of the game.
 *
 * Return index of the array Type => Number
 */
const setCellValue = (row, column, current_mark, gamedata) => {

  let index = null;

  if (row == 0 && column == 0) {
    index = 0;
    gamedata.game.cells.splice(0, 1, current_mark);

  } else if (row == 0 && column == 1) {
    index = 1;
    gamedata.game.cells.splice(1, 1, current_mark);

  } else if (row == 0 && column == 2) {
    index = 2;
    gamedata.game.cells.splice(2, 1, current_mark);

  } else if (row == 1 && column == 0) {
    index = 3;
    gamedata.game.cells.splice(3, 1, current_mark);

  } else if (row == 1 && column == 1) {
    index = 4;
    gamedata.game.cells.splice(4, 1, current_mark);

  } else if (row == 1 && column == 2) {
    index = 5;
    gamedata.game.cells.splice(5, 1, current_mark);

  } else if (row == 2 && column == 0) {
    index = 6;
    gamedata.game.cells.splice(6, 1, current_mark);

  } else if (row == 2 && column == 1) {
    index = 7;
    gamedata.game.cells.splice(7, 1, current_mark);

  } else if (row == 2 && column == 2) {
    index = 8;
    gamedata.game.cells.splice(8, 1, current_mark);

  }

  return index;
}
// code provided by google :)
function chunkArray(myArray, chunk_size) {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];
  let myChunk = null;

  for (index = 0; index < arrayLength; index += chunk_size) {
    myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}
const resetGame = () => {
  $('.board').empty();
  moves = 0;
  //paintBoard(3);
  data = {};
  //$("#selectsize").val("0");
}
module.exports = {
  paintBoard,
  resetGame,
  paintBoardGameCreated
}

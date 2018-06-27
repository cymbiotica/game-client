const config = require('../config');
const store = require('../store');

/**
 * Request to the games api to create a new game and render the board.
 */
const creategame = function () {

  let data = {
    "game": {
      "cells": ["", "", "", "", "", "", "", "", ""],
      "over": false,
      "player_x": {
        "id": store.user.id,
        "email": store.user.email
      },
      "player_o": null
    }
  }

  return $.ajax({
    url: config.apiUrl + '/games',
    method: 'POST',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}
/**
 * Request to the games api to get a game by Id.
 *
 * @param id  {Int} Id of game to find.
 */
const getGameById = function (id) {
  return $.ajax({
    url: config.apiUrl + '/games/' + id,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });
}
/**
 * Request to the games api to get games by status.
 *
 * @param over  {Boolean} true brings completed games, false brings not complete games.
 */
const getGames = function (over) {

  let url = (over === false) ? config.apiUrl + '/games?over=false' : config.apiUrl + '/games?over=true';

  return $.ajax({
    url: url,
    method: 'GET',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  });
}
/**
 * Request to the games api to update games.
 *
 * @param game  {Object} Object game with all its properties.
 *
 * Return a promise.
 */
const updateGame = function (dataGame, index, value, isOver) {

  let data = {
    "game": {
      "cell": {
        "index": index,
        "value": value
      },
      "over": isOver
    }
  }

  return $.ajax({
    url: config.apiUrl + '/games/' + dataGame.game.id,
    method: 'PATCH',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: JSON.stringify(data)
  });

}

module.exports = {
  creategame,
  getGames,
  getGameById,
  updateGame
}

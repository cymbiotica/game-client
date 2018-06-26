const config = require('../config');
const store = require('../store');

/* Create a new game */
const creategame = function () {

  alert(store.user.email)

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
/* get game by id */
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
/* Get games created */
const getGames = function (over) {
  let url;

  if(over === false) {
    url = config.apiUrl + '/games?over=false'
  } else {
    config.apiUrl + '/games'
  }

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

module.exports = {
  creategame,
  getGames,
  getGameById
}

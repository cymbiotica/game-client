const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  alert(config.apiUrl)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}

var Twitter = require('twitter')
var path = require('path')
var fs = require('fs')
var util = require('util')
var Xray = require('x-ray')

var xray = Xray()

var keys = getKeys()

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
})

var params = {}

var nodeVersion = getNodeVersion(function (version) {
  params.name= `ira ${version} ✨`
  client.post('account/update_profile', params, function(err, data) {
    if (err) console.log(err)

    console.log(`Successfully updated profile with ${data.name} `)
  })
})

function getKeys () {
  var credsFile = path.join(__dirname, "./keys.json")
  var file = fs.readFileSync(credsFile)

  return JSON.parse(file)
}

function getNodeVersion (done) {
  xray('https://nodejs.org/en/', '.home-downloadblock:nth-of-type(2) .home-downloadbutton@data-version')
  (function (err, data) {
    if (err) throw err
    done(data)
  })
}


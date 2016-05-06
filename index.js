#! /usr/bin/env node

var Twitter = require('twitter')
var path = require('path')
var fs = require('fs')
var util = require('util')
var Xray = require('x-ray')
var argv = require('yargs')
.option('platform', {
  alias: 'p',
  describe: 'which platform do you want to do: node or npm',
  type: 'string'
})
.option('file', {
  alias: 'f',
  describe: 'provide twitter key file',
  type: 'string'
})
.option('name', {
  alias: 'n',
  descrbe: 'provide name to change this too',
  type: 'string'
})

var xray = Xray()
var file = argv.file 
var yourName = argv.name || ""

var keys = getKeys(file)

var params = {}
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
})

var nodeVersion = getNodeVersion(argv.platform, function (version) {
  params.name= `${yourName} ${version}`
  client.post('account/update_profile', params, function(err, data) {
    if (err) console.log(err)

    console.log(`Successfully updated profile with ${data.name} for ${argv.platform}`)
  })
})

function getKeys (file) {
  var credsFile = path.join(__dirname, file)
  var file = fs.readFileSync(credsFile)

  return JSON.parse(file)
}

// get version number based on platform; will default to node version
function getVersion(platform, done) {
  if (platform === 'npm') {
    xray('https://docs.npmjs.com/', '#npm-stable-version')
    (function (err, data) {
      if (err) throw err
      done(data)
    })
  } else {
    xray('https://nodejs.org/en/', '.home-downloadblock:nth-of-type(2) .home-downloadbutton@data-version')
    (function (err, data) {
      if (err) throw err
      done(data)
    })
  }
}

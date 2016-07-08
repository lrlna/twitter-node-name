#! /usr/bin/env node

var Twitter = require('twitter')
var path = require('path')
var fs = require('fs')
var util = require('util')
var Xray = require('x-ray')
var argv = require('yargs')
.usage('Usage: $0 -n [string] -f [string]')
.option('f', {
  alias: 'file',
  describe: 'File with your Access Tokens',
  type: 'string',
  demand: true
})
.option('n', {
  alias: 'name',
  describe: 'Twitter name of your choosing',
  type: 'string',
  demand: true
})
.argv

if (!argv.f || !argv.n || !argv._[0]) {
  require('yargs').showHelp()
  process.exit()
}

if (!argv.f || !argv.n || !argv._[0]) {
  require('yargs').showHelp()
  process.exit()
}

var xray = Xray()
var file = argv.f
var yourName = argv.n
var platform = argv._[0]

var keys = getKeys(file)

var params = {}
var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
})

var nodeVersion = getVersion(platform, function (version) {
  console.log(version)
  params.name= `${yourName} ${version}`
  client.post('account/update_profile', params, function(err, data) {
    if (err) console.log(err)

    console.log(`Successfully updated profile with ${data.name} for ${platform}`)
  })
})

function getKeys (file) {
  var file = fs.readFileSync(path.join(__dirname, file))
  var credentials = JSON.parse(file)

  Object.keys(credentials).forEach(function(key) {
    if (!credentials[key]) {
      require('yargs').showHelp("Missing twitter credentials.")
      process.exit()
    }
  })

  return credentials
}

// get version number based on platform; will default to node version
function getVersion(platform, done) {
  if (platform === 'npm') {
    xray('https://github.com/npm/npm/blob/master/CHANGELOG.md', '.readme article > :first-child')
    (function (err, data) {
      if (err) throw err
      var version = data.split(" ")
      done(version[0])
    })
  } else {
    xray('https://nodejs.org/en/', '.home-downloadblock:nth-of-type(2) .home-downloadbutton@data-version')
    (function (err, data) {
      if (err) throw err
      done(data)
    })
  }
}

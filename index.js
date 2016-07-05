#! /usr/bin/env node

var Twitter = require('twitter')
var path = require('path')
var fs = require('fs')
var util = require('util')
var Xray = require('x-ray')
var argv = require('yargs').argv

var file = argv.f
var yourName = argv.n
var platform = argv._[0]

if(isUndefined(platform) || isUndefined(file) || isUndefined(yourName) || argv.help) {
  console.log('\x1b[32m',`\t\tUsage :- 
                  $ twitter-node-name -f /path/to/keys/ -n AwesomeName node
                      where,
                        -n AwesomeName is the name you want to have aside from version,
                        -f is path to file that holds your twitter keys,
                        node could be substituted for npm to get the latest version of npm from npm's changelog 
                          -- it literally grabs the first heading on that changelog page, so there could be mistakes. 

               Examples :- 
                  $ twitter-node-name -f /path/to/keys/ -n AwesomeName node
                            OR
                  $ twitter-node-name -f /path/to/keys/ -n AwesomeName npm

               Help :- 
                   $ twitter-node-name --help
                            OR
                   $ twitter-node-name -help
                            OR
                   $ twitter-node-name`,'\x1b[0m');
  process.exit(0);
}
var xray = Xray()
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
  var credsFile = path.join(__dirname, file)
  var file = fs.readFileSync(credsFile)

  return JSON.parse(file)
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

function isUndefined(value) {
  return value === undefined;
}
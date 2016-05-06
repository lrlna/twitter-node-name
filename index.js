var Twitter = require('twitter')
var path = require('path')
var fs = require('fs')


var keys = getKeys()

var client = new Twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token_key: keys.access_token_key,
  access_token_secret: keys.access_token_secret
})

client.post('account/update_profile', params, function(err, data) {
  if (err) console.log(err)

  console.log(`Successfully update profile with ${params.name}`)
})

function getKeys () {
  var credsFile = path.join(__dirname, "./keys.json")
  var file = fs.readFileSync(credsFile)

  return JSON.parse(file)
}

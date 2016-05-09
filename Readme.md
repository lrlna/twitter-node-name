Change your twitter name to include a node version 💄✨ , cause it's hard to keep track of node versions

#### Install:

```bash
npm install -g twitter-node-name
```


#### Use
```
twitter-node-name -f /path/to/keys/ -n AwesomeName✨ node
```

where `-n` AwesomeName✨ is the name *you* want to have aside from version 🐨 ,

      `-f` is path to file that holds your twitter keys

      `node` could be substituted for `npm` to get the latest version of npm from [npm's ✨ changelog ✨](https://github.com/npm/npm/blob/master/CHANGELOG.md) -- it literally grabs the first heading on that changelog page, so there could be mistakes. 

Then, set it up as your cronjob to run at whatever interval you like. Run this to edit cronjobs in your fave editor:

```bash
crontab -e
```
and add this to run every 24 hours at 13:00 (1pm):

```
0 13 * * * twitter-node-name -f /path/to/keys/ -n AwesomeName✨node 
```

#### Instructions

Have your [twitter keys](https://dev.twitter.com/oauth/overview) ready in a json file, name it `keys.json`: 

```
touch keys.json
vim keys.json
```

and add all your 🆒  keys:
```javascript
{
  "consumer_key": "cool_consumer_key",
  "consumer_secret": "cool_consumer_sercret",
  "access_token_key": "cool_access_token_key",
  "access_token_secret": "cool_access_token_secret"
}
```

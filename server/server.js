const express = require('express');
const Twitter = require('twit');
const cors = require('cors');
const { restart } = require('nodemon');
const app = express();
const crypto = require('crypto')


app.use(require('cors')());
app.use(require('body-parser').json());
app.use(cors())



var userHandle = "";
var usersID = "";
var tweetsHandle = "";

const apiClient = new Twitter({
  consumer_key: '',                 // add your keys
  consumer_secret: '',
  access_token: "",
  access_token_secret: ''
});

const apiClient2 = new Twitter({
  consumer_key: '',
  consumer_secret: ''
  ,app_only_auth: true
})


function genNonce() {
  const arr = Array(32)
    .fill()
    .map(() => Math.round(Math.random() * 40));
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~'
  const result = [];
  arr.forEach(c =>
    result.push(charset[c % charset.length]));
  return result.join('');
}


function calculateSignature(oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_token, oauth_version) {
  httpMethod = "POST";
  baseURL = "https://api.twitter.com/1.1/oauth/request_token.json"
  signString = (
    "include_entities=true&oauth_consumer_key=" + encodeURIComponent(oauth_consumer_key) +
    "&oauth_nonce=" + encodeURIComponent(oauth_nonce) +
    "&oauth_signature_method=" + encodeURIComponent(oauth_signature_method) +
    "&oauth_timestamp=" + encodeURIComponent(oauth_timestamp) +
    // "&oauth_token="+encodeURIComponent(oauth_token)+
    "&oauth_version=" + encodeURIComponent(oauth_version))

  signingText = httpMethod + "&" + encodeURIComponent(baseURL) + "&" + encodeURIComponent(signString)

  signingKey = encodeURIComponent(oauth_consumer_key) + "&"

  signature = crypto.createHmac('sha1', signingKey).update(signingText).digest().toString('base64');
  return signature
}


app.post('/sign_in', (req, res) => {


  const oauth_consumer_key = '';
  const oauth_nonce = genNonce();
  const oauth_timestamp = Math.round(Date.now() / 1000);
  const oauth_signature_method = 'HMAC-SHA1'
  const oauth_token = ""
  const oauth_version = '1.0'
  const oauth_signature = calculateSignature(oauth_consumer_key, oauth_nonce, oauth_timestamp, oauth_signature_method, oauth_token, oauth_version)

  const DST = "OAuth " +
    encodeURIComponent("oauth_consumer_key") + "=" + "\"" + encodeURIComponent(oauth_consumer_key) + "\", " +
    encodeURIComponent("oauth_nonce") + "=" + "\"" + encodeURIComponent(oauth_nonce) + "\", " +
    encodeURIComponent("oauth_signature") + "=" + "\"" + encodeURIComponent(oauth_signature) + "\", " +
    encodeURIComponent("oauth_signature_method") + "=" + "\"" + encodeURIComponent(oauth_signature_method) + "\", " +
    encodeURIComponent("oauth_timestamp") + "=" + "\"" + encodeURIComponent(oauth_timestamp) + "\", " +
    encodeURIComponent("oauth_version") + "=" + "\"" + encodeURIComponent(oauth_version) + "\""


  console.log(DST)
  req.headers.authorization = DST
  apiClient
    .post(`oauth/request_token`, req.headers.authorization, { oauth_callback: encodeURIComponent(req.body.data) })
    .then(resp => {
      //   console.log(tweeting);
      console.log("status test: " + resp.status)
      res.send(resp.status);
    })

    .catch(error => {
      res.send(error);
    });


});

app.get('/home_timeline', (req, res) => {
  const params = { tweet_mode: "extended", count: 200 }

  apiClient
    .get("statuses/home_timeline", params)
    .then(timeline => {
      res.send(timeline);
    }).catch(error => {
      res.send(error);
    })

})



app.get('/mentions_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', count: 200 }

  apiClient
    .get(`statuses/mentions_timeline`, params)
    .then(timeline => {

      res.send(timeline);
    })
    .catch(error => {
      res.send(error);
    })

})


app.get('/user_timeline', (req, res) => {
  const params = { tweet_mode: 'extended', screen_name: tweetsHandle, count: 20 }
  console.log(tweetsHandle)
  apiClient
    .get(`statuses/user_timeline`, params)
    .then(timeline => {

      res.send(timeline);
    })
    .catch(error => {
      res.send(error);
    })

})










app.post('/post_tweet', (req, res) => {


  console.log(req.body)
  //console.log(JSON.stringify(req.body.message).replaceAll("\"","") )
  var tweet = req.body;

  apiClient
    .post(`statuses/update`, tweet)
    .then(tweeting => {
      //   console.log(tweeting);

      res.send(tweeting);
    })

    .catch(error => {
      res.send(error);
    });


});


app.post('/send_handle', (req, res) => {


  userHandle = req.body.userHandle;
  console.log("/send_handle")
  console.log(userHandle)

});
app.get('/get_handle', (req, res) => {
  res.send(JSON.parse("{\"userHandle\":\"" + userHandle + "\"}"))
})



app.post('/send_ID', (req, res) => {

  console.log("/send_ID")
  usersID = req.body.userID.data.id_str;
  console.log(usersID)





});

app.post('/send_joint_handle', (req, res) => {

  console.log("/send_joint_handle")
  tweetsHandle = req.body.username;
  console.log(tweetsHandle)




});





app.get('/get_ID', (req, res) => {
  const params = { tweet_mode: "extended", screen_name: userHandle }
  console.log("/get_ID")
  console.log(userHandle)

  apiClient
    .get("users/show", params)
    .then(userID => {
      //   console.log("The User ID")
      //  console.log(userID);
      res.send(userID);
    }).catch(error => {
      res.send(error);
    })

})



app.get('/liked_tweets', async (req, res) => {
  const params = { tweet_mode: "extended", user_id: usersID, count: 200 }
  console.log("/liked_tweets")
  //  console.log(usersID.data.user.id)

  await apiClient
    .get("favorites/list", params)
    .then(favs => {
      res.send(favs);
    }).catch(error => {
      res.send(error);
    })

})

var server = app.listen(3000, () => console.log('Server running'))
server.setMaxListeners(50)


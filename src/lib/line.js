const urlencode = require('urlencode')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const LINE_REDIRECT_URI = 'https://asia-northeast1-delta-button-185206.cloudfunctions.net/oauth'
const LINE_ISSUE_TOKE_ENDPOINT = 'https://api.line.me/oauth2/v2.1/token'
const LINE_CHANNEL_ID = '1654322809'
const LINE_CHANNEL_SECRET = '49ee3c0ea86d5c944d4b186d3e2fd1af'
const LINE_NONCE = 'qwert'

async function getLineUser(req, res) {
  let {data: respData} = await axios({
    "method": "POST",
    "url": LINE_ISSUE_TOKE_ENDPOINT,
    "headers": {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "data": `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${urlencode(LINE_REDIRECT_URI)}&client_id=${LINE_CHANNEL_ID}&client_secret=${LINE_CHANNEL_SECRET}`
  })

  // {
  //   "access_token": "bNl4YEFPI/hjFWhTqexp4MuEw5YPs...",
  //   "expires_in": 2592000,
  //   "id_token": "eyJhbGciOiJIUzI1NiJ9...",
  //   "refresh_token": "Aa1FdeggRhTnPNNpxr8p",
  //   "scope": "profile",
  //   "token_type": "Bearer"
  // }

  const {access_token, expires_in, id_token, refresh_token, scope, token_type} = respData
  // 解開 id_token 的 user profile
  const user = jwt.decode(id_token, LINE_NONCE)
  return user
}

module.exports = {
  getLineUser
}
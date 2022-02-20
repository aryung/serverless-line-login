const urlencode = require('urlencode')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const {
  LINE_REDIRECT_URI,
  LINE_ISSUE_TOKE_ENDPOINT,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_NONCE
} = require('./config')

const { getFirebaseUser } = require('./src/lib/firebase_oauth')

exports.oauth = async (req, res) => {
  try {

    let { data: respData } = await axios({
      "method": "POST",
      "url": LINE_ISSUE_TOKE_ENDPOINT,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${urlencode(LINE_REDIRECT_URI)}&client_id=${LINE_CHANNEL_ID}&client_secret=${LINE_CHANNEL_SECRET}`
    })
    let { access_token, expires_in, id_token, refresh_token, scope, token_type } = respData
    let { name, picture, email, sub: userId } = jwt.decode(id_token, LINE_NONCE)
    const token = await getFirebaseUser({ id: userId, uid: userId, name, picture, email })

    res.redirect(`${process.env.LINE_REDIRECT_URI_AFTER_TOKEN}/?token=${token}`)

  } catch (err) {

    console.log('main err', err)
    res.status(500).end()

  }
}

exports.oauthdev = async (req, res) => {
  try {

    let { data: respData } = await axios({
      "method": "POST",
      "url": LINE_ISSUE_TOKE_ENDPOINT,
      "headers": {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      "data": `grant_type=authorization_code&code=${req.query.code}&redirect_uri=${urlencode(LINE_REDIRECT_URI_DEV)}&client_id=${LINE_CHANNEL_ID_DEV}&client_secret=${LINE_CHANNEL_SECRET_DEV}`
    })

    let { access_token, expires_in, id_token, refresh_token, scope, token_type } = respData
    // // 解開 id_token 的 user profile
    let { name, picture, email, sub: userId } = jwt.decode(id_token, LINE_NONCE)

    // const {name, picture, email, sub: userId} = getLineUser(req, res)
    // check firebase user information
    /*
      CRUD firebase-user
      userData: {uid, email, emailVerified, displayName, photoURL, disabled, tokenValidAfterTime, providerData}
     */
    const token = await getFirebaseUser({ id: userId, uid: userId, name, picture, email })

    // res.redirect(`${process.env.LINE_REDIRECT_URI_AFTER_TOKEN}/${token}`)
    res.redirect(`${process.env.LINE_REDIRECT_URI_AFTER_TOKEN}/?token=${token}`)

  } catch (err) {

    console.log('main err', err)
    res.status(500).end()

  }
}
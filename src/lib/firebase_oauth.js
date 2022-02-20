const admin = require("firebase-admin")
const { FIREBASE_SERVICE_ACCOUNT, FIREBASE_DATABASE_URL } = require('../../config')
admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
  databaseURL: FIREBASE_DATABASE_URL
})


async function getFirebaseUser(payload) {
  try {
    const { uid, name, picture, email } = payload

    const uidExists = await admin.auth().getUser(uid).then(() => true).catch(() => false)
    if (uidExists) {
      userRecord = await admin.auth().getUser(uid)
    } else {
      userRecord = await admin.auth().createUser({
        uid: uid,
        displayName: name,
        photoURL: picture,
        email: email
      })
    }

    const token = await admin.auth().createCustomToken(uid)
    return token

  } catch (err) {
    return Promise.reject(err)
  }
}


module.exports = {
  getFirebaseUser,
  firebaseAdmin: admin
}
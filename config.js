const LINE_REDIRECT_URI = '--cloud-endpoint--'
// check line oauth token (eg. https://api.line.me/oauth2/v2.1/token)
const LINE_ISSUE_TOKE_ENDPOINT = '--line-oauth-token-version--'
// get it from line developer
const LINE_CHANNEL_ID = '**********'
const LINE_CHANNEL_SECRET = '********************************'
const LINE_NONCE = '********'
const LINE_PROVIDER = 'LINE'

const FIREBASE_SERVICE_ACCOUNT = {
  "type": "service_account",
  "project_id": "--project-id--",
  "private_key_id": "--private-key-id--",
  "private_key": "--private-key--",
  "client_email": "--service-account-email--",
  "client_id": "*********************",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://***********************"
}
const FIREBASE_DATABASE_URL = "https://***********************"


module.exports = {
  LINE_REDIRECT_URI,
  LINE_ISSUE_TOKE_ENDPOINT,
  LINE_CHANNEL_ID,
  LINE_CHANNEL_SECRET,
  LINE_NONCE,
  FIREBASE_SERVICE_ACCOUNT,
  FIREBASE_DATABASE_URL
}

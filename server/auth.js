// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const fs = require('fs');
const readline = require('readline');
const openurl = require('openurl');
//const googleAuth = require('google-auth-library');
const { GoogleAuth } = require('google-auth-library');
const { OAuth2Client } = require('google-auth-library');
//const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//      process.env.USERPROFILE) + '/.credentials/';
//const TOKEN_PATH = TOKEN_DIR + 'slides.googleapis.com-nodejs-quickstart.json';

const TOKEN_DIR = "./"
//const TOKEN_PATH = 'gjden.json';
const TOKEN_PATH = 'token.json';

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/slides.googleapis.com-nodejs-quickstart.json
const SCOPES = [
  'https://www.googleapis.com/auth/presentations', // needed to create slides
   
];

/**
 * Loads client secrets from a local file.
 * @return {Promise} A promise to return the secrets.
 */
module.exports.getClientSecrets = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('./client_secret.json', (err, content) => {
      if (err) return reject('Error loading client secret file: ' + err);
      console.log('loaded secrets...');
      resolve(JSON.parse(content));
    });
  });
}

/**
 * Create an OAuth2 client promise with the given credentials.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback for the authorized client.
 * @return {Promise} A promise to return the OAuth client.
 */
module.exports.authorize = (credentials) => {
  return new Promise((resolve, reject) => {
    console.log('authorizing...');
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
//    const auth = new GoogleAuth();
//    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      
//      OAuth2Client(clientId, clientSecret, redirectUrl);
      
      const oauth2Client = new OAuth2Client(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
          console.log("GET NEW TOKEN");
        getNewToken(oauth2Client).then((data) => {
            console.log(data);
          resolve(oauth2Client);
        });
      } else {
          console.log("OLD TOKEN HERE");
        oauth2Client.credentials = JSON.parse(token);
        resolve(oauth2Client);
      }
    });
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * fulfills the promise. Modifies the `oauth2Client` object.
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @return {Promise} A promise to modify the oauth2Client credentials.
 */
function getNewToken(oauth2Client) {
  console.log('getting new auth token...');
  openurl.open(oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  }));

  console.log(''); // \n
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oauth2Client.getToken(code, (err, token) => {
          console.log("TOKEN");
          console.log(token);
        if (err) return reject(err);
        oauth2Client.credentials = token;
        let storeTokenErr = storeToken(token);
        if (storeTokenErr) return reject(storeTokenErr);
        resolve();
      });
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 * @param {Object} token The token to store to disk.
 * @return {Error?} Returns an error or undefined if there is no error.
 */
function storeToken(token) {
  try {
//    fs.mkdirSync(TOKEN_DIR);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  } catch (err) {
    if (err.code != 'EEXIST') return err;
  }
  console.log('Token stored to ' + TOKEN_PATH);
}

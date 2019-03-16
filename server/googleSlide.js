const auth = require('./auth');

const slides = require('./slides');


auth.getClientSecrets()
  .then(auth.authorize)

  .then(slides.getGSSlides)
//  .then(slides.createGSSlides)
////  .then(slides.openSlidesInBrowser)
  .then(() => {
//    console.log(data);
    console.log('-- Finished generating slides. --');
  });

//https://slides.googleapis.com/v1/presentations/{presentationId}

const axios = require('axios');

// Make a request for a user with a given ID
//axios.get('https://slides.googleapis.com/v1/presentations/19It0lvWa0124NEueiLs4VsmCFnctAzMCdxSyMFHbaE4')
//  .then(function (response) {
//    // handle success
//    console.log(response);
//  })
//  .catch(function (error) {
//    // handle error
//    console.log(error);
//  })
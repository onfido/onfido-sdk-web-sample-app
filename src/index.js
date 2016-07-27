var Onfido = require('onfido-sdk-ui');

window.onload = function() {
  var url = "https://gentle-gorge-17630.herokuapp.com/api"
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)

      Onfido.init({
        useModal: false,
        token: data.message,
        onReady: function() {
          // callback that fires when successfully authorised
        },
        onDocumentCapture: function(event) {
          // callback for when the document has captured successfully
        },
        onFaceCapture: function(event) {
          // callback for when the face capture was successful
        },
        onComplete: function(event) {
          // callback for when everything is complete
        },
        steps: [
          {
            type:'welcome',
            options:{
              title:'Open your new bank account'
            }
          },
          'document',
          'face',
          'complete'
        ]
      });
    }
  }
  request.send()
};

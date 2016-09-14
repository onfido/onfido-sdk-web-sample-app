var Onfido = require('onfido-sdk-ui');

window.onload = function() {
  var url = location.protocol+"//"+location.hostname+":8090/jwt"
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText)

      window.onfidoOut = Onfido.init({
        useModal: false,
        token: data.jwt,
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
          var data = Onfido.getCaptures();
          console.log(data);
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


require("./style.css")
require("./style_alt.css")

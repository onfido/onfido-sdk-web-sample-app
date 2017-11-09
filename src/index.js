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
        token: data.token,
        onComplete: function() {
          // callback for when everything is complete
          console.log("Everything is complete");
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

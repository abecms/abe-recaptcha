var request = require('request')
var Promise = require("bluebird");

module.exports = (req, abe) => {
  let p = new Promise((resolve) => {
    if(abe.config.reCaptcha && abe.config.reCaptcha.secretKey){
      var gresponse = req.body['g-recaptcha-response'];

      request({
        uri: "https://www.google.com/recaptcha/api/siteverify",
        method: "POST",
        form: {
          secret: abe.config.reCaptcha.secretKey,
          response: gresponse,
          remoteip: req.connection.remoteip
        },
        json:true
      }, function(error, response, body) {
        if(
            body.hostname !== undefined &&
            abe.config.reCaptcha.hostname !== undefined &&
            body.hostname != abe.config.reCaptcha.hostname
          ) {
          body.success = false
          body['error-codes'].push('hostname differ')
          resolve(body)
        } else {
          resolve(body)
        }
      });
    } else {
      var result = {
        success: false,
        "error-codes": ['Captcha config not found']
      }

      resolve(result)
    }
  })

  return p
}

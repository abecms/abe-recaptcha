'use strict';

var ReCaptcha = require('../../modules/recaptcha')

var route = function route(req, res, next, abe) {
  res.set('Content-Type', 'application/json')

  ReCaptcha(req, abe).then(function(result){
    res.end(result)
  })
}

exports.default = route
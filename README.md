# abe-recaptcha
This plugin exposes Google Recaptcha to your Abe project

# Installation
from your project root:
```
abe install abecms/abe-recaptcha
```

# Usage

1. (https://developers.google.com/recaptcha/docs/display) on the template that will include your form:
```
<html>
  <head>
    <title>reCAPTCHA demo: Simple page</title>
     <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  </head>
  <body>
    <form action="?" method="POST">
      <div class="g-recaptcha" data-sitekey="your_site_key"></div>
      <br/>
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
```

2. You can then use this route to check the Captcha:
```/abe/plugin/abe-recaptcha/check```

which will return a JSON with the Google Recaptcha answer.

# Alternative

You may also use your own route and check the captcha from your code:
```
'use strict';
var ReCaptcha = require('abe-recaptcha')

var route = function route(req, res, next, abe) {
  res.set('Content-Type', 'application/json')

  // if we use a Captcha for the form, we chek the Recaptcha request
  // then call the asanaRequest function
  if(abe.config['plane-management'].useCaptcha){
    ReCaptcha(req, abe).then(function(result){
      if(result.success){
        res.send({success:true})
      } else {
        res.send({success:false})
      }
    })
  } else {
    res.send({success:false})
  }
}

exports.default = route
```



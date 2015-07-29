var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var redditLib = require('../lib/reddit')
var watsonLib = require('../lib/watson')


/* GET home page. */
router.get('/', function(req, res, next) {
  unirest.get('http://www.reddit.com/user/trampolice/comments.json')
    .end(function (response) {
      var redditComments = '';
      var response_data = response.body
      for (i = 0; i < response_data.data.children.length; i ++) {
        redditComments += " " + response_data.data.children[i].data.body;
      }
      unirest.post('http://jbrenneman-watson-demo.mybluemix.net')
        .header('Content-Type', 'text/plain')
        .send(redditComments)
        .end(function (watsonResponse){
            // console.log(watsonResponse);
            var result = [];
            var personality = watsonResponse.body.children[0].children[0].children[0].children;
            for (var i = 0; i < personality.length; i++) {
              var obj = {};
              obj.label = personality[i].name;
              obj.value = personality[i].percentage;
              result.push(obj);
            }
        // var chart = new Chart(ctx).PolarArea(result, options);
        //   document.getElementsByTagName('p').innerHTML = chart

        // console.log(watsonResponse.body);
        })
            res.render('index');
    })
  });

module.exports = router;

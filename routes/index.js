var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var redditLib = require('../lib/reddit')
var watsonLib = require('../lib/watson')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });

router.post('/watson', function (req, res, next) {
  var redditUser = req.body.username
  console.log(redditUser);
  unirest.get('http://www.reddit.com/user/'+redditUser+'/comments.json')
    .end(function (response) {

      var error = 'User Not Found'
      if(response.body.error === 404) {
        res.render('index', {error: error})
      } else {
        var redditComments = '';
        var response_data = response.body
        for (i = 0; i < response_data.data.children.length; i ++) {
          redditComments += " " + response_data.data.children[i].data.body;
        }
        unirest.post('http://jbrenneman-watson-demo.mybluemix.net')
          .header('Content-Type', 'text/plain')
          .send(redditComments)
          .end(function (watsonResponse){

              // Big Five
              var bigFive = '';
              var openness = {};
              var conscientiousness = {};
              var extraversion = {};
              var agreeableness = {};
              var emotional = {};
              var traits = [openness, conscientiousness, extraversion, agreeableness, emotional];
              var personality = watsonResponse.body.children[0].children[0].children;

              for (var i = 0; i < personality.length; i++) {
                var labels = [];
                var datas = [];
                if(i === personality.length -1)
                  bigFive += personality[i].name + ' ' + personality[i].percentage.toFixed(2);
                else
                  bigFive += personality[i].name + ' ' + personality[i].percentage.toFixed(2) + ',';
                var start = personality[i];
                // console.log(personality.length);
                for (var j = 0; j <= 5; j++) {
                  labels.push(start.children[j].name)
                  datas.push(start.children[j].percentage)
                }
                traits[i].labels = labels;
                traits[i].datasets = datas;
              if(personality[i].name === 'Emotional range')
                traits[i].bigF = 'Emotional';
              else
                traits[i].bigF = personality[i].name;
                console.log(personality[i].name);
              }
              // Children
              // console.log(traits);




            // con    sole.log(children[0]);
            res.render('index', {bigFive: bigFive, traits: JSON.stringify(traits) });
          })
      }
    })

})
module.exports = router;

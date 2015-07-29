module.exports = function watsonRequest(redditComments) {
var unirest = require('unirest');
unirest.post('http://jbrenneman-watson-demo.mybluemix.net')
  .header('Content-Type', 'text/plain')
  .send(redditComments)
  .end(function (watsonResponse){
    console.log(redditComments);
    console.log(watsonResponse.body);
    return watsonResponse
  })
return watsonResponse
}

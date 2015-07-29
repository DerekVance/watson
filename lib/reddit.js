module.exports = function redditRequest() {
var watson = require('./../lib/watson')
var unirest = require('unirest');
unirest.get('http://www.reddit.com/user/trampolice/comments.json')
  .end(function (response) {
    var redditComments = '';
    var response_data = response.body
    for (i = 0; i < response_data.data.children.length; i ++) {
      redditComments += " " + response_data.data.children[i].data.body;
    }
      // console.log(typeof reddit_comments);
      return watson(redditComments);
  });
}

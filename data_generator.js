/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
window.users = Object.keys(streams.users);

// stuff added
var userArray = ['placeholder', 'shawndrost', 'sharksforcheap', 'mracus', 'douglascalhoun'];
var targetName = (this.document.URL).split('/').pop().split('.').shift();

var filter = function(user) { //arg is string
  var $tweets = $('.tweets');
  $tweets.remove();
  targetName = user;
  var index = streams.users[user].length-1;
  var $tweetBox = $('#tweet');
  for(var i=0; i<50; i++) {
    var $tweet = tweetRender(streams.users[user][index]);
    $tweet.appendTo($tweetBox);
    if(index > 0) {
      index -= 1;
    } else {
      break;
    }
  }
};

var getUserName = function(next) { // arg is expected to be tweets classed div
  return next[0].className.split(' ')[1];
};

var tweetRender = function(tweet) {
  if(tweet) {
    var $tweet = $('<div class="tweets"></div>');
    var userName = '<button class="userNames" type="button">' + tweet.user + '</button>';
    $tweet.html('@' + userName + ': ' + tweet.message + ' tweeted at ' + tweet.created_at.getHours() + ':' + tweet.created_at.getMinutes());
    $tweet.addClass(`${tweet.user}`);
    return $tweet;
  }
};

var updateCreator = function(wait) {
  var canBeCalled = true;
  var tweetsCollector = [];
  var limitLen = 50;
  return function() {
    var tweet = streams.home[streams.home.length-1];
    tweetsCollector.unshift(tweetRender(tweet));
    if(canBeCalled) {
      canBeCalled = false;
      var $tweetBox = $('#tweet');
      var tweetsToPush = tweetsCollector.length;
      while(tweetsToPush--) {
        var temp = tweetsCollector.pop();
        if(targetName === 'index' || targetName === getUserName(temp)) {
          $tweetBox.prepend(temp);
        }
        while($('.tweets').length > limitLen) {
          $('.tweets:last-child').remove();
        }
      }
      (function() { setTimeout(function() { canBeCalled = true; }, wait)})(wait);
    }
  }
};

var update = updateCreator(10000);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  addTweet(tweet);
  if(targetName==='index' || tweet.user===targetName) update();
};

for(var i = 0; i < 10; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(user, message){
  var tweet = {};
  tweet.user = user;
  tweet.message = message;
  tweet.created_at = new Date();
  addTweet(tweet);
  update();
};

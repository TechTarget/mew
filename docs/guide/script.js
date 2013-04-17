
var hints = {
  "home": "This is a cheatsheet for the MEW <strong>user.json</strong> configuration file. <br/><br/> You can access information about properties by <strong>mousing over</strong> or <strong>clicking</strong> the property name.</li></ul>",
  "username": "your techtarget username",
  "fullname": "your full name (John Smith)",
  "email": "your techtarget email address",
  "language": "defaults to EN; ES & FR also available",
  "os": "description here",
  "browser": "description here",
  "useLocalServers": "description here",
  "localServers": "description here",
  "ftp": "description here",

  "mediaPath": "description here",

  "cdn": "description here",

  "mediaPath": "description here",

  "smtp": "description here",
  "emailService": "description here",
  "emailUser": "description here",
  "emailPassword": "description here",
  "notifications": "description here",
  "create": "description here",
  "sendEmails": "description here",
  "emailTemplateName": "description here",
  "emailSubject": "description here",
  "recipients": "description here",
  "release": "description here",
};

$(document).ready(function(){

  $('.hint').html(hints['home']);

  $('.npm .pair').mouseover(function(e){
    var el = this;
    $('.hint').css('top', $(document).scrollTop() + (90) + 'px');
    var key = $('.key', el).html().replace(/"/g, '');
    $('.hint').html(hints[key]);
  });

  $('.npm .key').click(function(e){
    var el = this;
    $('.hint').css('top', $(document).scrollTop() + (90) + 'px');
    var key = $('.key', el).html().replace(/"/g, '');
    $('.hint').html(hints[key]);
  });


});
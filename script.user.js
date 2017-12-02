// ==UserScript==
// @name         WebAssign Searcher
// @namespace    http://tampermonkey.net/
// @version      4.0
// @description  Automatically Googles the questions on a WebAssign assingment for you
// @author       Rahul Batra
// @include      http://www.webassign.net/web/Student/Assignment-Responses/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js

// ==/UserScript==

// Testing update

(function() {
  'use strict';

  // Sites to search

  var dialog = $('<p>WebAssign Searcher:\nWhat sites do you want to search</p>').dialog({
    buttons: {
      "Yahoo Answers": function() {
        console.log('Searching Yahoo Answers');
      },
      "Chegg": function() {
        console.log('Searching Chegg');
        dialog.dialog('close');
      },
      "Google": function() {
        console.log('Searching Both');
        dialog.dialog('close');
      },
      "Don't search": function() {
        console.log('Not searching for answers');
        dialog.dialog('close');
      }
    }
  });




  console.log("window.location.href is: " + window.location.href);
  console.log("WebAssign Searcher it running!!!");

  var qs = $(".studentQuestionContent").map(function() {
    return this.innerHTML;
  }).get();

  for (var x = 0; x < qs.length; x++) {
    qs[x] = qs[x].replace(/<(?:.|\n)*?>/gm, '');
    qs[x] = qs[x].trim();
    qs[x] = qs[x].replace(/(^[ \t]*\n)/gm, "");

  }

  // Questions
  console.log(qs);

  var google = "https://www.google.com/search?q=";

  for (x = 0; x < qs.length; x++) {
    var tab = window.open(google + qs[x], '_blank');
  }

})();

// ==UserScript==
// @name         WebAssign Searcher
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automaticqsy googles qs the questions on a WebAssign assingment for you
// @author       Rahul Batra, Harun Feraidon
// @include      http://www.webassign.net/web/Student/Assignment-Responses/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js

// ==/UserScript==

// Testing update

(function() {
  'use strict';

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

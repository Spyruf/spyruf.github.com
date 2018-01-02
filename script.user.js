// ==UserScript==
// @name         WebAssign Searcher
// @namespace    http://tampermonkey.net/
// @version      10.5
// @description  Automatically Googles the questions on a WebAssign assingment for you
// @author       Rahul Batra
// @include      http://www.webassign.net/web/Student/Assignment-Responses/*
// @include      http://www.webassign.net/*/student/practice*
// @grant        none

// ==/UserScript==

(function () {
    'use strict';


    console.log("window.location.href is: " + window.location.href);
    console.log("WebAssign Searcher it running!!!");

    console.log(localStorage.getItem("qs"));


    // Sites to search
    // 0 = None
    // 1 = Google
    // 2 = Only Yahoo Answers
    // 3 = Only Chegg

    // Default Google
    var sites = 1;


    if (window.location.href.indexOf("practice") !== -1) {
        // PAV Code
    }
    else {

        sites = prompt("What sites would you like to search for answers? \n 0 = Don't Search \n 1 = Google \n 2 = Only Yahoo Answers \n 3 = Only Chegg");


        var q = document.getElementsByClassName("studentQuestionContent");

        var qs = [];

        for (var x = 0; x < q.length; x++) {
            qs[x] = q[x].innerHTML;
            qs[x] = qs[x].replace(/<(?:.|\n)*?>/gm, '');
            qs[x] = qs[x].replace('&nbsp;', '');
            qs[x] = qs[x].trim();
            qs[x] = qs[x].replace(/(^[ \t]*\n)/gm, '');

        }

        // Questions
        console.log(qs);
        localStorage.setItem("qs", qs);

        console.log(sites);
        if (sites === null || sites === "0" || sites !== "1" && sites !== "2" && sites !== "3") {
            console.log("exiting");
        }
        else {
            if (sites === "1") {
                sites = "";
            } else if (sites === "2") {
                sites = " site:answers.yahoo.com";
            } else if (sites === "3") {
                sites = " site:chegg.com";
            }


            console.log("Opening Tabs");

            var google = "https://www.google.com/search?q=";

            for (x = 0; x < qs.length; x++) {

                var url = google + qs[x].split(" ").splice(0, 32).join(" ") + sites;
                console.log(url);

                // Chrome
                var tab = window.open(url, '_blank');

                // Safari

            }
        }


    }


})();

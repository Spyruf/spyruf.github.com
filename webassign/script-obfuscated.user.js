// ==UserScript==
// @name         WebAssign Searcher
// @namespace    http://tampermonkey.net/
// @version      11.2
// @description  Automatically Googles the questions on a WebAssign assingment for you
// @author       Rahul Batra
// @include      http://www.webassign.net/web/Student/Assignment-Responses/*
// @include      http://www.webassign.net/*/student/practice*
// @grant        none

// ==/UserScript==
var _0x550c=['pav','location','practice','Brute\x20Force?\x20Type\x20Yes\x20or\x20No','toUpperCase','getElementsByClassName','studentQuestionContent','length','innerHTML','replace','&nbsp;','Question\x20is:\x20','getElementsByTagName','html','getElementById','value','querySelectorAll','input[type=\x27submit\x27]','click','Could\x20not\x20find\x20answers\x20\x0a\x20You\x20will\x20be\x20prompted\x20to\x20brute\x20force\x20again','found\x20answers','toString','What\x20sites\x20would\x20you\x20like\x20to\x20search\x20for\x20answers?\x20\x0a\x200\x20=\x20Don\x27t\x20Search\x20\x0a\x201\x20=\x20Google\x20\x0a\x202\x20=\x20Only\x20Yahoo\x20Answers\x20\x0a\x203\x20=\x20Only\x20Chegg','trim','\x20site:answers.yahoo.com','\x20site:chegg.com','Opening\x20Tabs','https://www.google.com/search?q=','split','splice','join','open','log','href','WebAssign\x20Searcher\x20it\x20running!!!','getItem','setItem'];(function(_0x2a5237,_0x4c4a2c){var _0x49636b=function(_0x47c6b){while(--_0x47c6b){_0x2a5237['push'](_0x2a5237['shift']());}};_0x49636b(++_0x4c4a2c);}(_0x550c,0x123));var _0x56ae=function(_0x33a658,_0x277f48){_0x33a658=_0x33a658-0x0;var _0x316ffe=_0x550c[_0x33a658];return _0x316ffe;};(function(){'use strict';console[_0x56ae('0x0')]('window.location.href\x20is:\x20'+window['location'][_0x56ae('0x1')]);console['log'](_0x56ae('0x2'));console[_0x56ae('0x0')](localStorage[_0x56ae('0x3')]('qs'));var _0x991246=0x1;if(localStorage[_0x56ae('0x3')]('pav')===null){localStorage[_0x56ae('0x4')](_0x56ae('0x5'),'0');console[_0x56ae('0x0')](localStorage['getItem']('pav'));}if(window[_0x56ae('0x6')]['href']['indexOf'](_0x56ae('0x7'))!==-0x1){if(localStorage[_0x56ae('0x3')](_0x56ae('0x5'))==='0'&&prompt(_0x56ae('0x8'))[_0x56ae('0x9')]()==='NO'){console[_0x56ae('0x0')]('leaving');return;}console['log']('starting');console['log'](localStorage[_0x56ae('0x3')](_0x56ae('0x5')));var _0xd5b662='50';var _0x26d672=document[_0x56ae('0xa')](_0x56ae('0xb'));var _0x5db4b0=[];for(var _0x4283ce=0x0;_0x4283ce<_0x26d672[_0x56ae('0xc')];_0x4283ce++){_0x5db4b0[_0x4283ce]=_0x26d672[_0x4283ce][_0x56ae('0xd')];_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0xe')](/<(?:.|\n)*?>/gm,'');_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0xe')](_0x56ae('0xf'),'');_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce]['trim']();_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0xe')](/(^[ \t]*\n)/gm,'');}console['log'](_0x56ae('0x10')+_0x5db4b0[0x0]);var _0x519dfd=document[_0x56ae('0x11')](_0x56ae('0x12'))[0x0]['innerHTML'];var _0x225616=_0x519dfd['match'](/[A-Z][A-Z]_\d*_\d_\d_\d*/g);var _0x459eb1=0x0;while(_0x459eb1<_0x225616[_0x56ae('0xc')]){document[_0x56ae('0x13')](_0x225616[_0x459eb1])[_0x56ae('0x14')]='12';_0x459eb1+=0x1;}if(document[_0x56ae('0x13')](_0x225616[0x0])[_0x56ae('0x14')]==='12'){document[_0x56ae('0x15')](_0x56ae('0x16'))[0x0][_0x56ae('0x17')]();document[_0x56ae('0x15')](_0x56ae('0x16'))[0x1][_0x56ae('0x17')]();if(localStorage['getItem'](_0x56ae('0x5'))===_0xd5b662){alert(_0x56ae('0x18'));localStorage['setItem'](_0x56ae('0x5'),'0');return;}if(localStorage['getItem']('qs')['indexOf'](_0x5db4b0[0x0])!==-0x1){alert(_0x56ae('0x19'));localStorage[_0x56ae('0x4')](_0x56ae('0x5'),'0');return;}else{console[_0x56ae('0x0')]('Trying\x20again');var _0xfb6e48=parseInt(localStorage[_0x56ae('0x3')](_0x56ae('0x5')))+0x1;localStorage[_0x56ae('0x4')](_0x56ae('0x5'),_0xfb6e48[_0x56ae('0x1a')]());document[_0x56ae('0x15')]('input[type=\x27submit\x27]')[0x2]['click']();}}}else{_0x991246=prompt(_0x56ae('0x1b'));var _0x26d672=document[_0x56ae('0xa')](_0x56ae('0xb'));var _0x5db4b0=[];for(var _0x4283ce=0x0;_0x4283ce<_0x26d672['length'];_0x4283ce++){_0x5db4b0[_0x4283ce]=_0x26d672[_0x4283ce][_0x56ae('0xd')];_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce]['replace'](/<(?:.|\n)*?>/gm,'');_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0xe')](_0x56ae('0xf'),'');_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0x1c')]();_0x5db4b0[_0x4283ce]=_0x5db4b0[_0x4283ce][_0x56ae('0xe')](/(^[ \t]*\n)/gm,'');}console[_0x56ae('0x0')](_0x5db4b0);localStorage[_0x56ae('0x4')]('qs',_0x5db4b0);console[_0x56ae('0x0')](_0x991246);if(_0x991246===null||_0x991246==='0'||_0x991246!=='1'&&_0x991246!=='2'&&_0x991246!=='3'){console[_0x56ae('0x0')]('exiting');}else{if(_0x991246==='1'){_0x991246='';}else if(_0x991246==='2'){_0x991246=_0x56ae('0x1d');}else if(_0x991246==='3'){_0x991246=_0x56ae('0x1e');}console[_0x56ae('0x0')](_0x56ae('0x1f'));var _0x5c877d=_0x56ae('0x20');for(_0x4283ce=0x0;_0x4283ce<_0x5db4b0[_0x56ae('0xc')];_0x4283ce++){var _0x1843b2=_0x5c877d+_0x5db4b0[_0x4283ce][_0x56ae('0x21')]('\x20')[_0x56ae('0x22')](0x0,0x20)[_0x56ae('0x23')]('\x20')+_0x991246;console[_0x56ae('0x0')](_0x1843b2);var _0x2e8759=window[_0x56ae('0x24')](_0x1843b2,'_blank');}}}}());
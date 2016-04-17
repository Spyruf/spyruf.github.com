(function () {

    var x = 5;
    var app = angular.module('UpNext', ['ng-sortable', 'firebase', 'ngRoute']);

    app.controller('UpNextController', ['$scope', '$filter', '$firebaseArray', '$firebaseObject', function ($scope, $filter, $firebaseArray, $firebaseObject) {

        $scope.ab = {
            index: 0,
            isPlaying: false,
            time: 0
        }

        $scope.myText = "";

        //alert('success'); //properly hooked in angular
        $scope.init = function () {

            $scope.link = location.href;

            //shows model or something like that 
            $(document).ready(function () {
                $("#myModal").modal('show');
            });


            SC.initialize({
                client_id: '038edf3f06592aa73098f5fb96b6961c'
            });

            $scope.search = "";
            $scope.results = [];


            var refQ = new Firebase("https://amber-heat-3079.firebaseio.com/" + $scope.uID.toString() + "/array"); //uID/array
            $scope.queue = $firebaseArray(refQ); // firebaseCH


            var refI = new Firebase("https://amber-heat-3079.firebaseio.com/" + $scope.uID.toString() + "/ab"); //uID/ab
            $scope.a = $firebaseObject(refI); //$scope.a is NOT used, instead $scope.ab is used

            //this variable is what is always being changed, since it is binded below it automatically updates with firebase
            $scope.ab = {
                index: 0,
                isPlaying: false,
                time: 0
            }

            $scope.a.$bindTo($scope, 'ab').then(function () {
                if ($scope.ab.index == null) {
                    $scope.ab = {
                        index: 0,
                        isPlaying: false,
                        time: 0
                    }
                }
            });


            //var refD = new Firebase("https://amber-heat-3079.firebaseio.com/testing/display") //uID/display
            //$scope.display = $firebaseObject(refD);
            //if you bind the display to firebase, use $bindTo because ng-sortable assumes a normal array
            //$bindTo does weird things when updating, view Important Note in docs/api

            $scope.display = [];
            $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);


            //when the queue has loaded from firebase, update the display
            $scope.queue.$loaded().then(function () {
                    $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                    $scope.artwork();
                    //$scope.$apply(); //redundent, causes scope digest error 
                })
                .catch(function (err) {
                    console.error(err);
                });



            if ($scope.queue == []) {
                $scope.disabled = true;
            } else {
                $scope.disabled = false;
            }


            $scope.hasInit = false;
            $scope.ab.isPlaying = false;
            $scope.myPlayer;
            $scope.art = "Template.png"

            //--updates display when the queue is changed
            $scope.$watch('queue', function () {
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                $scope.artwork();
            }, true);

            //updates display and artwork when index is changed
            $scope.$watch('ab.index', function () {
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                $scope.artwork();

                //this makes sure the song changes across devices
                if ($scope.ab.isPlaying == true) {
                    $scope.update();
                }

            }, true);

            //updates the  toggle state if isPlaying is changed
            $scope.$watch('ab.isPlaying', function () {

                if ($scope.hasInit == false) {
                    $scope.toggle();
                } else {

                    if ($scope.ab.isPlaying == false) {
                        $scope.pause();
                        $scope.ab.time = $scope.myPlayer.currentTime(); //4-13
                    }
                    if ($scope.ab.isPlaying == true) {
                        //$scope.update();
                        $scope.myPlayer.seek($scope.ab.time); //4-16
                        $scope.myPlayer.play();
                    }

                }

            }, true);

            //            //4-13
            //            $scope.$watch('ab.time', function () {
            //
            //                $scope.fsync = false;
            //
            //                if ($scope.hasInit == true && $scope.myPlayer != null && $scope.ab.time != $scope.myPlayer.currentTime() && $scope.fsync == false) {
            //                    $scope.myPlayer.seek($scope.ab.time + 100); //4-13
            //                    $scope.$apply();
            //                    console.log("syncing");
            //                    $scope.fsync == true;
            //                }
            //
            //            }, true);
            //

        }


        $scope.firstTime = true;
        $scope.hash = location.hash;

        if ($scope.hash.endsWith('UID')) {
            $scope.firstTime = false;
            $scope.uID = $scope.hash.toString().substr(-8);
            $scope.init();
        }

        $scope.newPlay = function () {
            //generate a UID
            $scope.uID = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                $scope.uID += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            $scope.uID += "UID"
            location.hash = $scope.uID;
            $scope.firstTime = false;
            $scope.init();

        }

        $scope.joinPlay = function () {

            if ($scope.playUID != null) {

                $scope.uID = $scope.playUID;
                $scope.uID += "UID"



                $scope.refT = new Firebase("https://amber-heat-3079.firebaseio.com/" + $scope.uID.toString());

                $scope.refT.once("value", function (snapshot) {
                    $scope.valid = snapshot.exists();

                    if ($scope.valid == true) {
                        location.hash = $scope.uID;
                        $scope.firstTime = false;
                        $scope.init();
                    } else {
                        alert("invalid playlist ID");
                    }

                });
            }

        }

        $scope.searchFunc = function () {

            $scope.resultsString = "";
            $scope.results = [];

            if (!$scope.search == "") {
                SC.get('/tracks', {
                    q: $scope.search,
                    limit: 100,
                }).then(function (tracks) {


                    //console.log(tracks);

                    //loop through search results
                    for (var x = 0; x < tracks.length; x++) {

                        //console.log(tracks[x].title + ": " + tracks[x].id + " - " + tracks[x].artwork_url);

                        var track = {}
                        track.title = tracks[x].title;
                        track.id = tracks[x].id;
                        track.artwork = tracks[x].artwork_url;

                        //make sure that only songs with valid track ids are being added to queue
                        if (track.id != null) {
                            $scope.results.push(track);

                        }

                    }

                    $scope.$apply();

                });

            }
        }

        $scope.buttonState = function () {
            // add something here cuz is playing doesnt exist 


            if ($scope.ab.isPlaying == false)
                return "glyphicon glyphicon-play";
            else return "glyphicon glyphicon-pause";
        }

        //called when someone changes the display 
        $scope.queueUpdate = function () {

            //            console.log("queueUpdate function, should only be once");

            //updates the queue to include changes made in display

            //slice ends at but does not inlcude, the end argument -- in other words it adds the current song 
            //$scope.queue = $scope.queue.slice(0, $scope.ab.index + 1).concat($scope.display); // fix this, look below


            //combine the queue upto and including index, with the display
            //firebaseCH

            //removing
            for (var x = $scope.ab.index + 1; x < $scope.queue.length; x++) {
                // remove everything after index from queue
                $scope.queue.$remove(x);
            }


            for (var i = 0; i < $scope.display.length; i++) {
                $scope.queue.$add($scope.display[i]).then(function () {
                    $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                });
            }

            //            for (var i = 0; i < $scope.display.length; i++) {
            //                $scope.queue.push().set({
            //                    artwork: $scope.display[i].artwork,
            //                    id: $scope.display[i].id,
            //                    title: $scope.display[i].title
            //                }).then(function () {
            //                    $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
            //                });
            //            }



        }

        $scope.add = function (track) {

            console.log("you are adding: " + track.title);

            //            var qTrack = {}
            //            qTrack.title = track.title;
            //            qTrack.id = track.id;


            //$scope.queue.push(track);
            //FirebaseCH
            $scope.queue.$add(track).then(function () {
                //updates the displayed queue
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
            });

            //
            //            $scope.queue.push().set({
            //                artwork: $scope.display[i].artwork,
            //                id: $scope.display[i].id,
            //                title: $scope.display[i].title
            //            }).then(function () {
            //                //updates the displayed queue
            //                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
            //            });


            $scope.artwork();
            $scope.disabled = false;

        }

        $scope.remove = function (track) {
            $scope.queue.$remove(track);
        }

        $scope.clear = function () {
            $scope.display = [];
            $scope.queueUpdate();
        }

        $scope.update = function () {

            //update the stream
            SC.stream('tracks/' + $scope.queue[$scope.ab.index].id).then(function (player) {

                if ($scope.myPlayer != null) {
                    $scope.myPlayer.seek(0);
                }


                //check if music is already playing so if needed u can stop the current stream
                if ($scope.ab.isPlaying == true) {
                    $scope.myPlayer.pause(); // pauses the previous stream
                }


                $scope.myPlayer = player; // updates the player


                //only play the song if music was already playing
                if ($scope.ab.isPlaying == true) {

                    $scope.myPlayer.play();
                    $scope.myPlayer.on('finish', function () {
                        $scope.next();
                        console.log("Going to next song");
                        $scope.$apply();
                    });

                    //                    $scope.myPlayer.on('time', function () {
                    //                        $scope.ab.time = $scope.myPlayer.currentTime(); //4-13
                    //                        $scope.$apply();
                    //                        //console.log($scope.myPlayer.currentTime() + " update"); //4-14
                    //                    });

                }

            });

        }

        $scope.prev = function () {

            if ($scope.myPlayer != null && $scope.myPlayer.currentTime() > 1000) {
                $scope.ab.index = $scope.ab.index; // if a song has started, keep the index the same
            } else {
                $scope.ab.index = $scope.ab.index - 1; // if a song hasn't started then go to the previous song
            }

            if ($scope.ab.index < 0) {
                $scope.ab.index = 0; // can't go earlier than the first song
            }

            $scope.update();

            $scope.artwork();
            //updates the displayed queue
            $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);

            $scope.disabled = false;
        }

        $scope.next = function () {


            //$scope.ab.index = $scope.ab.index + 1; // next will always go to the next song
            var exists = true;

            if (($scope.ab.index + 1) >= $scope.queue.length) {

                $scope.ab.index = $scope.queue.length; // can't go farther than the last song

                $scope.myPlayer.pause(); // pauses the previous stream
                $scope.ab.isPlaying = false;
                $scope.myPlayer.seek(0);

                $scope.disabled = true;

                exists = false;
            } else {
                $scope.ab.index = $scope.ab.index + 1;
            }


            if (exists == true) {
                $scope.update();
            }


            $scope.artwork();
            //updates the displayed queue
            $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
        }

        $scope.toggle = function () {

            if ($scope.hasInit == false && ($scope.ab.index < $scope.queue.length)) {

                SC.stream('tracks/' + $scope.queue[$scope.ab.index].id).then(function (player) {
                    $scope.myPlayer = player;
                    $scope.$apply();

                    $scope.myPlayer.seek($scope.ab.time); //4-13

                    $scope.myPlayer.play();

                    $scope.myPlayer.on('finish', function () {
                        $scope.next();
                        console.log("Going to next song");
                        $scope.$apply();
                    });

                    //                    $scope.myPlayer.on('time', function () {
                    //                        $scope.ab.time = $scope.myPlayer.currentTime(); //4-13
                    //                        $scope.$apply();
                    //                        console.log($scope.myPlayer.currentTime() + " toggle"); //4-14
                    //
                    //                    });

                });

                $scope.ab.isPlaying = true;
                $scope.hasInit = true;
                $scope.ab.isPlaying = true;

            } else if ($scope.ab.index != $scope.queue.length != 0) {
                if ($scope.ab.isPlaying == false) {
                    $scope.play();
                } else if ($scope.ab.isPlaying == true) {
                    $scope.pause();
                }
            }

            $scope.artwork();

        }

        $scope.play = function () {

            $scope.myPlayer.seek($scope.ab.time); //4-16

            $scope.myPlayer.play();
            console.log($scope.ab.time);

            $scope.myPlayer.on('finish', function () {
                $scope.next();
                console.log("Going to next song");
                $scope.$apply();
            });

            //            $scope.myPlayer.on('time', function () {
            //                $scope.ab.time = $scope.myPlayer.currentTime(); //4-13
            //                $scope.$apply();
            //                console.log($scope.myPlayer.currentTime() + " play"); //4-14
            //
            //            });

            $scope.ab.isPlaying = true;
        }

        $scope.pause = function () {
            $scope.myPlayer.pause()
            $scope.ab.isPlaying = false;
        }

        $scope.artwork = function () {

            // FirebaseCH
            if ($scope.ab.index < $scope.queue.length && $scope.queue[$scope.ab.index].artwork != null) {
                $scope.art = $scope.queue[$scope.ab.index].artwork.replace("large", "t500x500");
                //console.log("Artwork Update");

            } else {
                $scope.art = "Template.png"
                    //console.log("Artwork Template");

            }
        }

        $scope.copyUID = function () {

            // Create a "hidden" input
            var aux = document.createElement("input");

            // Assign it the value of the specified element
            aux.setAttribute("value", document.getElementById("uID").innerHTML); // main line

            // Append it to the body
            document.body.appendChild(aux);

            // Highlight its content
            aux.select();

            // Copy the highlighted text
            document.execCommand("copy");

            // Remove it from the body
            document.body.removeChild(aux);


        }

        $scope.copyLink = function () {

            // Create a "hidden" input
            var aux = document.createElement("input");

            // Assign it the value of the specified element
            aux.setAttribute("value", $scope.link); // main line

            // Append it to the body
            document.body.appendChild(aux);

            // Highlight its content
            aux.select();

            // Copy the highlighted text
            document.execCommand("copy");

            // Remove it from the body
            document.body.removeChild(aux);


        }





}]);


})();   
(function () {

    //var x = 0;
    var app = angular.module('UpNext', ['ng-sortable', 'firebase', 'ngRoute', 'cfp.hotkeys']);



    app.controller('UpNextController', ['$scope', '$filter', '$firebaseArray', '$firebaseObject', 'hotkeys', function ($scope, $filter, $firebaseArray, $firebaseObject, hotkeys) {



        $scope.ab = {
            index: 0,
            //isPlaying: false,
            //time: 0,
        };

        $scope.cd = {
            //index: 0,
            //isPlaying: false,
            time: 0,
        };



        $scope.userCount = 0;

        $scope.isPlaying = false;
        $scope.myText = "";
        $scope.myPlayer;

        $scope.init = function () {

            //gmusic
            obsessed(8, function () {
                window.gmusic = new window.GMusic(window); // Our Google Music API
                console.log(window.gmusic.volume.getVolume());
                if (failed) {
                    throw new Error('oops');
                }
            });




            //hotkeys  
            hotkeys.add({
                combo: 'space',
                description: 'Play/Pause',
                callback: function (event) {
                    if (document.activeElement.id != "searchInput") {
                        event.preventDefault();
                        $scope.toggle();
                    }
                }
            });

            hotkeys.add({
                combo: 'left',
                description: 'Previous Track',
                callback: function () {
                    if (document.activeElement.id != "searchInput") {
                        $scope.prev();
                    }
                }
            });

            hotkeys.add({
                combo: 'right',
                description: 'Next Track',
                callback: function () {
                    if (document.activeElement.id != "searchInput") {
                        $scope.next();
                    }
                }
            });


            $scope.link = location.href;

            //shows model or something like that 
            $(document).ready(function () {
                $("#myModal").modal('show');
            });


            SC.initialize({
                client_id: 'f3dac0fe0e7d9f71fe2f79ca32f2782e'
            });

            $scope.search = "";
            $scope.results = [];



            var refQ = new Firebase('https://amber-heat-3079.firebaseio.com/' + $scope.uID.toString() + '/array'); //uID/array
            $scope.queue = $firebaseArray(refQ);


            var refI = new Firebase('https://amber-heat-3079.firebaseio.com/' + $scope.uID.toString() + '/ab'); //uID/ab
            $scope.a = $firebaseObject(refI); //$scope.a is NOT used, instead $scope.ab is used

            $scope.a.$bindTo($scope, 'ab').then(function () {
                if ($scope.ab.index == null) {
                    $scope.ab = {
                        index: 0,
                        //isPlaying: false,
                        //time: 0,
                    }
                }
            });

            var refTime = new Firebase('https://amber-heat-3079.firebaseio.com/' + $scope.uID.toString() + '/cd'); //uID/ab
            $scope.c = $firebaseObject(refTime); //$scope.a is NOT used, instead $scope.ab is used

            $scope.c.$bindTo($scope, 'cd').then(function () {
                if ($scope.cd.time == null) {
                    $scope.cd = {
                        //index: 0,
                        //isPlaying: false,
                        time: 0,
                    };
                }
            });

            //--------

            var listRef = new Firebase("https://amber-heat-3079.firebaseio.com/" + $scope.uID.toString() + "/presence/");
            var userRef = listRef.push();

            // Add ourselves to presence list when online.
            var presenceRef = new Firebase("https://amber-heat-3079.firebaseio.com/.info/connected");
            presenceRef.on("value", function (snap) {
                if (snap.val()) {
                    // Remove ourselves when we disconnect.
                    userRef.onDisconnect().remove();

                    userRef.set(true);
                }
            });

            // Number of online users is the number of objects in the presence list.
            listRef.on("value", function (snap) {
                console.log("# of online users = " + snap.numChildren());
                $scope.userCount = snap.numChildren();
                $scope.$apply();
            });
            //--------




            $scope.display = [];
            $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);

            //when the queue has loaded from firebase, update the display
            $scope.queue.$loaded().then(function () {
                    $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                    $scope.artwork();

                    if ($scope.queue.length == 0 || ($scope.ab.index) >= $scope.queue.length) {
                        console.log('disablin');
                        $scope.disabled = true;
                    } else {
                        $scope.disabled = false;
                    }

                })
                .catch(function (err) {
                    console.error(err);
                });



            $scope.hasInit = false;
            $scope.myPlayer;

            $scope.art = "Template.png"

            //--updates display when the queue is changed
            $scope.$watch('queue', function () {
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                $scope.artwork();

                if ($scope.ab.index < $scope.queue.length) {
                    $scope.disabled = false;
                }

            }, true);

            //updates display and artwork when index is changed
            $scope.$watch('ab.index', function () {
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
                $scope.artwork();



                if (($scope.ab.index) >= $scope.queue.length) {
                    console.log('true');
                    $scope.disabled = true;
                    if ($scope.myPlayer != null) {
                        $scope.pause();
                    }
                } else {
                    console.log('false and changing');
                    $scope.disabled = false;
                    //this makes sure the song changes across devices
                    $scope.update();
                }

            }, true);

            SC.stream('/tracks/293').then(function (player) {
                //                player.play();
            });



        }

        $scope.firstTime = true;
        $scope.hash = location.hash;

        if ($scope.hash.endsWith('UID')) {
            $scope.firstTime = false;
            $scope.uID = $scope.hash.toString().substr(-8);
            $scope.init();
        } else {
            $(document).ready(function () {
                $("#myModal2").modal('show');
            });
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

                        //                        console.log(tracks[x].title + ": " + tracks[x].label_id + tracks[x].streamable);

                        var track = {}
                        track.title = tracks[x].title;
                        track.artist = tracks[x].user.username;
                        track.id = tracks[x].id;
                        track.artwork = tracks[x].artwork_url;

                        track.display = track.title + " - " + track.artist;


                        track.streamable = tracks[x].streamable;
                        track.stream_url = tracks[x].stream_url
                        track.embeddable_by = tracks[x].embeddable_by;
                        track.label_id = tracks[x].label_id;

                        //console.log(track.title + ": " + track.streamable + "--" + track.embeddable_by + "--" + track.stream_url);

                        //make sure that only songs with valid track ids are being added to results
                        if (track.streamable == true && track.id != null && track.stream_url != null) {
                            $scope.results.push(track);

                        }

                    }

                    $scope.$apply();

                });

            }


        }

        $scope.buttonState = function () {

            if ($scope.isPlaying == false)
                return "glyphicon glyphicon-play";
            else return "glyphicon glyphicon-pause";
        }

        $scope.queueUpdate = function () {
            //updates the queue to include changes made in display

            //combine the queue upto and including index, with the display

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


        }

        $scope.add = function (track) {

            $scope.queue.$add(track).then(function () {
                //updates the displayed queue
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);
            });

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

        $scope.varInit = true;

        $scope.update = function () {

            //console.log($scope.queue[$scope.ab.index]);




            //update the stream
            SC.stream('tracks/' + $scope.queue[$scope.ab.index].id).then(function (player) {

                if ($scope.myPlayer != null) {
                    $scope.myPlayer.seek(0);
                }


                //check if music is already playing so if needed u can stop the current stream
                if ($scope.isPlaying == true) {
                    $scope.myPlayer.pause(); // pauses the previous stream
                }


                $scope.myPlayer = player; // updates the player
                //console.log("sets the new player");

                //5-30
                if ($scope.ab.index != null && $scope.onIDS != null && $scope.onIDS.indexOf($scope.queue[$scope.ab.index].id) == -1) {

                    $scope.onIDS.push($scope.queue[$scope.ab.index].id);

                    $scope.myPlayer.on('time', function () {
                        $scope.cd.time = $scope.myPlayer.currentTime();
                        $scope.$apply();
                    });


                    $scope.myPlayer.on('finish', function () {
                        console.log("finished");
                        $scope.next();
                        $scope.$apply();
                    });

                }
                //


                //                if ($scope.varInit == true) {
                //                    $scope.myPlayer.on('finish', function () {
                //                        console.log("finished");
                //                        $scope.next();
                //                        $scope.$apply();
                //                    });
                //                    //$scope.varInit = false;
                //                }


                //only play the song if music was already playing
                if ($scope.isPlaying == true) {

                    if ($scope.cd.time != 0) {
                        $scope.myPlayer.seek($scope.cd.time); //4-16
                        $scope.$apply;
                    }

                    //console.log("in the update funct" + $scope.cd.time)

                    $scope.myPlayer.play();
                    //console.log("plays the new song");

                }

            });


        }

        $scope.prev = function () {


            //
            //            if ($scope.myPlayer != null && $scope.myPlayer.currentTime() > 2000 && $scope.queue.length != 0) {
            //                console.log('test');
            //                //                $scope.ab.index = $scope.ab.index; // if a song has started, keep the index the same - don't need to do anything
            //
            //            } else {
            //                var temp = $scope.ab.index;
            //                temp = temp - 1;
            //                $scope.ab.index = temp; // if a song hasn't started then go to the previous song

            $scope.ab.index = $scope.ab.index - 1;
            //console.log("prevving" + $scope.ab.index);


            //            }

            if ($scope.ab.index < 0) {
                $scope.ab.index = 0; // can't go earlier than the first song
            }



            if ($scope.queue[$scope.ab.index] != null) {

                $scope.update(); // 6-7

                $scope.artwork();
                //updates the displayed queue
                $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);

                $scope.disabled = false;

            }





        }

        $scope.next = function () {


            //$scope.ab.index = $scope.ab.index + 1; // next will always go to the next song
            $scope.exists = true;

            if (($scope.ab.index + 1) >= $scope.queue.length) {

                $scope.ab.index = $scope.queue.length; // can't go farther than the last song

                if ($scope.myPlayer != null) {
                    $scope.myPlayer.pause(); // pauses the previous stream
                    $scope.isPlaying = false;
                    $scope.myPlayer.seek(0);
                }


                $scope.disabled = true;

                $scope.exists = false;
            } else {
                //                var temp = $scope.ab.index;
                //                temp = temp + 1;
                //                $scope.ab.index = temp;
                $scope.ab.index = $scope.ab.index + 1;


            }


            //updates the displayed queue
            $scope.display = $filter('limitTo')($scope.queue, $scope.queue.length, $scope.ab.index + 1);

            if ($scope.exists == true) {
                $scope.update();
            }
            //            6-7

            $scope.artwork();





        }

        $scope.toggle = function () {

            if ($scope.hasInit == false && ($scope.ab.index < $scope.queue.length)) {

                SC.stream('tracks/' + $scope.queue[$scope.ab.index].id).then(function (player) {


                    $scope.onIDS = [];
                    $scope.onIDS.push($scope.queue[$scope.ab.index].id);


                    $scope.myPlayer = player;
                    $scope.$apply();

                    $scope.myPlayer.play();
                    $scope.$apply();
                    $scope.myPlayer.pause();


                    //conditionals 

                    $scope.myPlayer.on('time', function () {
                        $scope.cd.time = $scope.myPlayer.currentTime();
                        $scope.$apply();
                    });


                    $scope.myPlayer.on('seeked', function () {
                        console.log("seeked");

                    });

                    setTimeout(function () {
                        //$scope.myPlayer.seek(80000);
                        console.log("setTimeout");

                        if ($scope.cd.time != 0) {
                            console.log($scope.cd.time);
                            $scope.myPlayer.seek($scope.cd.time);
                        } // CHK4

                        $scope.myPlayer.play();


                        $scope.myPlayer.on('finish', function () {
                            console.log("finished");
                            $scope.next();
                            $scope.$apply();
                        });

                    }, 600);


                }).then(function () {

                });

                setTimeout(function () {

                    if ($scope.myPlayer != null) {
                        $scope.myPlayer.play();

                    }

                }, 600);

                $scope.hasInit = true;
                $scope.isPlaying = true;



            } else if ($scope.ab.index != $scope.queue.length != 0) {
                if ($scope.isPlaying == false) {
                    $scope.play();
                } else if ($scope.isPlaying == true) {
                    $scope.pause();
                }
            }

            $scope.artwork();


        }

        $scope.play = function () {


            if ($scope.ab.index + 1 == $scope.queue.length && $scope.exists == false) {

                console.log("cmon");

                $scope.update();
                $scope.exists = true;
            }


            if ($scope.cd.time != 0) {
                console.log($scope.cd.time);
                $scope.myPlayer.seek($scope.cd.time);
            } // CHK4

            $scope.myPlayer.play();


            $scope.isPlaying = true;



        }

        $scope.pause = function () {
            $scope.myPlayer.pause()
            $scope.isPlaying = false;
        }

        $scope.artwork = function () {
            //artwork
            if ($scope.ab.index < $scope.queue.length && $scope.queue[$scope.ab.index].artwork != null) {
                $scope.art = $scope.queue[$scope.ab.index].artwork.replace("large", "t500x500");

            } else {
                $scope.art = "Template.png"
            }
            //title
            if ($scope.ab.index < $scope.queue.length && $scope.queue[$scope.ab.index].title != null) {
                document.title = "UpNext - " + $scope.queue[$scope.ab.index].title;

            } else {
                document.title = "UpNext";
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
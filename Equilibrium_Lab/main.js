app = angular.module('main', []);
app.controller('mainController', function ($scope) {


    $scope.h1 = 42; //height cylinder 1 - more water (mL)
    $scope.h2 = 18;  //height cylinder 2 - less water (mL)

    $scope.s1 = .757; //diameter straw 1 - bigger straw (cm)
    $scope.s2 = .593;  //diameter straw 2 - smaller straw (cm)

    $scope.trials = 3; // number of times it has to be right
    $scope.sigFigs = 3; // number of sigFigs the values have to be equal to

    $scope.h1Array = [];
    $scope.h2Array = [];

    $scope.similar = 0;


    $scope.cycle = function () {
        document.getElementById('output').innerHTML = "";

        while ($scope.similar < $scope.trials) {

            $scope.v1 = Math.PI * Math.pow(($scope.s1 / 2), 2) * $scope.h1; // volume transferred from straw 1 // pi  * r^2 * h (ml  or cm^3)
            $scope.v2 = Math.PI * Math.pow(($scope.s2 / 2), 2) * $scope.h2; // volume transferred from straw 2 // pi  * r^2 * h (ml  or cm^3)

            $scope.h1 = $scope.h1 - $scope.v1 + $scope.v2;
            $scope.h2 = $scope.h2 - $scope.v2 + $scope.v1;

            console.log("Height 1: " + $scope.h1 + " Height 2: " + $scope.h2);

            document.getElementById('output').innerHTML += '<br>' + "Height 1: " + $scope.h1 + " Height 2: " + $scope.h2 + " Volume taken from Straw 1: " + $scope.v1 + " Volume taken from Straw 2: " + $scope.v2;


            if (($scope.h1Array[$scope.h1Array.length - 1] - $scope.h1) < 0.001 && ($scope.h2Array[$scope.h2Array.length - 1] - $scope.h2) < 0.001)
                $scope.similar++;

            $scope.h1Array.push($scope.h1);
            $scope.h2Array.push($scope.h2);
        }

        document.getElementById('output').innerHTML = "Trials needed to reach equilibrium: " + $scope.h1Array.length  + document.getElementById('output').innerHTML;

    }

});
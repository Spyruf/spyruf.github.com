app = angular.module('main', []);
app.controller('mainController', function ($scope) {

    $scope.ctx = document.getElementById("myChart");


    $scope.h1 = 42; //Water level cylinder 1 - more water (mL) //42
    $scope.h2 = 18;  //Water level cylinder 2 - less water (mL) // 18

    $scope.cRadius = 1; //radius of the cylinder = 1 (cm)

    $scope.s1 = .757; //diameter straw 1 - bigger straw (cm)
    $scope.s2 = .593;  //diameter straw 2 - smaller straw (cm)

    $scope.trials = 3; // number of times it has to be right
    $scope.sigFigs = 3; // number of sigFigs the values have to be equal to
    $scope.similar = 0; // number of similar data points so far


    $scope.h1Array = [];
    $scope.h2Array = [];



    $scope.cycle = function () {
        document.getElementById('output').innerHTML = "";

        var x = 0;
        while ($scope.similar < $scope.trials || x > 500) {


            //height of water does not equal water level or volume


            $scope.v1 = Math.PI * Math.pow(($scope.s1 / 2), 2) * ($scope.h1 / Math.PI ); // volume transferred from straw 1 // pi  * r^2 * h (ml  or cm^3)
            $scope.v2 = Math.PI * Math.pow(($scope.s2 / 2), 2) * ($scope.h2 / Math.PI); // volume transferred from straw 2 // pi  * r^2 * h (ml  or cm^3)

            $scope.h1 = $scope.h1 - $scope.v1 + $scope.v2;
            $scope.h2 = $scope.h2 - $scope.v2 + $scope.v1;

            console.log("Level 1: " + $scope.h1 + " Level 2: " + $scope.h2 + " Volume taken from Straw 1: " + $scope.v1 + " Volume taken from Straw 2: " + $scope.v2);

            document.getElementById('output').innerHTML += '<br>' + "Level 1: " + $scope.h1 + " Level 2: " + $scope.h2 + " Volume taken from Straw 1: " + $scope.v1 + " Volume taken from Straw 2: " + $scope.v2;


            if (($scope.h1Array[$scope.h1Array.length - 1] - $scope.h1) < 0.001 && ($scope.h2Array[$scope.h2Array.length - 1] - $scope.h2) < 0.001)
                $scope.similar++;

            $scope.h1Array.push($scope.h1);
            $scope.h2Array.push($scope.h2);

            x++;
            if(x == 500)
                document.getElementById('output').innerHTML = "Exceed 500 iterations, check the input values"

        }

        $scope.labels = [];
        for (var x = 0; x < $scope.h1Array.length; x++) {
            $scope.labels[x] = x + "";
        }

        $scope.lineChart = Chart.Line($scope.ctx, {
            data: {
                labels: $scope.labels,
                datasets: [{
                    label: "Cylinder 1",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    data: $scope.h1Array,
                }, {
                    label: "Cylinder 2",
                    ID: "asdfa",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    data: $scope.h2Array,
                }]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    text: 'Cylinder Volume by Iteration'
                }
            }
        });

        document.getElementById('output').innerHTML = "Trials needed to reach equilibrium: " + ($scope.h1Array.length - 1) + document.getElementById('output').innerHTML;

    }

});
angular
    .module('qna', ['ngAnimate', 'ngAria', 'ngMaterial', 'ngMessages', 'chart.js'])
    .controller('AppCtrl', function ($scope, $http, $mdDialog) {
        $scope.status = '  ';
        $scope.customFullscreen = false;
        $scope.answered = 0;
        $scope.graph = false;

        $http.get('./data.json').success(function (data) {
            $scope.qna = data;
            angular.forEach($scope.qna, function (item, key) {
                item.correctAnswer = false;
            });
        });

        $scope.submit = function () {
            $scope.answered = 0;
            $scope.data[0][0] = 0;
            //$scope.data[0][1] = $scope.qna.length;
            angular.forEach($scope.qna, function (item) {
                if (item.hasOwnProperty("selectedAnswer")) {
                    item.correctAnswer = (item.selectedAnswer == item.answer);
                    $scope.answered += 1;
                    $scope.data[0][0] += (item.selectedAnswer == item.answer);
                    $scope.data[0][1] -= (item.selectedAnswer == item.answer);
                }
            });
            if ($scope.answered == 10) {
                $scope.graph = true;
            }
        };

        $scope.resetForm = function () {
            $scope.answered = 0;
            $scope.data[0][0] = 0;
            $scope.data[0][1] = $scope.qna.length;
            $scope.graph = false;
            angular.forEach($scope.qna, function (item) {
                if (item.hasOwnProperty("selectedAnswer")) {
                    delete item.selectedAnswer;
                }
            });

        };

        //Graph data
        $scope.labels = ['Correct', 'Incorrect'];
        $scope.series = ['Answers'];

        $scope.data = [
            [0, 5]
        ];
        $scope.chartOptions = {
            legend: {
                display: true
            },
            scales: {
                yAxes: [{
                    id: 'y-axis-1',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        min: 0,
                        max: 10
                    }
                }]
            }
        };
    })
'use strict';

angular.module('projectApp', ['chartjs-directive'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
   })
// .controller('InfoboxCtrl', function($scope, $http) {
//     $scope.destdata = {};
//     $scope.loaddata = function() {

//       $http.get('/getdestdata').success(function(data, status, headers, config) {
//         $scope.destdata = data;
//       }).error(function() {
//         console.log('failed to get data');
//       });
//     };
//     $scope.expand = function(input) {
//       $scope.destdivstyle = {
//         left:'10%',
//         width:'700px',
//         height:'500px',
//       };
//       $scope.chardivstyle = {
//         visibility:'visible',
//         display:'block',
//       };
//       $scope.MyChart = {
//       width : 200,
//       height : 200,
//       options : {},
//       data : [
//       {
//         value: 30,
//         color:"#F7464A"
//       },
//       {
//         value : 50,
//         color : "#E2EAE9"
//       },
//       {
//         value : 100,
//         color : "#D4CCC5"
//       },
//       {
//         value : 40,
//         color : "#949FB1"
//       },
//       {
//         value : 120,
//         color : "#4D5360"
//       }

//       ]
//     };
//       // var data = {};
//       // data['url'] = input;

//       // $http({
//       //   url: '/links',
//       //   method: "POST",
//       //   data: JSON.stringify(data),
//       //   headers: {'Content-Type': 'application'}
//       // });
//     };
// });

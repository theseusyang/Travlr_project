'use strict';

angular.module('projectApp')
  .controller('MainCtrl', function ($scope, $http) {
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    var expanded = false;
    var searchbarout = false;
    var gotcities = false;
    var inexploremode = false;
    var exploredeck = [];
    var index_deck = 1;
    var decklength = 10;
    var deflate = function() {
      if (expanded) {
        $('.destnamediv').animate({
          width: '500px',
          height: '100px',
          'margin-left':'-250px',
          }, 200);
      }
      expanded = false;
    };

    var searchbardisplay = function(display) {
      if (!display && searchbarout) {
        $('.searchbardiv').animate({
          width:'0px',
          left:'80%',
          'opacity':'0',
        }, 300);
        $('.destnamediv').animate({
            top:'20%',
          }, 200);
          searchbarout = false;
      } else if (display && !searchbarout) {
        $('.destnamediv').animate({
            top:'30%',
          }, 200);
        $('.searchbardiv').animate({
          width:'490px',
          left:'50%',
          'opacity':'1',
        }, 300);
          searchbarout = true;        
      }
    };

    var searchlistuldisplay = function(display) {
      if (!display) {
        $(".searchlistul").animate({
          height:'0'
        },200);
      } else {
        $(".searchlistul").animate({
          height:'300px'
        },200);
        $(".searchbardiv").css('z-index','4500');
      }
    };

    var getexploredeck = function() {
      $http.get('/getexploredeck',{
          params: {
            searchterm: $scope.searchterm, 
            limit: decklength
          }
        }).success(function(data, status, headers, config) {
          exploredeck = data;
          console.log(data);    
          $scope.destdata = data[0];
        }).error(function() {
          console.log('failed to get data');
        });
        index_deck = 1;
        $scope.searchterm = '';
    };

    $scope.loaddata = function() {
      $scope.searchterm = '';
      searchlistuldisplay(false);
      var today = new Date();
      $scope.currentmonth = today.getMonth();
      $scope.currentmonthname = monthNames[today.getMonth()];

      $http.get('/getdestdata').success(function(data, status, headers, config) {
        $scope.destdata = data;
      }).error(function() {
        console.log('failed to get dest data');
      });
      deflate();
      searchbardisplay(false);
    };

    $scope.destdata = {};
    $scope.fetchcitieslist = function() {
      if (!gotcities) {
        gotcities = true;
        $http.get('/getcitieslist').success(function(data, status, headers, config) {
          $scope.citieslist = data;
        }).error(function() {
          console.log('failed to get citieslist data');
        });
      }
    };

    $scope.clicknext = function() {
      if (!inexploremode || ($scope.searchterm === '')) {
        $scope.loaddata();
      } 
      else {
        $scope.searchterm = '';
        searchlistuldisplay(false);
        if (index_deck >= decklength) {
          index_deck = 0;
        }
        $scope.destdata = exploredeck[index_deck++]
      } 
    }

    $scope.expand = function() {
      if (!expanded) {
        $('.destnamediv').animate({
          width:'700px',
          height:'500px',
          'margin-left':'-350px',
        }, 200);
        expanded = true;
        
        searchbardisplay(false);
      } 
      else {
        deflate();
      }
    };
    $scope.mouseenternext = function() {
      $('.containnextdiv').animate({
        width:'120px',
        'opacity':'0.8',
        left:'80%',

      }, 300);
    };
    $scope.mouseleavenext = function() {
      $('.containnextdiv').animate({
        width:'100px',
        left:'80%',
        'opacity':'0.2',
      }, 300);
    };
    $scope.grabsearchbar = function() {
      if (inexploremode) {
        $scope.exitexplore();
      }
      searchbardisplay(true);
    };

    $scope.searchforterm = function() {
        $http.get('/searchresult',{
          params: {searchterm: $scope.searchterm}
        }).success(function(data, status, headers, config) {
          $scope.destdata = data;

        }).error(function() {
          console.log('failed to get data');
        });
        $scope.searchterm = '';
    };

    $scope.searchinputchange = function() {
      if ($scope.searchterm.length > 0) {
        searchlistuldisplay(true);
        // console.log($scope.searchterm);
      } else if ($scope.searchterm.length < 1) {
        searchlistuldisplay(false);
      }
    }
    $scope.searchtermclicked = function(city) {
      $scope.searchterm = city;
      searchbardisplay(false);
      searchlistuldisplay(false);
      if (!inexploremode) { //search direct for input term if not in exploremode
        $scope.searchforterm();
      } else {
        getexploredeck()
      }
    };
    $scope.enterexplore = function() {
      if (!inexploremode) {
        // $scope.grabsearchbar();
        if (searchbarout) {
          searchbardisplay(false);
          searchbardisplay(true);
        } else {
          searchbardisplay(true);
        }
        inexploremode = true;
      } 
      else {
        searchbardisplay(true);
      }
    };
    $scope.exitexplore = function() {
      inexploremode = false;
      searchbardisplay(false);
    };

  });

angular.module('app', [])
  .factory('generatorService', function($http) {
    var service = {};

    var i = 0;
    service.naive = function() {
      return $http.get('/naive?r=' + i++).then(function(result) {
        return result.data;
      });
    };

    service.markov = function() {
      return $http.get('/markov?r=' + i++).then(function(result) {
        return result.data;
      });
    };

    service.everything = function(seed) {
      return $http.get('/everything/' + seed + '?r=' + i++).then(function(result) {
        return result.data;
      });
    };

    service.everythingV2 = function(seed) {
      return $http.get('/everythingV2/' + seed + '?r=' + i++).then(function(result) {
        return result.data;
      });
    };


    return service;
  })
  .directive('haikus', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        haikus: '=haikuData'
      },
      templateUrl: 'partials/haikus.html'
    }
  })
  .controller('GeneratorController', function($scope, $q, generatorService) {
    $scope.naiveHaikus = [];
    $scope.markovHaikus = [];
    $scope.everythingHaikus = [];
    $scope.everythingV2Haikus = [];
    $scope.everythingInput = '';

    var cleaner = function(result) {
      var lines = result.trim().slice(1, -1).toLowerCase().split('\\n');
      return lines;
    };

    var spammer = function(requester) {
      return function(seeds) {
        return $q.all([
          requester(seeds),
          requester(seeds),
          requester(seeds)
        ]).then(function(result) {
          return result.map(function(element) {
            return cleaner(element);
          });
        });
      }
    }

    var naiveSpammer = spammer(generatorService.naive);
    var markovSpammer = spammer(generatorService.markov);
    var everythingSpammer = spammer(generatorService.everything);
    var everythingV2Spammer = spammer(generatorService.everythingV2);

    $scope.naive = function() {
      naiveSpammer().then(function(result) {
        $scope.naiveHaikus = result;
      });
    };

    $scope.markov = function() {
      markovSpammer().then(function(result) {
        $scope.markovHaikus = result;
      });
    };

    $scope.everything = function(seed) {
      everythingSpammer(seed).then(function(result) {
        $scope.everythingHaikus = result;
      });
    };

    $scope.everythingV2 = function(seed) {
      everythingV2Spammer(seed).then(function(result) {
        $scope.everythingV2Haikus = result;
      });
    };
  })

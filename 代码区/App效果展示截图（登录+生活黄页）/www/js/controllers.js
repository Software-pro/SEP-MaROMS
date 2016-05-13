angular.module('starter.controllers',[])

.controller("state3Ctrl",function($scope,$state) {
  $scope.go= function(state) {
   $state.go(state);
  };
})

.controller("state31Ctrl",function($scope,phones) {
	$scope.Phones = phones.all(); 
})
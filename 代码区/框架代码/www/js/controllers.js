angular.module('starter.controllers',[])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

// .controller("state3Ctrl",function($scope,$state) {
//   $scope.go= function(state) {
//    $state.go(state);
//   };
// })

.controller("contactsCtrl",function($scope,phones) {
	$scope.Phones = phones.all(); 
})

.controller('ViewFormsCtrl', function($scope,Forms) {
	$scope.forms = Forms.all();

	$scope.doRefresh = function() {
    //刷新--重新从后台载入数据
    $scope.$broadcast("scroll.refreshComplete");
  };
})

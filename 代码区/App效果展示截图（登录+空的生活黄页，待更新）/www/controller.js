angular.module('ezApp',['ionic'])
.config(function($stateProvider){
	//配置状态机的各个状态
	$stateProvider
		.state("page5",{templateUrl:"page5.html"});
})
.controller("ezCtrl",function($scope,$state){
	//根据参数切换到指定的状态
	$scope.go = function(state){
		$state.go('page5');
	};
})
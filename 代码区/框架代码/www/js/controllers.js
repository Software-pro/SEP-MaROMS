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

.controller('ViewFormsCtrl', function($scope,Forms, $state) {
	$scope.forms = Forms.all();

	$scope.doRefresh = function() {
    //刷新--重新从后台载入数据
    $scope.$broadcast("scroll.refreshComplete");
  	};

  	$scope.newFormClicked = function(){
  		alert("hello");
  		$state.go('app.viewForms-newForm');
  	}
  	$scope.menu1Var = true;
  	$scope.menu2Var = true;
  	
  	$scope.menu1Content = '全部 ';
  	$scope.menu2Content = '按创建时间 ';
  	$scope.menu3Content = '降序 ';
  	$scope.menu3Icon = 'ion-ios-arrow-thin-down';
  	$scope.menu1 = function() {
      $scope.menu2Var = true;
      $scope.menu2Color = '#FFFFFF';

  		$scope.menu1Var = !$scope.menu1Var;
  		if ($scope.menu1Var == false) {
  			$scope.menu1Color = '#FAFAFA';
  		}
  		else {
  			$scope.menu1Color = '#FFFFFF';
  		}
  	};
  	$scope.menu2 = function() {
      $scope.menu1Var = true;
      $scope.menu1Color = '#FFFFFF';

  		$scope.menu2Var = !$scope.menu2Var;
  		if ($scope.menu2Var == false) {
  			$scope.menu2Color = '#FAFAFA';
  		}
  		else {
  			$scope.menu2Color = '#FFFFFF';
  		}
  	};
  	$scope.menu3 = function() {
      $scope.menu1Var = true;
      $scope.menu1Color = '#FFFFFF';
      $scope.menu2Var = true;
      $scope.menu2Color = '#FFFFFF';

  		if ($scope.menu3Content == '降序 ') {
  			$scope.menu3Content = '升序 ';
  			$scope.menu3Icon = 'ion-ios-arrow-thin-up';
  		}
  		else {
  			$scope.menu3Content = '降序 ';
  			$scope.menu3Icon = 'ion-ios-arrow-thin-down';
  		}
  	};

  	$scope.chooseAll = function() {
  		$scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '全部 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.chooseUnordered = function() {
  		$scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '未接单 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.chooseOrdered = function() {
  		$scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已接单 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.chooseAccomplished = function() {
  		$scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已完成 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.chooseChecked = function() {
  		$scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已审核 ';
  		/**TODO: 后台排序，更新forms**/
  	};

  	$scope.sortByCreateTime = function() {
  		$scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按创建时间 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.sortByOrderTime = function() {
  		$scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按接单时间 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.sortByAccomplishTime = function() {
  		$scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按完成时间 ';
  		/**TODO: 后台排序，更新forms**/
  	};
  	$scope.sortByCheckTime = function() {
  		$scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按审核时间 ';
  		/**TODO: 后台排序，更新forms**/
  	};
})

.controller("myCtrl",function($scope,Informations) {
	$scope.informations = Informations.all(); 
})

.controller("messageCtrl",function($scope,Message_infos) {
	$scope.message_infos = Message_infos.all(); 
})

.controller("newFormCtrl",function() {
	
})
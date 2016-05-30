angular.module('starter.controllers',[])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

// .controller("state3Ctrl",function($scope,$state) {
//   $scope.go= function(state) {
//    $state.go(state);
//   };
// })

 .controller("contactsCtrl",function($scope,/* $stateParams, */Phones) {
//	var content = document.getElementById("searchphone");
  $scope.phones = Phones.all();
  $scope.searchornot = false;
   $scope.search = function() {
      // var temp = Phones.searchphone($scope.searchcontent);
       //if(temp != null)
       //  $scope.phones = temp;
        $scope.searchornot = true;
        $scope.phones = Phones.searchphone($scope.searchcontent);
        if($scope.phones === null)
        {  $scope.searchornot = false;
        }
     };

  $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.searchornot = false;
      $scope.$broadcast("scroll.refreshComplete"); 
      $scope.phones = Phones.all();
    };
 
  //$scope.contentshow = content;
  
})

.controller('ViewFormsCtrl', function($scope,Forms, $state, $location) {
    $scope.forms = Forms.all();

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.$broadcast("scroll.refreshComplete");     
  	};


    // $scope.clickmenu = function() {
    //   alert("oooo");
    // }
     // $ionicPopover.fromTemplateUrl('menu1.html', {
     //        scope: $scope
     //      }).then(function(popover) {
     //        $scope.popover = popover;
     //      });


    $scope.menu1Var = true;
    $scope.menu2Var = true;
    
    $scope.menu1Content = '全部 ';
    $scope.menu2Content = '按创建时间 ';
    $scope.menu3Content = '降序 ';
    $scope.menu3Icon = 'ion-ios-arrow-thin-down';

  	$scope.newFormClicked = function(){
      if (($scope.menu1Var == true) && ($scope.menu2Var == true)) {
        $state.go('app.viewForms-newForm');
      }
      else {
        $scope.menu1Var = true;
        $scope.menu2Var = true;
        $scope.menu1Color = '#FFFFFF';
        $scope.menu2Color = '#FFFFFF';
      }
  	};

    $scope.itemClicked = function(formId) {
      if (($scope.menu1Var == true) && ($scope.menu2Var == true)) {
        $location.path("app/viewForms/" + formId);
      }
      else {
        $scope.menu1Var = true;
        $scope.menu2Var = true;
        $scope.menu1Color = '#FFFFFF';
        $scope.menu2Color = '#FFFFFF';
      }
      
    }

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

      //$scope.popover.show();
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

.controller("myCtrl",function($scope,PersonalInformation) {
	$scope.information = PersonalInformation.get(); 
})

.controller("messageCtrl",function($scope,Message_infos) {
	$scope.message_infos = Message_infos.all(); 
})

.controller("formDetailCtrl",function($scope, $stateParams, Forms) {
  $scope.form = Forms.get($stateParams.formId);
  //$state.go('app.contact.view');
})

.controller("contactdetailCtrl",function($scope, $stateParams,Phones) {
  $scope.person = Phones.get($stateParams.personId);
})

.controller("newFormCtrl",function($scope,$state) {
	$scope.saveNewForm = function(){
		alert("Add a new form!");
		$state.go('app.viewForms');
	}
	$scope.cancelNewForm = function(){
		$state.go('app.viewForms');
	}
});

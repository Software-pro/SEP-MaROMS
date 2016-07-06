angular.module('starter.controllers',['ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

// .controller("state3Ctrl",function($scope,$state) {
//   $scope.go= function(state) {
//    $state.go(state);
//   };
// })

 .controller("contactsCtrl",function($scope, Users) {
//  var content = document.getElementById("searchphone");
  $scope.users = Users.all();

  var users = $scope.users;

  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $scope.alphabet = iterateAlphabet();
  var tmp = {};
  for(var i = 0; i < str.length; i++)
  {
    var nextChar = str.charAt(i);
    $scope.alphabet.push(nextChar);
    tmp[nextChar] = [];
  }


  //Sort user list by first letter of name
  for(i = 0; i < users.length; i++){
    var letter=users[i].name.toUpperCase().charAt(0);
    tmp[letter].push( users[i] );
  }
  $scope.sorted_users = tmp;

  //Click letter event
  $scope.gotoList = function(id){
    $location.hash(id);
    $ionicScrollDelegate.anchorScroll();
  }

  //Create alphabet object
  function iterateAlphabet()
  {
     var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     var numbers = new Array();
     for(var i = 0; i < str.length; i++)
     {
        var nextChar = str.charAt(i);
        numbers.push(nextChar);
     }
     return numbers;
  }


  $scope.groups = [];


  for (var i = 0; i < 10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }
  
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };







  // $scope.searchornot = false;
  //  $scope.search = function() {
  //     // var temp = Phones.searchphone($scope.searchcontent);
  //      //if(temp != null)
  //      //  $scope.phones = temp;
  //       $scope.searchornot = true;
  //       $scope.phones = Phones.searchphone($scope.searchcontent);
  //       if($scope.phones === null)
  //       {  $scope.searchornot = false;
  //       }
  //    };

  // $scope.doRefresh = function() {
  //     //刷新--重新从后台载入数据
  //     $scope.searchornot = false;
  //     $scope.$broadcast("scroll.refreshComplete"); 
  //     $scope.phones = Phones.all();
  //   };
 
  //$scope.contentshow = content;
  
})

.controller('ViewFormsCtrl', function($scope, Forms, $state, $location) {
    $scope.forms = Forms.setTime("creatTime");
   // $scope.forms = Forms.all();

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.forms = Forms.all();
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
    $scope.order = 'creatTime';
    $scope.timeLabel = '创建时间：';

    $scope.menu1Var = true;
    $scope.menu2Var = true;
    
    $scope.menu1Content = '全部 ';
    $scope.menu2Content = '按创建时间 ';
    $scope.menu3Content = '降序 ';
    $scope.menu3Icon = 'ion-ios-arrow-thin-down';

    $scope.menu2Disabled2 = false;
    $scope.menu2Disabled3 = false;
    $scope.menu2Disabled4 = false;

    $scope.hideCancel = true;
    $scope.searchcontent = '';

    $scope.searchClick = function() {
        $scope.hideCancel = false;
    };
    $scope.searchCancel = function() {
        $scope.hideCancel = true;
        $scope.searchcontent = '';
        $scope.menu1Content = '全部 ';
        $scope.menu2Content = '按创建时间 ';
        $scope.menu3Content = '降序 ';
        $scope.menu3Icon = 'ion-ios-arrow-thin-down';
    };

    $scope.searchFilter = function(item) {
      if ($scope.menu1Content === '全部 ' || $scope.menu1Content.indexOf(item.status)>=0) {
        if ($scope.searchcontent === '') return true;
        else return item.engineerName.indexOf($scope.searchcontent)>=0 || item.salesName.indexOf($scope.searchcontent)>=0;
      }
      return false;
    };


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
      
    };

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
        $scope.order = '-creatTime';
        $scope.menu3Content = '升序 ';
        $scope.menu3Icon = 'ion-ios-arrow-thin-up';

      }
      else {
        $scope.order = 'creatTime';
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

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = false;
      /**TODO: 后台排序，更新forms**/

    };
    $scope.chooseUnordered = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '未接单 ';

      $scope.menu2Disabled2 = true;
      $scope.menu2Disabled3 = true;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    };
    $scope.chooseOrdered = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已接单 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = true;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    };
    $scope.chooseAccomplished = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已完成 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    };
    $scope.chooseChecked = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已审核 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = false;
      /**TODO: 后台排序，更新forms**/
    };

    $scope.sortByCreateTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按创建时间 ';
      $scope.forms = Forms.setTime("creatTime");
      $scope.timeLabel = '创建时间：';
      /**TODO: 后台排序，更新forms**/
    };
    $scope.sortByOrderTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按接单时间 ';
      $scope.forms = Forms.setTime("orderTakeTime");
      $scope.timeLabel = '接单时间：';
      /**TODO: 后台排序，更新forms**/
    };
    $scope.sortByAccomplishTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按完成时间 ';
      $scope.forms = Forms.setTime("finishTime");
      $scope.timeLabel = '完成时间：';
      /**TODO: 后台排序，更新forms**/
    };
    $scope.sortByCheckTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按审核时间 ';
      $scope.forms = Forms.setTime("auditTime");
      $scope.timeLabel = '审核时间：';
      /**TODO: 后台排序，更新forms**/
    };
})

.controller("myCtrl",function($scope,$state,$ionicPopup, $ionicActionSheet, $timeout, MyInformation) {
  $scope.myinformation = MyInformation.get(); 
  $scope.data={}
  $scope.editphonenum = function() {
    $ionicPopup.show({
      template: "<input type = 'phonenum' ng-model='data.phonenum'>",
      title:"请输入新的电话号码",
      scope: $scope,
      buttons: [
        {
            text: "取消" ,
        },
        {
            text: "<b>保存</b>",
            type: "button-positive",
            onTap: function(e) {
              $scope.myinformation.phonenum = $scope.data.phonenum;
              return $scope.myinformation.phonenum;
            }
        }
      ]
    })
  }
  $scope.editphoto = function() {
    var hideSheet = $ionicActionSheet.show({
        titleText: "上传新头像",
        buttons: [
          {text: "拍照"},
          {text: "从相册中选择"}
        ],
        buttonClicked: function(index) {
          return true;
        },
        cancelText: "取消",
        cancel: function() {         
        }
    })
  }
  $scope.exit = function(){
    alert("haha");
    $state.go('/');
  }
})

.controller("messageCtrl",function($scope,Message_infos) {
  $scope.message_infos = Message_infos.all(); 
})

.controller("formDetailCtrl",function($scope, $stateParams, Forms) {
  $scope.form = Forms.get($stateParams.formId);
  // TODO:get form by 'http'
  $scope.editClick = function() {
    Forms.currentId = $stateParams.formId;
  }
})
.controller("editFormCtrl",function($scope,$state,Forms,MyInformation,PersonalInformations) {
 $scope.form = Forms.get(Forms.currentId);
 $scope.myinformation = MyInformation.get();
 $scope.engineers = PersonalInformations.all_engineer();
  $scope.salesmans = PersonalInformations.all_salesman();
  $scope.distributers = PersonalInformations.all_distributer();
  $scope.deleteForm = function(){
    alert("Delete this form!");
    $state.go('app.viewForms');
  }
  $scope.submitForm = function(){
    alert("订单已完成!");
    $state.go('app.viewForms');
  }
  $scope.cancelOrderTaking = function(){
    alert("取消接单!");
    $state.go('app.viewForms');
  }
  $scope.reviewForm = function(){
    alert("订单已审核!");
    $state.go('app.viewForms');
  }
   $scope.takeForm = function(){
    alert("已经接单");
    $state.go('app.viewForms');
  }
})
.controller("messageDetailCtrl", function($scope, $stateParams, Message_infos) {
  $scope.message_info = Message_infos.get($stateParams.message_infoId);
})
.controller("myDetailCtrl", function($scope,  MyInformation) {
  $scope.myinformation = MyInformation.get();
})
.controller("markCtrl", function($scope, MarkChanges) {
  $scope.markChanges = MarkChanges.all();
})
.controller("contactdetailCtrl",function($scope, $stateParams, Users, MyInformation, $location) {
  $scope.person = Users.get($stateParams.id);
  $scope.myinformation = MyInformation.get();

  $scope.personalFormClicked = function() {
    $location.path("app/detail-personalForms/" + $stateParams.personId);
  }

})

.controller("newFormCtrl",function($scope,$state, PersonalInformations) {
	$scope.engineers = PersonalInformations.all_engineer();
  $scope.salesmans = PersonalInformations.all_salesman();
  $scope.distributers = PersonalInformations.all_distributer();
  $scope.saveNewForm = function(){
		alert("Add a new form!");
		$state.go('app.viewForms');
	}
	$scope.cancelNewForm = function(){
    var tmp = document.getElementsByTagName("input");
    for(var i = 0; i < tmp.length; i ++){
      tmp[i].value = "";
    }
		//$state.go('app.viewForms');
	}
})

.controller("LoginCtrl",function($scope,$state) {
  
})
.controller("passwordModifyCtrl",function($scope,$state){
  $scope.goback = function(){
    $state.go('app.my');
  }
  $scope.ensure = function(){
      $state.go('app.my');
      return;
    var success = 1;//success=1说明修改密码成功。
    var prev = document.getElementById("old-password");
    var after1 = document.getElementById("new-password1");
    var after2 = document.getElementById("new-password2");
   
    if(prev.value.length == 0 || after1.value.length == 0 || after2.value.length == 0){
      alert("密码不能为空！");
      return;
    }
    if(prev.value != "123456"){
      alert("原密码不正确！");
      return;
    }
    if(after1.value != after2.value){
      alert("两次新密码不一致！");
      return;
    }

    if(success == 1){
      alert("密码修改成功！");
      //这里需要与数据库交互，更新密码

      $state.go('app.my');
    }
  }
})
.controller("passwordForgetCtrl",function($scope,$state){
  $scope.goback = function(){
    $state.go('login');
  }
  $scope.ensure = function(){
    alert("申请提交成功，请等待管理员联系");
    $state.go('login');
  }
})

.controller('PersonalFormsCtrl', function($scope, $stateParams, PersonalForms, $state, $location) {
    $scope.forms = PersonalForms.setTime("creatTime");
   // 后台搭建完成后通过 'http + $stateParams.personId' 获取数据

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.forms = PersonalForms.all();
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
    $scope.order = 'creatTime';
    $scope.timeLabel = '创建时间：';

    $scope.menu1Var = true;
    $scope.menu2Var = true;
    
    $scope.menu1Content = '全部 ';
    $scope.menu2Content = '按创建时间 ';
    $scope.menu3Content = '降序 ';
    $scope.menu3Icon = 'ion-ios-arrow-thin-down';

    $scope.menu2Disabled2 = false;
    $scope.menu2Disabled3 = false;
    $scope.menu2Disabled4 = false;

    $scope.hideCancel = true;
    $scope.searchcontent = '';

    $scope.searchClick = function() {
        $scope.hideCancel = false;
    }
    $scope.searchCancel = function() {
        $scope.hideCancel = true;
        $scope.searchcontent = '';
        $scope.menu1Content = '全部 ';
        $scope.menu2Content = '按创建时间 ';
        $scope.menu3Content = '降序 ';
        $scope.menu3Icon = 'ion-ios-arrow-thin-down';
    }

    $scope.searchFilter = function(item) {
      if ($scope.menu1Content === '全部 ' || $scope.menu1Content.indexOf(item.status)>=0) {
        if ($scope.searchcontent === '') return true;
        else return item.engineerName.indexOf($scope.searchcontent)>=0 || item.salesName.indexOf($scope.searchcontent)>=0;
      }
      return false;
    }

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
    }
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
    }
    $scope.menu3 = function() {
      $scope.menu1Var = true;
      $scope.menu1Color = '#FFFFFF';
      $scope.menu2Var = true;
      $scope.menu2Color = '#FFFFFF';

      if ($scope.menu3Content == '降序 ') {
        $scope.order = '-creatTime';
        $scope.menu3Content = '升序 ';
        $scope.menu3Icon = 'ion-ios-arrow-thin-up';

      }
      else {
        $scope.order = 'creatTime';
        $scope.menu3Content = '降序 ';
        $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      }
    }

    $scope.chooseAll = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '全部 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = false;
      /**TODO: 后台排序，更新forms**/
      
    }
    $scope.chooseUnordered = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '未接单 ';

      $scope.menu2Disabled2 = true;
      $scope.menu2Disabled3 = true;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    }
    $scope.chooseOrdered = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已接单 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = true;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    }
    $scope.chooseAccomplished = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已完成 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = true;
      /**TODO: 后台排序，更新forms**/
    }
    $scope.chooseChecked = function() {
      $scope.menu1Var = true;
      $scope.menu2Content = '按创建时间 ';
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu1Color = '#FFFFFF';

      $scope.menu1Content = '已审核 ';

      $scope.menu2Disabled2 = false;
      $scope.menu2Disabled3 = false;
      $scope.menu2Disabled4 = false;
      /**TODO: 后台排序，更新forms**/
    }

    $scope.sortByCreateTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按创建时间 ';
      $scope.forms = PersonalForms.setTime("creatTime");
      $scope.timeLabel = '创建时间：';
      /**TODO: 后台排序，更新forms**/
    }
    $scope.sortByOrderTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按接单时间 ';
      $scope.forms = PersonalForms.setTime("orderTakeTime");
      $scope.timeLabel = '接单时间：';
      /**TODO: 后台排序，更新forms**/
    }
    $scope.sortByAccomplishTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按完成时间 ';
      $scope.forms = PersonalForms.setTime("finishTime");
      $scope.timeLabel = '完成时间：';
      /**TODO: 后台排序，更新forms**/
    }
    $scope.sortByCheckTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按审核时间 ';
      $scope.forms = PersonalForms.setTime("auditTime");
      $scope.timeLabel = '审核时间：';
      /**TODO: 后台排序，更新forms**/
    }
})



;

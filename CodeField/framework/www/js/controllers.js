angular.module('starter.controllers',['ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,Message_infos) {
  $scope.count = Message_infos.getUnreadCount();
})

 .controller("contactsCtrl",function($scope, $state, PersonalInformations, $location, $ionicScrollDelegate,$http) {
//  var content = document.getElementById("searchphone");
  $scope.users=[];
  var users;
  PersonalInformations.all(function(response){
    $scope.users=response;

     users = $scope.users;
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $scope.alphabet = iterateAlphabet();
    var tmp = {};
    for(var i = 0; i < str.length; i++)
    {
      var nextChar = str.charAt(i);
      tmp[nextChar] = [];
    }

    //Sort user list by first letter of name
    for(i = 0; i < users.length; i++){
      var letter=users[i].name.toUpperCase().charAt(0);
      tmp[letter].push( users[i] );
    }
    $scope.sorted_users = tmp;

  }); 
  //$scope.users = PersonalInformations.all();
   

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


    $scope.hideCancel = true;
    $scope.searchcontent = '';

  $scope.searchClick = function() {
      $scope.hideCancel = false;
  };
  $scope.searchCancel = function() {
      $scope.hideCancel = true;
      $scope.searchcontent = '';
  };

  $scope.searchFilter = function(user) {
        if ($scope.searchcontent === '') return false;
        else return user.name.indexOf($scope.searchcontent)>=0;
    };

  $scope.newtactsClicked = function() {
    $state.go('app.contacts-newtacts');
  }

  $scope.searchContentChange = function() {
    $location.hash("contactsHeader");
    $ionicScrollDelegate.anchorScroll();
  }
})

.controller('ViewFormsCtrl', function($scope, Forms, $state, $location, $ionicScrollDelegate, MyInformation) {
    $scope.forms = Forms.setTime("creatTime");
   // $scope.forms = Forms.all();
    $scope.isShow = false;
   $scope.myinformation = MyInformation.get();
      if($scope.myinformation.position === "派单员")  {
        $scope.isShow = true;
      }
    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.forms = Forms.all();
      $scope.$broadcast("scroll.refreshComplete");     
    };

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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
    };

    $scope.searchContentChange = function() {
      $location.hash("formsHeader");
      $ionicScrollDelegate.anchorScroll();
    }
})

.controller("myCtrl",function($scope,$state,$ionicPopup, $ionicActionSheet, $location, $timeout, MyInformation) {
  $scope.myinformation = MyInformation.get(); 
  $scope.data={};
  $scope.images = [];
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
          if(index == 0) {
            $scope. takePicture();
          }
          else if(index == 1) {
            $scope.readAlbum();
          }
        },
        cancelText: "取消",
        cancel: function() {         
        }
    })
  }
      $scope.readAlbum = function () {

      if (!window.imagePicker) {
        alert('您的环境不支持相册上传');
        return;
      }

      var options = {
        maximumImagesCount: 2,
        width: 800,
        height: 800,
        quality: 80
      };

      imagePicker.getPictures(function (result) {
        for (var i in result){
          $scope.images.push(result[i]);
        }
      }, function (error) {
        alert(error);
      }, options);
    }

    $scope.takePicture = function() {
      if (!navigator.camera) {
        alert('请在真机环境中使用拍照上传。')
        return;
      }

      var options = {
        quality: 75,
        targetWidth: 800,
        targetHeight: 800,
        saveToPhotoAlbum: false
      };

      Camera.getPicture(options).then(function(picUrl) {
        alert(picUrl);
        $scope.images.push(picUrl);
      }, function(err) {
        //alert("拍照错误：" + err);
      });

    }
  $scope.exit = function(){
    alert("haha");
    $state.go('/');
  }
  $scope.markClicked = function(){
    $location.path("app/mark" + $scope.myinformation.id);
  }
})

.controller("messageCtrl",function($scope,Message_infos,Forms,$state,$stateParams) {
  $scope.message_infos = Message_infos.all(); 
  $scope.doRefresh = function(){
    $scope.message_infos = Message_infos.all(); 
    $scope.$broadcast('scroll.refreshComplete');
  }
   // $scope.form = Forms.get($stateParams.id);
  $scope.itemClicked = function(type,id){
   // alert(id);
    if(type === 0){
    $stateParams.contentid = id;
      $state.go('app.message-modify',{contentid:id});
    }
    else if(type === 1){
    $stateParams.contentid = id;
      $state.go('app.message-passwordforget',{contentid:id});
    }
    else if(type === 2){
    $stateParams.contentid = id;
      $state.go('app.message-passwordmodify',{contentid:id});
    }
    else if(type === 3){
      var form = Forms.getByNo(id);
     $state.go('app.message-newtask',{formId:form.id});

    }
    else if(type === 4){
      var form = Forms.getByNo(id);
     $state.go('app.message-statechange',{formId:form.id});
    }
    else if(type === 5){
    }

  }

})

.controller("formDetailCtrl",function($scope, $state, $stateParams, Forms, $location,MyInformation,$ionicHistory, PersonalInformations) {
 $scope.form = Forms.get($stateParams.formId);
//  $scope.engineer = PersonalInformations.getByName($scope.form.engineerName, '工程师' );
//  $scope.salesman =  PersonalInformations.getByName($scope.form.salesName, '销售员');
 $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.form = Forms.get($stateParams.formId);
      $scope.$broadcast("scroll.refreshComplete");     
    };
$scope.myinformation = MyInformation.get();
  // TODO:get form by 'http'
   $scope.yearNums = [];
 for(var i=0;i<10; i++)
    $scope.yearNums.push([i+2016].join(""));
  $scope.dayNums = [];
  for(var i=0; i<31;i++)
    $scope.dayNums.push([i+1].join(""));
  $scope.monthNames=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.hourNums=[];
  for(var i=0; i<15; i++)
      $scope.hourNums.push([i+8].join(""));
    $scope.minuteNums=[0, 10, 20, 30, 40, 50];
    $scope.engineerDetail = function() {
      $scope.engineer = PersonalInformations.getByName($scope.form.engineerName, '工程师' );
      $location.path("app/contacts/" + $scope.engineer.id);
    }
    $scope.salesmanDetail = function() {
      $scope.salesman =  PersonalInformations.getByName($scope.form.salesName, '销售员');
      $location.path("app/contacts/" + $scope.salesman.id);
    } 
  $scope.editClick = function() {
    Forms.currentId = $stateParams.formId;
  }
    $scope.deleteForm = function(){
    alert("Delete this form!");
    $ionicHistory.goBack();
  }

  $scope.cancelOrderTaking = function(){
    alert("取消接单!");
    $ionicHistory.goBack();
  }
  $scope.reviewForm = function(){
    alert("订单已审核!");
    $ionicHistory.goBack();
  }
  $scope.submitComplete = function() {
    alert("订单已完成！");
    $state.go('detail-feedback');
  }
   $scope.takeForm = function(){
    var success=1;
    var year=document.getElementById("year");
    var month=document.getElementById("month");
    var day=document.getElementById("day");
    var hour=document.getElementById("hour");
    var minute=document.getElementById("minute");
    if(year.value === "请选择年份" || month.value === "请选择月份" || day.value === "请选择日期" || hour.value === "请选择具体小时" || minute.value === "请选择具体分钟") {
      alert("上门时间未填写完整！");
      return;
    }
    alert("已经接单");
    $ionicHistory.goBack();
  }
})
.controller("editFormCtrl",function($scope,$state,Forms,MyInformation,PersonalInformations,$ionicHistory) {
 $scope.myinformation = MyInformation.get();
 $scope.form = Forms.get(Forms.currentId);
 $scope.users = PersonalInformations.all();
 var users =  $scope.users;
 $scope.yearNums = [];
 for(var i=0;i<10; i++)
    $scope.yearNums.push([i+2016].join(""));
  $scope.dayNums = [];
  for(var i=0; i<31;i++)
    $scope.dayNums.push([i+1].join(""));
  $scope.monthNames=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.hourNums=[];
  for(var i=0; i<15; i++)
      $scope.hourNums.push([i+8].join(""));
    $scope.minuteNums=[0, 10, 20, 30, 40, 50];

  $scope.engineerFilter = function(user) {
    if($scope.form.engineerName.length > 0) {
       return user.name !== $scope.form.engineerName && user.position.indexOf("工程师")>=0;
    }
    else return user.position.indexOf("工程师")>=0;
    }
  $scope.salesmanFilter = function(user) {
    if($scope.form.salesName.length > 0) {
       return user.name !== $scope.form.salesName && user.position.indexOf('销售员')>=0;
    }
    else return user.position.indexOf('销售员')>=0;
    }

  $scope.editComplete = function() {
     if($scope.form.status == "未接") {
    var success = 1;
    var  mark = document.getElementById('mark');
    var clientName = document.getElementById("clientName");
    var clientPhone = document.getElementById("clientPhone");
    var clientUnit = document.getElementById("clientUnit");
    var clientAddr = document.getElementById("clientAddr"); 
    var service = document.getElementById("service");
    var engineer = document.getElementById("engineer");
    var salesman = document.getElementById("salesman");
    var distributor = document.getElementById('distributor');
    var distributorPhone = document.getElementById("distributorPhone");
    if(mark.value.length == 0) {
      $scope.errorBorder1 = "red";
      success = 0;
    }
    if(clientName.value.length == 0) {
      $scope.errorBorder2 = "red";
      success = 0;
    }
     if(clientPhone.value.length == 0) {
      $scope.errorBorder3 = "red";
      success = 0;
    }
     if(clientUnit.value.length == 0) {
      $scope.errorBorder4 = "red";
      success = 0;
    }
     if(clientAddr.value.length == 0) {
      $scope.errorBorder5 = "red";
      success = 0;
    }
     if(service.value.length == 0) {
      $scope.errorBorder6= "red";
      success = 0;
    }
     if(engineer.value.length == 0) {
      $scope.errorBorder7 = "red";
      success = 0;
    }
     if(salesman.value.length == 0) {
      $scope.errorBorder8 = "red";
      success = 0;
    }
     if(distributor.value.length == 0) {
      $scope.errorBorder9 = "red";
      success = 0;
    }
     if(distributorPhone.value.length == 0) {
      $scope.errorBorder10 = "red";
      success = 0;
    }
    if(success == 0) {
      alert("请将内容填写完整后再提交！‘*'表示必填内容.");
      return;
    }
    if(success == 1) {
      alert("修改完成！");
      $ionicHistory.goBack(-1);
    }
  }
else  {
  var mark = document.getElementById("mark");
  if(mark.value.length == 0) {
    $scope.errorBorder1 = "red";
    alert("未填写分值！");
    return;
  }
  else {
    alert("修改完成！");
    $ionicHistory.goBack();
  }
}
}
})


.controller("markCtrl", function($scope, MarkChanges, $stateParams) {
  $scope.markChanges = MarkChanges.all();

  $scope.markList = [];
  $scope.markList[0] = {
      value: $scope.markChanges[0].currentValue,
      time: $scope.markChanges[0].time,
      hide: 1,
      details: []
  };
  $scope.markList[0].details[0] = {
      content: $scope.markChanges[0].content,
      change: $scope.markChanges[0].changeValue
  };

  var current = 0;
  var currentDetail = 0;
  for (var i = 1; i < $scope.markChanges.length; i++) {
    if ($scope.markChanges[i].time === $scope.markList[current].time) {
      currentDetail++;
      $scope.markList[current].details[currentDetail] = {
        content: $scope.markChanges[i].content,
        change: $scope.markChanges[i].changeValue
      };
      $scope.markList[current].value = $scope.markChanges[i].currentValue;
    }
    else {
      current++;
      currentDetail = 0;
      $scope.markList[current] = {
        value: $scope.markChanges[i].currentValue,
        time: $scope.markChanges[i].time,
        hide: 1,
        details: []
      };
      $scope.markList[current].details[currentDetail] = {
          content: $scope.markChanges[i].content,
          change: $scope.markChanges[i].changeValue
      };
    }
  }

  $scope.detailClicked = function(index) {
    if ($scope.markList[index].hide == 0) {
      $scope.markList[index].hide = 1;
    }
    else {
      $scope.markList[index].hide = 0;
    }
  }


})

.controller("contactdetailCtrl",function($scope, $stateParams, PersonalInformations, PersonalInformations, $location, MyInformation) {
  $scope.user = PersonalInformations.get($stateParams.personId);
  $scope.personalInformation = PersonalInformations.get($stateParams.personId);
  $scope.myInformation = MyInformation.get();;

  $scope.personalFormClicked = function() {
    $location.path("app/detail-personalForms/" + $stateParams.personId);
  }
  $scope.markClicked = function() {
    $location.path("app/mark" + $stateParams.personId);
  }
})

.controller("newFormCtrl",function($scope,$state, PersonalInformations,UserService,$ionicHistory,$http) {

//date类型转成string
<!--      
/**      
* 对Date的扩展，将 Date 转化为指定格式的String      
* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符      
* 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)      
* eg:      
* (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423      
* (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
* (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
* (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
* (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/        
//var date = new Date();      
//window.alert(date.pattern("yyyy-MM-dd hh:mm:ss"));   
// -->   

Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "\u65e5",         
    "1" : "\u4e00",         
    "2" : "\u4e8c",         
    "3" : "\u4e09",         
    "4" : "\u56db",         
    "5" : "\u4e94",         
    "6" : "\u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}    

  //   alert(new Date());

// var time = new Date();
// var time2 = time;
// alert(time2.pattern("yyyy-MM-dd EEE hh:mm:ss"));


  $scope.users = [];
  PersonalInformations.all(function(response){
    $scope.users = response;
  });
  $scope.saveNewForm = function(){
     var distributorId = UserService.getUserId();
   //  alert(distributorId);
    alert(distributorId);
    var success = 1;//success=1说明报修单新建成功。
    var clientname = document.getElementById("clientName");
    var clientphone = document.getElementById("clientPhone");
    var clientunit= document.getElementById("clientUnit");
    var clientaddr = document.getElementById("clientAddr");
    var salesname = document.getElementById("salesName");
    var engineername = document.getElementById("engineerName");
    var service = document.getElementById("serviceName");
    var mark = document.getElementById("mark");
     var serviceId;
    if(clientname.value.length == 0) {
      $scope.errorBorder1 = 'red';
      success = 0;
    }
     if(clientphone.value.length == 0) {
      $scope.errorBorder2 = 'red';
      success = 0;
    }
     if(clientaddr.value.length == 0) {
      $scope.errorBorder3 = 'red';
     success = 0;
    }
     if(clientunit.value.length == 0) {
      $scope.errorBorder4 = 'red';
      success = 0;
    }
     if(salesname.value === "请选择销售人员") {
      $scope.errorBorder5 = 'red';
      success = 0;
    }
    if( engineername.value === "请选择工程师") {
      $scope.errorBorder6 = 'red';
      success = 0;
    }
     if( service.value === "请选择服务") {
      $scope.errorBorder7 = 'red';
      success = 0;
    }
    if(mark.value.length == 0 && mark.value.length >= 4) {
      $scope.errorBorder8 = 'red';
      success = 0;
    }
    for(var i = 0; i<3; i++) {
      if(mark.value[i]<'0' || mark.value[i]>'9') {
        $scope.errorBorder8 = 'red';
        success = 0;
        break;
      }
    }
    if(mark.value.length == 3 && parseInt(mark.value)>100) {
      $scope.errorBorder8 = 'red';
      success = 0;
      return;
    }
    if(success == 0 ) {
      alert("请将内容填写完整后再提交！‘*'表示必填内容.");
      return;
    }
    if(success == 1) {
     if(service.value === "上门服务") {
        serviceId = 0;
     }
     else if (service.value === "送货服务") {
        serviceId = 1;
     }
     else if(service.value === "安装调试") {
        serviceId = 2;
     }
    // var time = new Date().format("yyyy-MM-dd HH:mm:ss");

     var engineerId = new Array();
     var salerId = [];
     var tag = 0;
     for(var i = 0, j = 0; i < engineername.value.length - 1; i ++){
         if(tag === 1){

          engineerId.push(engineername.value[i]);
   //       alert(engineerId.value[j]);
          j ++;
         }
   //      alert(engineername.value[i]);
         if(engineername.value[i] === ':'){
         // alert(engineername.value[i]);
          tag = 1;
         }
     }
     //alert(engineerId.length);
     //alert(engineerId.join(""));
     tag = 0;
     for(var i = 0, j = 0; i < salesname.value.length - 1; i ++){
      if(tag === 1){
        salerId.push(salesname.value[i]);
        j ++;
      }
      if(salesname.value[i] === ':'){
        tag = 1;
      }

     }
     alert(salerId.join(""));

    $http({
        method:'POST',
        url:'http://115.159.225.109/repairforms/create',
         data:{
          'grade': mark.value,
          'service':serviceId,
          'clientName': clientname.value,
          'clientPhone': clientphone.value,
          'clientWorkplace':clientunit.value,
          'clientAddress':clientAddr.value,
          'engineerId':parseInt(engineerId.join("")),
          'salerId':parseInt(salerId.join("")),
          'distributorId':(distributorId),
          'creationTime':new Date()
        },
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:'true'    
      }) 
      .then(function(response){
        console.log(response);
      })

     $ionicHistory.goBack(-1);
    }
  }
  $scope.cancelNewForm = function(){
    var tmp = document.getElementsByTagName("input");
    for(var i = 0; i < tmp.length; i ++){
      tmp[i].value = "";
    }
    var salesname = document.getElementById("salesName");
    salesname.value = "请选择销售人员";
    var engineername = document.getElementById("engineerName");
    engineername.value = "请选择工程师";
    var servicename = document.getElementById('serviceName');
    servicename.value = "请选择服务";
	}
})

.controller("newtactsCtrl",function($scope, $ionicHistory, $http) {

  $scope.saveNewTacts = function() {
    var success = 1;
    var UserId = document = document.getElementById("userId");
    var UserPassword = document = document.getElementById("userPassword");
    var UserName = document = document.getElementById("userName");
    var UserPhone = document = document.getElementById("userPhone");
    var UserType= document = document.getElementById("userType");  // int!
    var UserTypeInt = 0;
    if(UserId.value.length == 0)
    {
      success = 0;
    }
    else if(UserPassword.value.length == 0)
    {
      success = 0;
    }
    else if(UserName.value.length == 0)
    {
      success = 0;
    }
    else if(UserPhone.value.length == 0)
    {
      success = 0;
    }
    else if(UserType.value == "请选择类型")
    {
      success = 0;
    }
    else
    {
       if(success == 0)
       {
          alert("请将内容填写完整后再提交！‘*'表示必填内容.");
       }
       else
       {
           //translatetype();
           if(UserType.value == "管理员")
           {
              UserTypeInt = 0;
           }
           else if(UserType.value == "工程师")
           {
               UserTypeInt = 1;
           }
           else if(UserType.value == "销售员")
           {
               UserTypeInt = 2;
           }
           else
           {
               UserTypeInt = 3;
           }
          $http({
            method:'POST',
            url:'http://115.159.225.109/users/create',
            data:{
              'id':UserId.value,
              'name':UserName.value,
              'password':UserPassword.value,
              'phone':UserPhone.value,
              'type':UserTypeInt
            },
            headers:{
              'Content-Type':'application/json'
            },
            withCredentials:'true'    
          })
        .then(function(response) {
          console.log(response);
          if(response.data['success']) {
            alert("添加成功！");
            $ionicHistory.goBack();
          }
          else
          {
            alert("添加失败！");
          }
      },
      function(response) {
        console.log(response);
        alert("发送失败！请检查联接!")
      });
    }
  }
}

   $scope.cancelNewTacts = function() {
   var tmp = document.getElementsByTagName("input");
    for(var i = 0; i < tmp.length; i ++){
      tmp[i].value = "";
    }
    var usertype = document.getElementById('userType');
    usertype.value = "请选择类型";
  }
})

.controller("LoginCtrl",function($scope,$state,$http,MyInformation,UserService) {
   $scope.postuser = function() {
     //     $state.go("app.viewForms");
    var user = document.getElementById("userName").value;
    var userPass = document.getElementById("userPassword").value;
   // alert(user + " " + userPass + " " + errorBorder);

    if (user == "" || userPass == "") {
      alert("请输入用户名和密码");
    }
    else {
      var userinfo = {"id":user,"password":userPass};
      $http({
        method:'POST',
        url:'http://115.159.225.109/login',
         data:{
         'id':user,
         'password':userPass
        },
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:'true'    
      })
      .then(function(response) {
        console.log(response);
        if(response.data['success']) {
          UserService.setUser(user,userPass);
          $myinformation =  MyInformation.setPosition("派单员");
          $state.go("app.viewForms");
        }
        else
        {

          alert("用户名或密码不正确！");
        }
      },
      function(response) {
        console.log(response);
      });
    }
  }
  
})
.controller("passwordModifyCtrl",function($scope,$state, $ionicHistory, $ionicPopup,UserService){
  $scope.goback = function(){
    $state.go('app.my');
  }
  $scope.clearone = function(){
    document.getElementById("old-password").value = "";

  }
  $scope.cleartwo = function(){
    document.getElementById("new-password1").value = "";
  }
  $scope.clearthree = function(){
    document.getElementById("new-password2").value = "";

  }
  $scope.ensure = function(){
  //    $state.go('app.my');
   //   return;
    var success = 1;//success=1说明修改密码成功。
    var prev = document.getElementById("old-password");
    var after1 = document.getElementById("new-password1");
    var after2 = document.getElementById("new-password2");
   
    if(prev.value.length == 0 || after1.value.length == 0 || after2.value.length == 0){
      alert("密码不能为空！");
      return;
    }
    if(after1.value != after2.value){
      alert("两次新密码不一致！");
      return;
    }

    if(UserService.getUserPwd() != prev.value){
      alert("原密码不正确！ 原密码：" + UserService.getUserPwd());
      return;
    }

    UserService.changePassword(UserService.getUserId(), UserService.getUserPwd(),after1.value,
            function () {
              $ionicPopup.show({
                title: "修改密码成功",
                template: "请您重新登陆！",
                scope: $scope,
                buttons:[{
                  text : "确定",
                  type : "button-positive"
                }]
              }).then(function (res) {
                $state.go('login');
              });
            },
            function () {
              $ionicPopup.show({
                title: "修改密码失败",
                template: "请您稍候重试！",
                scope: $scope,
                buttons:[{
                  text : "确定",
                  type : "button-positive"
                }]
              }).then(function (res) {
                //$state.go('login');
              });
            })
      //这里需要与数据库交互，更新密码

      $ionicHistory.goBack();
    
  }
})
.controller("passwordForgetCtrl",function($scope,$state){
  var phone = document.getElementById("phonenumber");
  var button = document.getElementById("submitbutton");
  // if(phone.value.length === 0){
  //   button.disabled = true;
  // }
  $scope.goback = function(){
    $state.go('login');
  }
  $scope.yz = function(){
    alert("aaa");
    var phone = document.getElementById("phonenumber");
    var button = document.getElementById("submitbutton");
    if(phone.value.length === 0){
      button.disabled = true;
    }
    else{
      button.disabled = false;
    }
  }
  $scope.ensure = function(){
    var tmp = document.getElementById("phonenumber");
    if(tmp.value.length === 0){
      alert("输入为空！");
      return;
    }
    alert("申请提交成功，请等待管理员联系");
    $state.go('login');
  }
})

.controller('PersonalFormsCtrl', function($scope, $stateParams, PersonalForms, $state, $location, $ionicScrollDelegate) {
    $scope.forms = PersonalForms.setTime("creatTime");
   // 后台搭建完成后通过 'http + $stateParams.personId' 获取数据

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      $scope.forms = PersonalForms.all();
      $scope.$broadcast("scroll.refreshComplete");     
    };

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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
      
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
    }
    $scope.sortByAccomplishTime = function() {
      $scope.menu2Var = true;
      $scope.menu3Content = '降序 ';
      $scope.menu3Icon = 'ion-ios-arrow-thin-down';
      $scope.menu2Color = '#FFFFFF';

      $scope.menu2Content = '按完成时间 ';
      $scope.forms = PersonalForms.setTime("finishTime");
      $scope.timeLabel = '完成时间：';
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
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
      $location.hash("personalFormsHeader");
      $ionicScrollDelegate.anchorScroll();
    }
})


.controller('markModifyCtrl', function($scope,$stateParams,Forms,$location,UserService){
  //alert(UserService.getUserPosition());
  //alert(UserService.getUserId());
 // $scope.form = Forms.get($stateParams.formId);
 // alert($stateParams.contentid);
  $scope.form = Forms.getByNo($stateParams.contentid);

})
.controller('messagePasswordForgetCtrl',function($scope,$stateParams,PersonalInformations,$location){
 // alert($stateParams.contentid);
  $scope.user = PersonalInformations.getByNo($stateParams.contentid);

  
})
.controller('messagePasswordModifyCtrl',function($scope,$stateParams,PersonalInformations,$location){
 // alert($stateParams.contentid);
   $scope.user = PersonalInformations.getByNo($stateParams.contentid);

})

.controller('feedbackCtrl',function($scope, $ionicActionSheet,$state,$timeout,$ionicHistory){
  $scope.goback = function(){
     $state.go("app.viewForms");
  }
  $scope.images = [];
  $scope.choosephoto = function(){
     var hideSheet = $ionicActionSheet.show({
        buttons:[
          { text: '<b>拍照</b>'},
          { text: '从<b>相册</b>中选择'}],
        cancelText: '取消',
        cancel: function () {
          
        },
        buttonClicked: function (index) {
          if (index == 0){
            $scope.takePicture();
          }
          if (index == 1){
            $scope.readAlbum();
          }
        }
      })

      $timeout(function() {
        hideSheet();
      }, 3000);
  }


    $scope.readAlbum = function () {

      if (!window.imagePicker) {
        alert('您的环境不支持相册上传');
        return;
      }

      var options = {
        maximumImagesCount: 3,
        width: 800,
        height: 800,
        quality: 80
      };

      imagePicker.getPictures(function (result) {
        for (var i in result){
          $scope.images.push(result[i]);
        }
      }, function (error) {
        alert(error);
      }, options);
    }

    $scope.takePicture = function() {
      if (!navigator.camera) {
        alert('请在真机环境中使用拍照上传。')
        return;
      }

      var options = {
        quality: 75,
        targetWidth: 800,
        targetHeight: 800,
        saveToPhotoAlbum: false
      };

      Camera.getPicture(options).then(function(picUrl) {
        alert(picUrl);
        $scope.images.push(picUrl);
      }, function(err) {
        //alert("拍照错误：" + err);
      });

    }

  $scope.finish = function(){
    alert("提交完成");
  }
})

;

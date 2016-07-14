angular.module('starter.controllers',['ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

 .controller("contactsCtrl",function($scope, $state, PersonalInformations, $location, $ionicScrollDelegate) {
//  var content = document.getElementById("searchphone");
  $scope.users = PersonalInformations.all();

  var users = $scope.users;

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

.controller('ViewFormsCtrl', function($scope, Forms, $state, $location, $ionicScrollDelegate) {
    $scope.forms = Forms.setTime("creatTime");
   // $scope.forms = Forms.all();

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

.controller("messageCtrl",function($scope,Message_infos,$state,$stateParams) {
  $scope.message_infos = Message_infos.all(); 
  $scope.doRefresh = function(){
    $scope.$broadcast('scroll.refreshComplete');
  }
  
   // $scope.form = Forms.get($stateParams.id);
  $scope.itemClicked = function(type,id){
    $stateParams.contentid = id;
    if(type === 0){
      $state.go('app.message-modify',{contentid:id});
    }
    else if(type === 1){
      $state.go('app.message-passwordforget');
    }
    else{
      $state.go('app.message-passwordmodify');
    }

  }

})

.controller("formDetailCtrl",function($scope, $state, $stateParams, Forms, $location,MyInformation,$ionicHistory) {

  $scope.form = Forms.get($stateParams.formId);
  
  $scope.finish =function(){
    $state.go('detail-feedback');
  }
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
      alert("有必填信息未填！");
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

.controller("newFormCtrl",function($scope,$state, PersonalInformations,$ionicHistory) {
  $scope.users = PersonalInformations.all();
  $scope.saveNewForm = function(){
    var success = 1;//success=1说明报修单新建成功。
    var clientname = document.getElementById("clientName");
    var clientphone = document.getElementById("clientPhone");
    var clientunit= document.getElementById("clientUnit");
    var clientaddr = document.getElementById("clientAddr");
    var salesname = document.getElementById("salesName");
    var engineername = document.getElementById("engineerName");
    var service = document.getElementById("serviceName");
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
    if(success == 0 ) {
      return;
    }
    if(success == 1) {
      alert("添加成功！");
      $ionicHistory.goBack();
    }
    else {
      alert("请将内容填写完整后再提交！‘*'表示必填内容.");
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

.controller("newtactsCtrl",function($scope, $ionicHistory) {

  $scope.saveNewTacts = function() {
    var success = 1;
    var UserId = document = document.getElementById("userId");
    var UserPassword = document = document.getElementById("userPassword");
    var UserName = document = document.getElementById("userName");
    var UserPhone = document = document.getElementById("userPhone");
    var UserType= document = document.getElementById("userType");  // int!
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
    if(success == 1) {
      alert("添加成功！");
      $ionicHistory.goBack();
    }
    else {
      alert("请将内容填写完整后再提交！‘*'表示必填内容.");
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

.controller("LoginCtrl",function($scope,$state,$http,MyInformation) {
   $scope.postuser = function() {
    
          $state.go("app.viewForms");
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
          $myinformation =  MyInformation.setPosition("工程师");
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
.controller("passwordModifyCtrl",function($scope,$state, $ionicHistory){
  $scope.goback = function(){
    $state.go('app.my');
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
    // if(prev.value != "123456"){
    //   alert("原密码不正确！");
    //   return;
    // }
    if(after1.value != after2.value){
      alert("两次新密码不一致！");
      return;
    }

    if(success == 1){
      alert("密码修改成功！");
      //这里需要与数据库交互，更新密码

      $ionicHistory.goBack();
    }
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


.controller('markModifyCtrl', function($scope,$stateParams,Forms,$location){

 // $scope.form = Forms.get($stateParams.formId);
  alert($stateParams.contentid);

  $scope.form = Forms.getByNo($stateParams.contentid);
  //alert($scope.form.NO.value);

})
.controller('messagePasswordForgetCtrl',function($scope,$state){

  
})
.controller('messagePasswordModifyCtrl',function($scope,$state){

})

.controller('feedbackCtrl',function($scope, $ionicActionSheet,$state,$timeout){
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

  $scope.finish = function(){
    alert("提交完成");
  }
})

;

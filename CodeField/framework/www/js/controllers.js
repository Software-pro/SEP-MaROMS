angular.module('starter.controllers',['ionic'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout,Message_infos,UserService,Picture) {
  
  Message_infos.all(function(){

      $scope.count = Message_infos.getUnreadCount();
    }
  );

  $scope.refresh = function(){
   // alert("haha");
     
     Picture.sendPicture();

     $scope.count = Message_infos.getUnreadCount();
  }
})

 .controller("contactsCtrl",function($scope, $state, PersonalInformations,UserService, $location, $ionicScrollDelegate,$http) {
//  var content = document.getElementById("searchphone");
  $scope.position = UserService.getUserPosition();
  $scope.users=[];
  var users = [];
  var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  $scope.alphabet = iterateAlphabet();
  $scope.sorted_users;

  
  $scope.groups = [];

  $scope.menuContent = "全部";
  $scope.menuVar = true;


    $scope.hideCancel = true;
    $scope.searchcontent = '';

  $scope.menu = function(){
   // $scope.menuVar = true;
    $scope.menuColor = '#FFFFFF';
    $scope.menuVar = !$scope.menuVar;
    if($scope.menuVar === false){
      $scope.menuColor = "#FAFAFA";
    }
    else{
      $scope.menuColor = "#FFFFFF";
    }

  }

  $scope.chooseAll = function(){
    $scope.menuVar = true;
    $scope.menuColor = "#FFFFFF";
    $scope.menuContent = "全部";
 
     $scope.doRefresh();
  }

  $scope.chooseDistributor = function(){
    $scope.menuVar = true;
    $scope.menuColor = "#FFFFFF";
    $scope.menuContent = "派单员";
     
     $scope.doRefresh();
  //  $scope.users = PersonalInformations.getDistributors();
  //  alert("in controllers.js " + $scope.users.length);

  }
   $scope.chooseEngineer = function(){
    $scope.menuVar = true;
    $scope.menuColor = "#FFFFFF";
    $scope.menuContent = "工程师"; 
     $scope.doRefresh();

  }

   $scope.chooseSaler = function(){
    $scope.menuVar = true;
    $scope.menuColor = "#FFFFFF";
    $scope.menuContent = "销售员"; 
     $scope.doRefresh();

  }
  
  
  PersonalInformations.all(function(response){

    if($scope.menuContent === "派单员"){
      for(var i = 0; i < response.length; i ++){
        if(response[i].position === "派单员"){
          $scope.users.push(response[i]);
        }
      }
    }
    else if($scope.menuContent === "工程师"){
       for(var i = 0; i < response.length; i ++){
        if(response[i].position === "工程师"){
          $scope.users.push(response[i]);
        }
      }
    }
    else if($scope.menuContent === "销售员"){
       for(var i = 0; i < response.length; i ++){
        if(response[i].position === "销售员"){
          $scope.users.push(response[i]);
        }
      }
    }
    else if($scope.menuContent === "全部"){


    $scope.users=response;
    }
    users = $scope.users;

    $scope.sorted_users = {};
    var tmp = {};
    for(var i = 0; i < str.length; i++)
    {
      var nextChar = str.charAt(i);
      tmp[nextChar] = [];
    }

    //Sort user list by first letter of name
    for(i = 0; i < users.length; i++){
      var letter=users[i].name.toUpperCase().charAt(0);

 // alert("in before" + users[i].name);
      tmp[letter].push( users[i] );
    }
    $scope.sorted_users = tmp;





  for (var i = 0; i < 10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }


    $scope.hideCancel = true;
    $scope.searchcontent = '';

  

  }); 
  //$scope.users = PersonalInformations.all();
   
  $scope.doRefresh = function(){


    PersonalInformations.all(function(response){
       $scope.users = [];
       users = [];
      if($scope.menuContent === "派单员"){
        for(var i = 0; i < response.length; i ++){
          if(response[i].position === "派单员"){
            $scope.users.push(response[i]);
          }
        }
      }
      else if($scope.menuContent === "工程师"){
       for(var i = 0; i < response.length; i ++){
        if(response[i].position === "工程师"){
          $scope.users.push(response[i]);
        }
       }
      }
      else if($scope.menuContent === "销售员"){
       for(var i = 0; i < response.length; i ++){
        if(response[i].position === "销售员"){
          $scope.users.push(response[i]);
        }
      }
     }
      else if($scope.menuContent === "全部"){
      $scope.users=response;
      }

      users = $scope.users;
       $scope.sorted_users = {};
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
    $scope.$broadcast("scroll.refreshComplete");  


    //  for(var i = 0; i < str.length; i++)
    //   {
    //     var nextChar = str.charAt(i);
    //     if(tmp[nextChar].length === 0){


    //     }
    //     else{
    //       alert(nextChar + " 不为空");
    //     }
    //   }

    // alert("tmp length " + tmp.length);
    // alert("$scope.sorted_users length " + $scope.sorted_users.length);

      for (var i = 0; i < 10; i++) {
        $scope.groups[i] = {
          name: i,
          items: []
        };
        for (var j=0; j<3; j++) {
          $scope.groups[i].items.push(i + '-' + j);
        }
      }
      
    $scope.hideCancel = true;
    $scope.searchcontent = '';

    });
  }
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

.controller('ViewFormsCtrl', function($scope, Forms, PersonalInformations,$state, $location, $ionicScrollDelegate, UserService) {
   // $scope.forms = Forms.setTime("creatTime");
   // $scope.forms = Forms.all();
      var userPosition = UserService.getUserPosition();
      var userId =  UserService.getUserId();
  //    alert(userPosition);
 //     alert(userId);
      if(userPosition === "派单员" || userPosition === "管理员") {
          Forms.all(function(response){
              $scope.forms = response;
         //     for(var i = 0; i<$scope.forms.length; i++) {
         //       alert("formsId: " + $scope.forms[i].id);
         //     }
              $scope.isShow = false;
              if(userPosition === "派单员")  {
                //alert("feipaidan");
                     $scope.isShow = true;
              }   
            });
      }
      else if(userPosition === "工程师") {
        Forms.getByEngineerId(userId, function(response) {
            $scope.forms = response;
       //      for(var i = 0; i<$scope.forms.length; i++) {
      //          alert("formsId: " + $scope.forms[i].id);
     //         }
            $scope.isShow = false;
        });
      }
      else if(userPosition === "销售员") {
        Forms.getBySalerId(userId, function(response) {
          $scope.forms = response;
     //      for(var i = 0; i<$scope.forms.length; i++) {
     //           alert("formsId: " + $scope.forms[i].id);
     //         }
          $scope.isShow = false;
        }) ;
      }

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      var userPosition = UserService.getUserPosition();
      var userId =  UserService.getUserId();
        if(userPosition === "派单员" || userPosition === "管理员")  {
      Forms.all(function(response){
           $scope.forms = response;
      $scope.$broadcast("scroll.refreshComplete");     
      });
    }
     else if(userPosition === "工程师") {
        Forms.getByEngineerId(userId, function(response) {
            $scope.forms = response;
         //   $scope.isShow = false;
         $scope.$broadcast("scroll.refreshComplete");   
        });
      }
      else if(userPosition === "销售员") {
        Forms.getBySalerId(userId, function(response) {
          $scope.forms = response;
         // $scope.isShow = false;
         $scope.$broadcast("scroll.refreshComplete");   
        }) ;
      }
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

.controller("myCtrl",function($scope,$state,$ionicPopup, $ionicActionSheet, $location, $timeout, MyInformation,UserService,$http) {
  $scope.myinformation;
   MyInformation.all(function(response) {
    $scope.myinformation = response; 
    });


  $scope.markClicked = function(){
    $location.path("app/mark/" + $scope.myinformation.id);
  }

  $scope.exit = function(){
     $ionicPopup.show({
        title: "您确定要登出吗",
        scope: $scope,
        buttons:[
          {
            text : "确定",
            type : "button-positive",
            onTap: function(e) {
              $state.go('login');
            }
          },
          {
            text : "取消",
            type : "button-positive"
          }]
      }).then(function(res) {
      });
  }
  
})

.controller("messageCtrl",function($scope,Message_infos,Forms,UserService,$state,$stateParams) {


  $scope.message_infos = [];
  Message_infos.all(
    function(response){
     $scope.message_infos = response;
     for(var i = 0; i < $scope.message_infos.length;i ++){
      var time = new Date($scope.message_infos[i]);
      $scope.message_infos[i].time = (new Date($scope.message_infos[i].time)).toLocaleString();
     }
    }
  ); 
  $scope.doRefresh = function(){
     Message_infos.all(
      function(response){
       $scope.message_infos = response; 
       $scope.$broadcast('scroll.refreshComplete');
      }); 
  }
   // $scope.form = Forms.get($stateParams.id);
  $scope.itemClicked = function(ID,type,id){

    Message_infos.read(ID);

    if(type === 0){
    $stateParams.contentid = id;
  //  alert("in messageCtrl id = " + id );
      var tmp = Forms.get(id);
      if(tmp === null){
         alert("该报修单已经不存在");
      }
      else{
        $state.go('app.message-modify',{contentid:id});
      }
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


.controller("formDetailCtrl",function($scope, $state, $window, $stateParams, Forms, $location,UserService,$ionicHistory, PersonalInformations) {

 $scope.form = Forms.get($stateParams.formId);

  
//   alert("new Date(null) " + (new Date(null)));
// alert((new Date(null)).getTime());

//   alert($scope.form.orderTakeTime.getTime() ===  (new Date(null)).getTime());
 


 $scope.userPosition = UserService.getUserPosition();
//  $scope.engineer = PersonalInformations.getByName($scope.form.engineerName, '工程师' );
//  $scope.salesman =  PersonalInformations.getByName($scope.form.salesName, '销售员')


 //$scope.doRefresh = function() {
    //Forms.all(function(response){
      //$scope.forms = response;

      //alert("in controllers.js " + $scope.forms.length);
      //var userPosition = UserService.getUserPosition();
      //$scope.isShow = false;
    //  if(userPosition === "派单员")  {
        //alert("feipaidan");
       // $scope.isShow = true;
     // } 
      //刷新--重新从后台载入数据
      //$scope.form = Forms.get($stateParams.formId);

//alert($scope.form.length);
    //  alert($scope.form.id + $scope.form.clientname);

      //$scope.$broadcast("scroll.refreshComplete");
    //});
//}
 
 //alert(userPosition);
  // TODO:get form by 'http'
  $scope.yearNums = [];
  for(var i=0;i<10; i++)
    $scope.yearNums.push([i+2016].join(""));
  $scope.dayNums = [];
  for(var i=0; i<31;i++)
    $scope.dayNums.push([i+1].join(""));
 // $scope.monthNames=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.monthNames=[1,2,3,4,5,6,7,8,9,10,11,12];
  $scope.hourNums=[];
  for(var i=0; i<15; i++)
    $scope.hourNums.push([i+8].join(""));
  $scope.minuteNums=[0, 10, 20, 30, 40, 50];

  $scope.showfeedback = function(){
    $state.go("app.feedback",{formId:$stateParams.formId});


   // $location.path("app/feedback/" + $stateParams.formId);


  }


  $scope.engineerDetail = function() {
    //$scope.engineer = PersonalInformations.getByName($scope.form.engineerName, '工程师' );
    $location.path("app/contacts/" + $scope.form.engineerId);
  }
  $scope.salesmanDetail = function() {
    //$scope.salesman =  PersonalInformations.getByName($scope.form.salesName, '销售员');
    $location.path("app/contacts/" + $scope.form.salerId);
  } 
//alert(userPosition);   
  $scope.editClick = function() {
    Forms.currentId = $stateParams.formId;
  }
  $scope.deleteForm = function(){
    Forms.delete($stateParams.formId);
    alert("Delete this form!");
    $ionicHistory.goBack();
  }

  $scope.cancelOrderTaking = function(){
    alert("取消接单!");
    Forms.unreceive($stateParams.formId,function(){
      $ionicHistory.goBack();
    });
  }
  $scope.reviewForm = function(){

    Forms.check($stateParams.formId,function(){
    $ionicHistory.goBack();
    })
  }
  $scope.submitComplete = function() {
  //  alert("订单已完成！");
  //  alert($stateParams.formId);
    $state.go('app.detail-feedback',{formId:$stateParams.formId});
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


    var visitTime = new Date(year.value,month.value - 1,day.value,hour.value,minute.value, 0);


    Forms.receive($stateParams.formId,visitTime,function(){

    alert("已经接单");
    $ionicHistory.goBack();
    });
  }
})
.controller("editFormCtrl",function($scope,$state,Forms,UserService,PersonalInformations,Message_infos,$ionicHistory,$http) {
 $scope.userPosition = UserService.getUserPosition();
 $scope.form = Forms.get(Forms.currentId);
$scope.users = [];
var users ;
var previousMark;
 PersonalInformations.all(function(users){
    $scope.users = users;
    users =  $scope.users;
 
    previousMark = $scope.form.value;
 });

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
      var distributor = UserService.getUserId();
    if(mark.value.length == 0 || mark.value.length >= 4) {
      success = 0;
    }

    if(clientName.value.length == 0) {
      success = 0;
    }
     if(clientPhone.value.length == 0) {
      success = 0;
    }
     if(clientUnit.value.length == 0) {
      success = 0;
    }
     if(clientAddr.value.length == 0) {
      success = 0;
    }
     if(service.value.length == 0) {
      success = 0;
    }
     if(engineer.value.length == 0) {
      success = 0;
    }
     if(salesman.value.length == 0) {
      success = 0;
    }
    for(var i = 0; i<3; i++) {
      if(mark.value[i]<'0' || mark.value[i]>'9') {
        success = 0;
        // alert("success= " + success);
        break;
      }
    }
    if(mark.value.length == 3 && parseInt(mark.value)>100) {
      success = 0;
    }
     /*if(distributor.value.length == 0) {
      success = 0;
    }
     if(distributorPhone.value.length == 0) {
      success = 0;
    } */
    if(success == 0) {
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
     var engineerId = new Array();
     var salerId = [];
     var tag = 0;
     for(var i = 0, j = 0; i < engineer.value.length - 1; i ++){
         if(tag === 1){

          engineerId.push(engineer.value[i]);
   //       alert(engineerId.value[j]);
          j ++;
         }
   //      alert(engineername.value[i]);
         if(engineer.value[i] === ':'){
         // alert(engineername.value[i]);
          tag = 1;
         }
     }
     //alert(engineerId.length);
     //alert(engineerId.join(""));

 
       /*if(distributor.value.length == 0) {
        $scope.errorBorder9 = "red";
        success = 0;
      }
       if(distributorPhone.value.length == 0) {
        $scope.errorBorder10 = "red";
        success = 0;
      } */
    
       //alert(engineerId.length);
       //alert(engineerId.join(""));
       tag = 0;
       for(var i = 0, j = 0; i < salesman.value.length - 1; i ++){
        if(tag === 1){
          salerId.push(salesman.value[i]);
          j ++;
        }
        if(salesman.value[i] === ':'){
          tag = 1;
        }
      }

      var eng = parseInt(engineerId.join(""));
      var sale = parseInt(salerId.join(""));
      Forms.edit($scope.form.id,mark.value,serviceId,clientName.value,clientPhone.value,clientUnit.value,clientAddr.value,eng,sale,distributor,function(){


        if(mark.value != previousMark){
        //  alert(previousMark + " " + mark.value);
          Message_infos.create(0,$scope.form.id,1);
         //   alert("send message");
          }

         Forms.all(function(response){
           $ionicHistory.goBack(-2);
         });

      });


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
        $http({
            method:'POST',
            url:'http://115.159.225.109/repairforms/changeGrade',
            data:{
              'id':$scope.form.id,
              'grade':mark.value,
            },
            headers:{
              'Content-Type':'application/json'
            },
            withCredentials:'true'
          })
          .then(function(response) {
            console.log(response);

        if(mark.value != previousMark){
          Message_infos.create(0,$scope.form.id,1);
          }
        alert("修改完成！");
        $ionicHistory.goBack(-2);
          })
      }
    }
  }
})




.controller("contactdetailCtrl",function($scope,$state, $stateParams, PersonalInformations, $location, $ionicPopup,MyInformation) {
  $scope.user = PersonalInformations.get($stateParams.personId);
  $scope.personalInformation = PersonalInformations.get($stateParams.personId);
  MyInformation.all(function(response){
      
     $scope.myInformation = response;
  });

  $scope.personalFormClicked = function() {
    //alert($stateParams.personId);
    $location.path("app/detail-personalForms/" + $stateParams.personId);
  }
  $scope.markClicked = function() {
    $location.path("app/mark/" + $stateParams.personId);
  }
  $scope.delete = function(){

     var confirmPopup = $ionicPopup.confirm({
       title: '删除',
       template: '确定删除此用户?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         PersonalInformations.delete($stateParams.personId,function(){

         console.log('删除了用户' + $stateParams.personId);
         $state.go('app.contacts');
         });
       } else {
         console.log('未删除用户' + $stateParams.personId);
       }
     });
   
  }
})

.controller("markCtrl", function($scope, MarkChanges, $stateParams, $window) {
  $scope.marks = "0_0_0_10_0_60_0_0_500_0_0_0"

  var marklist = [];
  var maxLength;

  marklist = $scope.marks.split('_');
  $scope.markChanges = [];
  maxLength = 0;



  for (var i = 0; i < 12; i++) {
    var value = marklist[i];
    if (maxLength < Number(value)) {
      maxLength = Number(value);
    }
  }
 // alert($window.innerWidth + " " + Number(marklist[i]) + " " + maxLength);
  for (var i = 0; i < 12; i++) {
   // alert($window.innerWidth + " " + Number(marklist[i]) + " " + maxLength);
    $scope.markChanges[i] = {
      "value": marklist[i],
      "length": 5 + Number(marklist[i]) * $window.innerWidth * 0.75/ maxLength,
      "time": i + 1
    };
   // alert($scope.markChanges[i].length);
  }


//   $scope.marks = "";
//   var marklist = [];
//   var maxLength;
//   MarkChanges.get($stateParams.personId,function(response){

// $scope.marks = response;
//     marklist = $scope.marks.split('_');
//     $scope.markChanges = [];
//     maxLength = 0;



//   for (var i = 0; i < 12; i++) {
//     var value = marklist[i];
//     maxLength = maxLength + Number(value);
//   }
//   for (var i = 0; i < 12; i++) {
//     $scope.markChanges[i] = {
//       "value": marklist[i],
//       "length": 5 + Number(marklist[i]) * 800 / maxLength,
//       "time": i + 1
//     };
//   }


//   });

})

.controller("newFormCtrl",function($scope,$state, PersonalInformations,UserService,Message_infos,$ionicHistory,$http) {

//date类型转成string

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
//    

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

// alert(time);
// var time2 = new Date(time.toString());
// alert(time2);
// alert((new Date(time.toString())).pattern("yyyy-MM-dd EEE hh:mm:ss"));


  $scope.users = [];
  PersonalInformations.all(function(response){
    $scope.users = response;
  });
  $scope.saveNewForm = function(){
     var distributorId = UserService.getUserId();
   //  alert(distributorId);
    //alert(distributorId);
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
      success = 0;
     // alert("success= " + success);
    }
    else if(clientphone.value.length == 0) {
      success = 0;
      // alert("success= " + success);
    }
    else  if(clientaddr.value.length == 0) {
     success = 0;
     // alert("success= " + success);
    }
    else if(clientunit.value.length == 0) {
      success = 0;
      // alert("success= " + success);
    }
    else  if(salesname.value === "请选择销售人员") {
      success = 0;
      // alert("success= " + success);
    }
    else if( engineername.value === "请选择工程师") {
      success = 0;
      // alert("success= " + success);
    }
    else  if( service.value === "请选择服务") {
      success = 0;
     //  alert("success= " + success);
    }
    else if(mark.value.length == 0 && mark.value.length >= 4) {
      success = 0;
     //  alert("success= " + success);
    }
    for(var i = 0; i<3; i++) {
      if(mark.value[i]<'0' || mark.value[i]>'9') {
        success = 0;
        // alert("success= " + success);
        break;
      }
    }
    if(mark.value.length == 3 && parseInt(mark.value)>100) {
      success = 0;
      // alert("success= " + success);
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
     //alert(salerId.join(""));
     
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

.controller("newtactsCtrl",function($scope, $state, $ionicHistory, $http,PersonalInformations) {

  $scope.saveNewTacts = function() {
    var success = 1;
    var UserId = document.getElementById("userId");
    var UserPassword = document.getElementById("userPassword");
    var UserName = document.getElementById("userName");
    var UserPhone = document.getElementById("userPhone");
    var UserType= document.getElementById("userType");  // int!
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
         PersonalInformations.create(UserId.value,UserName.value,UserPassword.value,UserPhone.value,UserTypeInt,function(){ $state.go("app.contacts");});
       
           
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
         
         if(response.data['type'] === 0){
          UserService.setUserPosition("管理员");
         }
         else if(response.data['type'] === 1){
          UserService.setUserPosition("工程师");
         }
         else if(response.data['type'] === 2){
          UserService.setUserPosition("销售员");
         }
         else{
          UserService.setUserPosition("派单员");
         }

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
.controller("passwordModifyCtrl",function($scope,$state, $ionicHistory, $ionicPopup,UserService, Message_infos){
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
                Message_infos.create(2,UserService.getUserId(),1);
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
.controller("passwordForgetCtrl",function($scope,$state,Message_infos){
  var phone = document.getElementById("phonenumber");
  var button = document.getElementById("submitbutton");
  // if(phone.value.length === 0){
  //   button.disabled = true;
  // }
  $scope.goback = function(){
    $state.go('login');
  }
  $scope.yz = function(){
  //  alert("aaa");
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
    var myid = document.getElementById("myid");
    var tmp = document.getElementById("phonenumber");
    if(tmp.value.length === 0){
      alert("输入为空！");
      return;
    }
    alert(myid.value);
    Message_infos.create(1,myid.value,1);

    alert("申请提交成功，请等待管理员联系");

    $state.go('login');
  }
})

.controller('PersonalFormsCtrl', function($scope, $stateParams, Forms,  PersonalInformations, $state, $location, $ionicScrollDelegate) {
  //PersonalInformations.all(function(response) {
  //  users = response;
//  alert($stateParams.personId);
    $scope.position = PersonalInformations.get($stateParams.personId).position;
 //   alert($scope.position);
    if($scope.position === "销售员") { 
      Forms.getBySalerId($stateParams.personId, function(response){
        $scope.personalforms = response;
      //   for(var i = 0; i<$scope.personalforms.length; i++) {
          //      alert("formsId: " + $scope.personalforms[i].id);
          //    }
      });
    }
    else if($scope.position === "工程师") {
      Forms.getByEngineerId($stateParams.personId, function(response) {
        $scope.personalforms = response;
       //  for(var i = 0; i<$scope.personalforms.length; i++) {
      //          alert("formsId: " + $scope.personalforms[i].id);
       //       }
      });
    } 
// });
   // 后台搭建完成后通过 'http + $stateParams.personId' 获取数据

    $scope.doRefresh = function() {
      //刷新--重新从后台载入数据
      if($scope.position === "销售员") { 
      Forms.getBySalerId($stateParams.personId, function(response){
        $scope.personalforms = response;
      });
    }
    else if($scope.position === "工程师") {
      Forms.getByEngineerId($stateParams.personId, function(response) {
        $scope.personalforms = response;
      });
    } 
      $scope.$broadcast("scroll.refreshComplete");     
    }

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
      $scope.personalforms = PersonalForms.setTime("creatTime");
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
      $scope.personalforms = PersonalForms.setTime("orderTakeTime");
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
      $scope.personalforms = PersonalForms.setTime("finishTime");
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
      $scope.personalforms = PersonalForms.setTime("auditTime");
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
  if($scope.form === null){
    alert("该报修单已经不存在");
  }
  else{
    $scope.form.creatTime = (new Date($scope.form.creatTime)).toLocaleString();
    $scope.form.orderTakeTime = (new Date($scope.form.orderTakeTime)).toLocaleString();
    $scope.form.finishTime = (new Date($scope.form.finishTime)).toLocaleString();
    $scope.form.auditTime = (new Date($scope.form.auditTime)).toLocaleString();
  }

})
.controller('messagePasswordForgetCtrl',function($scope,$stateParams,PersonalInformations,$location){
 // alert($stateParams.contentid);
  $scope.user = PersonalInformations.get($stateParams.contentid);

  
})
.controller('messagePasswordModifyCtrl',function($scope,$stateParams,PersonalInformations,$location){
 // alert("in messagePasswordModifyCtrl " + $stateParams.contentid);
   $scope.user = PersonalInformations.get($stateParams.contentid);

})

.controller('feedCtrl',function($scope,$state,$stateParams,$ionicHistory,Forms){
//  alert($stateParams.formId);
  $scope.form = Forms.get($stateParams.formId);

  // $scope.goback = function(){
  //    //$state.go('app.viewForms-detail',{formId:$stateParams.formId});

  //   $ionicHistory.goBack();
  // }

})

.controller('feedbackCtrl',function($scope, $ionicActionSheet,$state,$timeout,$ionicHistory,$stateParams,Forms){
 // alert($stateParams.formId);
  // $scope.goback = function(){
  //    $state.go("app.viewForms");

  // }
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
    var serial = document.getElementById("serial").value;
    var feedback = document.getElementById("feedback").value;

    Forms.submit($stateParams.formId,serial,feedback,function(){
        
    
       alert("提交完成");
 //      $state.go("app.viewForms");
 
    $ionicHistory.goBack();
    })

  }
})

;

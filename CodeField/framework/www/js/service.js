var userId = "";
var userPwd = "";
var userPosition = "";
var ipAddress = "http://115.159.225.109";

angular.module('starter.service',[])

.factory('PersonalInformations', function($http) {
  var users = [];
  // var users = [{
  //   id: 0,
  //   NO: 'pd00001',
  //   position:'派单员',
  //   phoneNum: '15812345678',
  //   name:'Steven'
  // }, {
  //   id: 1,
  //   NO: 'gl00002',
  //   position:'管理员',
  //   phoneNum: '15812345678',
  //   name:'Emma'
  // }, {
  //   id: 2,
  //   NO: 'pd00003',
  //   position:'派单员',
  //   phoneNum: '15812345678',
  //   name:'Sara'
  // },{
  //   id: 3,
  //   NO: 'gc00001',
  //   position:'工程师',
  //   phoneNum: '15812345678',
  //   name:'David'
  // }, {
  //   id: 4,
  //   NO: 'xs00002',
  //   position:'销售员',
  //   phoneNum: '15812345678',
  //   name:'Paul'
  // }, {
  //   id: 5,
  //   NO: 'pd00003',
  //   position:'派单员',
  //   phoneNum: '15812345678',
  //   name:'Lucy'
  // }];

  return {
    all: function(callback) {
      $http.get(ipAddress + "/users")
      .success(function (response) {
        var userlist = response;
        for(var i = 0; i < userlist.length; i ++){
          var position;
          if(userlist[i].type === 0)position = "管理员";
          else if(userlist[i].type === 1)position = "工程师";
          else if(userlist[i].type === 2)position = "销售员";
          else if(userlist[i].type === 3)position = "派单员";
          users[i] = {
            "id":userlist[i].id,
            "name":userlist[i].name,
            "phoneNum":userlist[i].phone,
            "position":position
          };
           console.log("get user " + users[i].id);

        }
        //   alert("time1");
        //    alert("in service.js "+users.length);
            callback(users);
      })
      .error(function (response) {
        console.log("app getUsers Fail to get---error message : ", response.error);
        alert("获取用户信息失败");
      })
      //alert("time2");
    },
    getall:function(){
      return users;
    },
    get: function(id) {
      for (var i = 0; i < users.length; i++) {
      //  alert(id + " vs " + users[i].id);
        if (users[i].id === parseInt(id)) {
        //   alert("in PersonalInfomations equal " + users[i].name);

             return users[i];
        }
        else{
        }
      }
      return null;
    },
    getByNo:function(no){
      for(var i = 0; i < users.length; i ++){  
     //   alert(no + " vs " + users[i].NO);
        if(no === users[i].id){
          return users[i];
        }
      }
      return null;
    },
    getByName:function(name, position) {
      for(var i = 0; i<users.length; i++){
        if(name == users[i].name && position == users[i].position) {
          return users[i];
        }
      }
      alert("未找到对应信息！");
      return;
    }
  };
})

.factory('UserService',function($http){
  var set = function(id,pwd){
    userId = id;
    userPwd = pwd;
    if(userId[0] === "0"){
        userPosition = "管理员";
      }
      else if(userId[0] === '3'){
        userPosition = "派单员";
      }
      else if(userId[0] === '1' ){
        userPosition = "工程师";
      }
      else if(userId[0] === '2' ){
        userPosition = "销售员";
      }
    }
    return{
    setUser:function(id,pwd){
      set(id,pwd);
    },
    setUserPosition:function(position){
      userPosition = position;
    },
    getUserId:function(){
      return userId;
    },
    getUserPwd:function(){
      return userPwd;
    },
    getUserPosition:function(){
      return userPosition;
    },

    changePassword:function(username, oldPassword, newPassword, callbackSuccess, callbackError){
   //   alert(username + " " + oldPassword + " " + newPassword);
    var authentication = {
      "id" : username,
      "oldPassword" : oldPassword,
      "newPassword": newPassword
    }
    $http({
      method : "POST",
      url : ipAddress + "/users/password/change",
      data : authentication,
      headers:{
        'Content-Type':"application/json"

      }
    }).success(function (data, status, config) {
      console.log("修改密码成功")
      callbackSuccess();
    }).error(function (data, status,config) {
      if (status == 401 || status == 422 || status == 403){
        console.log("修改密码失败-客户端有误");
      }
      else{
        console.log("修改密码失败-错误不明");
      }
      callbackError();
    })
  }

  }
})

.factory('Forms', function($http,PersonalInformations) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data


  ////////////////////////////////////////////////////
  // 在这里需要与后台统一传输的数据。。
  // 1. 传入id（记录顺序。。或许不太重要，以后可删掉）
  // 2. 传入报修单状态展示的颜色（前端比较笨QwQ，没做出来根据文字改变颜色的。。）
  ///////////////////////////////////////////////////////////
  var forms = [];
 // var forms = [{
 //    id: 0,
 //    NO: 'bx131220237',
 //    status: '未接',
 //    statusColor: '#FF0000',
 //    value: 12,
 //    clientName: 'Cindy',
 //    type: '安装调试',
 //    engineerName: 'David',
 //    salesName: 'Mack jack',
 //    time: '',
 //    creatTime: '2016-01-03 12:00',
 //    orderTakeTime: '2016-02-01 12:00',
 //    finishTime: '2016-03-01 12:00',
 //    auditTime: '2016-04-01 15:00'
 //  }];

  return {
    currentId: 0,
    all: function(callback) {

       $http.get(ipAddress + "/repairforms")
      .success(function (response) {
        var formlist = response;
        var statusname;
        var engineerName;
        var salesName;
        var distributerName;


         PersonalInformations.all(function(response){
        for(var i = 0; i < formlist.length; i ++){
          if(formlist[i].status === 0){
            statusname = "未接";
            statusColor = "#FF0000";
          }
          else if(formlist[i].status === 1){
            statusname = "已接单";
            statusColor = "#FF0000";
          }
          else if(formlist[i].status === 2){
            statusname = "已完成";
            statusColor = "#FF0000";
          }
          else if(formlist[i].status === 3){
            statusname = "已审核";
            statusColor = "#444444";
          }
          var servicename;
          if(formlist[i].service === 0){
             servicename = "上门服务";
          }
          else if(formlist[i].service === 1){
            servicename = "安装调试";
          }
          else if(formlist[i].service === 2){
            servicetype = "送货服务";
          }

     //     alert(PersonalInformations.get(formlist[i].engineerId).length);
          var user = PersonalInformations.get(formlist[i].engineerId);
          if(user === null){
            engineerName = "null";
          }
          else{
           engineerName = user.name;

         }
         var user2 = PersonalInformations.get(formlist[i].salerId);
          if(user2 === null){
            salesName = "null";
          }
          else{
           salesName = user2.name;

         }
         var user3 = PersonalInformations.get(formlist[i].distributorId);
          if(user3 === null){
            distributerName = "null";
          }
          else{
            distributerName = user3.name;
          }


     //   alert(formlist[i].creationTime);
          forms[i] = {
            "id":formlist[i].id,
            "status":statusname,
            "statusColor":statusColor,
            "value":formlist[i].grade,
            "type":servicename,
            "clientName":formlist[i].clientName,
            "clientphone":formlist[i].clientPhone,
            "clientunit":formlist[i].clientWorkplace,
            "clientaddr":formlist[i].clientAddress,
            "engineerId":formlist[i].engineerId,
            "engineerName":engineerName,
            "salerId":formlist[i].salerId,
            "salesName":salesName,
            "distributerId":formlist.distributorId,
            "distributerName":distributerName,
            "creatTime":(new Date(formlist[i].creationTime)),
            "orderTakeTime":formlist[i].receiveTime,
            "finishTime":formlist[i].completedTime,
            "auditTime":formlist[i].checkedTime,
          };
        //  console.log("get form creationTime" + formlist[i].creationTime);
      //     alert("forms[i].distributerName  " + forms[i].distributerName);
          console.log("get form engineername " + forms[i].engineerName);

        }
      });
            callback(forms);
      })
      .error(function (response) {
        console.log("app getUsers Fail to get---error message : ", response.error);
        alert("获取用户信息失败");
      })

      return forms;
    },
    remove: function(form) {
      forms.splice(forms.indexOf(form), 1);
    },
    get: function(formId) {
      for (var i = 0; i < forms.length; i++) {
        if (forms[i].id === parseInt(formId)) {
          return forms[i];
        }
      }
      return null;
    },
    getByNo:function(formNo){
      for(var i = 0; i < forms.length; i ++){
        if(formNo === forms[i].NO){
          return forms[i];
        }
      }
      return null;
    },
    setTime: function(timeKind) {
      for (var i = 0; i < forms.length; i++) {
        if (timeKind === "creatTime") {
          forms[i].time = forms[i].creatTime;
        }
        else if (timeKind === "orderTakeTime") {
          forms[i].time = forms[i].orderTakeTime;
        }
        else if (timeKind === "finishTime") {
          forms[i].time = forms[i].finishTime;
        }
        else if (timeKind === "auditTime") {
          forms[i].time = forms[i].auditTime;
        }
      }
      return forms;
    }
  };
})


.factory('PersonalForms', function() {
  ////////////////////////////////////////////////////
  // 个人报修单列表：
  // 通过http请求用户的个人id来获取列表数据
  ///////////////////////////////////////////////////////////
 
 var forms = [{
    id: 0,
    NO: 'bx131220237',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '',
    salesName: '王二麻',
    time: '',
    creatTime: '2016-01-03 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 15:00'
  }, {
    id: 1,
    NO: 'bx131220233',
    status: '已审核',
    statusColor: '#444444',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '王小利',
    salesName: '王二麻',
    time: '',
    creatTime: '2016-01-01 15:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id:2,
    NO: 'bx131220733',
    status: '已接单',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '刘达',
    salesName: '王二麻',
    time: '',
    creatTime: '2016-07-01 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 3,
    NO: 'bx131220283',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '',
    salesName: '王二麻',
    time: '',
    creatTime: '2016-01-01 12:20',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 4,
    NO: 'bx131220333',
    status: '已完成',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '李想',
    salesName: '王二麻',
    time: '',
    creatTime: '2016-04-01 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-22 17:00'
  }];

  return {
    currentId: 0,
    all: function() {
      return forms;
    },
    remove: function(form) {
      forms.splice(forms.indexOf(form), 1);
    },
    get: function(formId) {
      for (var i = 0; i < forms.length; i++) {
        if (i === parseInt(formId)) {
          return forms[i];
        }
      }
      return null;
    },
    setTime: function(timeKind) {
      for (var i = 0; i < forms.length; i++) {
        if (timeKind === "creatTime") {
          forms[i].time = forms[i].creatTime;
        }
        else if (timeKind === "orderTakeTime") {
          forms[i].time = forms[i].orderTakeTime;
        }
        else if (timeKind === "finishTime") {
          forms[i].time = forms[i].finishTime;
        }
        else if (timeKind === "auditTime") {
          forms[i].time = forms[i].auditTime;
        }
      }
      return forms;
    }
  };
})

.factory('MyInformation',function($http,UserService) {
  /*var myInformation = {
    id:01,
    name:'翟微',
    position:'派单员',
    img:'img/photo1.jpg',
    phonenum: '12312341234',
    mark: 100
  }; */
  var myInformation;
   return {
    all: function(callback) {
     //alert("userId: " + UserService.getUserId());
      //alert("userId:  "+ userId);
      $http.get(ipAddress + "/users/" + userId)
      .success(function (response) {


        var information = response;
          var position;
          if(information.type === 0)position = "管理员";
          else if(information.type === 1)position = "工程师";
          else if(information.type === 2)position = "销售员";
          else if(information.type === 3)position = "派单员";
          myInformation= {
            "id":information.id,
            "name":information.name,
            "phoneNum":information.phone,
            "position":position
          };
           console.log("get user " + myInformation.id);

        //   alert("time1");
        //    alert("in service.js "+users.length);
            callback(myInformation);
      })
      .error(function (response) {
        console.log("app getUsers Fail to get---error message : ", response.error);
        alert("获取我的个人信息失败");
      })
      //alert("time2");
    },
    get: function() {
      return myInformation;
    }
  };
})

.factory('Message_infos',function() {
  //type = 0 分值改动的消息通知
  //type = 1 用户申请找回密码的消息通知
  //type = 2 用户修改密码的消息通知
  //type = 3 新的报修单任务通知
  //type = 4 报修单状态更新通知
  //type = 5 报修单删除通知
  //tag = 0  消息未读
  //tag = 1  消息已读

  var message_infos = [{
    type:0,
    id:'bx131220733',
    tag:0,
    time:'2016-1-8 16:00'
  },
  {
    type:1,
    id:'pd00001',
    tag:0,
    time:'2016-1-8 16:00'
  },
  {
    type:0,
    id:'bx131220283',
    tag:1,
    time:'2016-10-8 16:00'
  },
  {
    type:2,
    id:'pd00003',
    tag:1,
    time:'2016-1-8 12:00'
  },
  {
    type:3,
    id:'bx131220283',
    tag:0,
    time:'2016-11-8 16:00'
  },
  {
    type:4,
    id:'bx131220233',
    tag:0,
    time:'2016-1-18 16:00'
  },
  {
    type:5,
    id:'bx131220233',
    tag:0,
    time:'2016-2-18 16:00'
  }

  ];

  return {
    all:function() {
      //for(var i = 0; i < message_infos.length; i ++){

        //根据type类型确定消息标题、消息完整内容
        // if(message_infos[i].type === 0){
        //   message_infos[i].title = "分值改动通知";
        //   message_infos[i].full_information = "报修单"+ message_infos[i].id + "的分值被修改了";
        // }
        // else if(message_infos[i].type === 1){
        //   message_infos[i].title = "密码找回通知";
        //   message_infos[i].full_information = "用户"+ message_infos[i].id + "申请找回登录密码";  
        // }
        // else if(message_infos[i].type === 2){
        //   message_infos[i].title = "密码修改通知";
        //   message_infos[i].full_information = "用户" + message_infos[i].id + "修改了登录密码";
        // }
        // else if(message_infos[i].type === 3){
        //   message_infos[i].title = "新任务通知";
        //   message_infos[i].full_information = "你被分配了"+ message_infos[i].id + "相关任务";
        // }
        // else if(message_infos[i].type === 4){
        //   message_infos[i].title = "状态更新通知";
        //   message_infos[i].full_information = "你的报修单" + message_infos[i].id + "有新动态";
        // }
        // else if(message_infos[i].type === 5){
        //   message_infos[i].title = "删除通知";
        //   message_infos[i].full_information = "你的报修单" + message_infos[i].id + "被删除";
        // }

//}
      return message_infos;
    },
    get: function(message_infoId) {
      for (var i = 0; i < message_infos.length; i++) {
        if (i === parseInt(message_infoId)) {
          return message_infos[i];
        }
      }
      return null;
    },
    getUnreadCount:function(){//获得未读消息数
      var count = 0;
      for(var i = 0; i < message_infos.length; i ++){
        if(message_infos[i].tag === 0){
           count ++;
        }
      }
      return count;
    }
  };
}) 

.factory("MarkChanges",function() {
  var markChanges = [{
    id:0,
    currentValue: 50,
    changeValue: +10,
    time: "2016-11",
    content:"完成修理工作"
  },{
    id:1,
    currentValue: 650,
    changeValue: +10,
    time: "2016-11",
    content:"遭到顾客投诉"
  },{
    id:2,
    currentValue: 75,
    changeValue: +15,
    time: "2016-11",
    content:"顾客给出五星好评"
  },{
    id:3,
    currentValue: 80,
    changeValue: +5,
    time: "2016-10",
    content:"遭到顾客投诉"
  },{
    id:4,
    currentValue: 70,
    changeValue: -10,
    time: "2016-10",
    content:"顾客给出五星好评"
  },{
    id:5,
    currentValue: 65,
    changeValue: -5,
    time: "2016-10",
    content:"遭到顾客投诉"
  },{
    id:6,
    currentValue: 75,
    changeValue: +10,
    time: "2016-9",
    content:"顾客给出五星好评"
  },{
    id:7,
    currentValue: 85,
    changeValue: +10,
    time: "2016-8",
    content:"遭到顾客投诉"
  },{
    id:8,
    currentValue: 80,
    changeValue: -5,
    time: "2016-8",
    content:"顾客给出五星好评"
  },{
    id:9,
    currentValue: 90,
    changeValue: +10,
    time: "2016-7",
    content:"遭到顾客投诉"
  },{
    id:10,
    currentValue: 70,
    changeValue: -20,
    time: "2016-7",
    content:"顾客给出五星好评"
  }];

  return {
    all:function() {
      return markChanges;
    }
  };
})
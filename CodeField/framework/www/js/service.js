angular.module('starter.service',[])

.factory('Users',function() {
   
   var users = [{
      id: 0,
      name: 'Steven'
   }, {
      id: 1,
      name: 'Emma'
   }, {
      id: 2,
      name: 'Sara'
   }, {
      id: 3,
      name: 'David'
   }, {
      id: 4,
      name: 'Paul'
   }, {
      id: 5,
      name: 'Lucy'
   }, {
      id: 6,
      name: 'Mary'
   }, {
      id: 7,
      name: 'Martin'
   }, {
      id: 8,
      name: 'Mack jack'
   }, {
      id: 9,
      name: 'Amy'
   }, {
      id: 10,
      name: 'Sam'
   }, {
      id: 11,
      name: 'Lucis'
   }, {
      id: 12,
      name: 'Smith'
      }, {
      id: 13,
      name: 'Wendy'
   }, {
      id: 14,
      name: 'Nick'
   }, {
      id: 15,
      name: 'Cindy'
   }, {
      id: 16,
      name: 'Helen'
   }, {
      id: 17,
      name: 'Amanda'
   }, {
      id: 18,
      name: 'Lisa'
   }, {
      id: 19,
      name: 'Tina'
   }];
   
   return {
   	all: function() {
   		return users;
   	},
   remove: function(user) {
      users.splice(users.indexOf(user), 1);
    },
    // getFromGroup:function(userId) {
    //   for(var i=0;i<users.length;i++) {
    //     if(i === parseInt(userId))
    //   }
    // },
    // searchuser:function(username) {
    //   for (var i = 0; i < phones.length; i++) {
    //       if(users[i].group === phonename[0])
    //         return users[i];
    //     // for(var j=0; j < phones[i].persons.length; j++) {
    //     //    if (users[i].persons[j].name === phonename) {
    //     //      return phones[i].persons[j];
    //     //   }
    //     // }
    //   }
    //   return null;
    // },
    get: function(id) {
      for (var i = 0; i < users.length; i++) {
           if (users[i].id === parseInt(id)) {
             return users[i];
        }
      }
      return null;
    }
   /* getfromname: function(name) {
      for(var i=0; i<phones.length; i++) {
        if(phones[i].name === name)
          return phones[i];
      }
    }*/
  };
})

.factory('PersonalInformations', function() {
  var users = [{
    id: 0,
    NO: 'gc00001',
    position:'派单员',
    name:'Steven'
  }, {
    id: 1,
    NO: 'gc00002',
    position:'管理员',
    name:'Emma'
  }, {
    id: 2,
    NO: 'gc00003',
    position:'派单员',
    name:'Sara'
  },{
    id: 3,
    NO: 'xs00001',
    position:'工程师',
    name:'David'
  }, {
    id: 4,
    NO: 'xs00002',
    position:'销售员',
    name:'Paul'
  }, {
    id: 5,
    NO: 'xs00003',
    position:'派单员',
    name:'Lucy'
  },{
    id: 6,
    NO: 'pd00001',
    position:'销售员',
    name:'Mary'
  }, {
    id: 7,
    NO: 'pd00002',
    position:'管理员',
    name:'Martin'
  }, {
    id: 8,
    NO: 'xs00002',
    position:'销售员',
    name:'Mack jack'
  }, {
    id: 9,
    NO: 'xs00003',
    position:'工程师',
    name:'Amy'
  },{
    id: 10,
    NO: 'pd00001',
    position:'派单员',
    name:'Sam'
  }, {
    id: 11,
    NO: 'pd00002',
    position:'工程师',
    name:'Lucis'
  }, {
    id: 12,
    NO: 'pd00003',
    position:'工程师',
    name:'Smith'
  }];

  return {
    all: function() {
      return users;
    },
    get: function(id) {
      for (var i = 0; i < users.length; i++) {
           if (users[i].id === parseInt(id)) {
             return users[i];
        }
      }
      return null;
    }
  };
})

.factory('Forms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data


  ////////////////////////////////////////////////////
  // 在这里需要与后台统一传输的数据。。
  // 1. 传入id（记录顺序。。或许不太重要，以后可删掉）
  // 2. 传入报修单状态展示的颜色（前端比较笨QwQ，没做出来根据文字改变颜色的。。）
  ///////////////////////////////////////////////////////////
 
 var forms = [{
    id: 0,
    NO: 'bx131220237',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: 'Cindy',
    type: '安装调试',
    engineerName: '',
    salesName: 'Mack jack',
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
    clientName: 'Frank',
    type: '安装调试',
    engineerName: '王小利',
    salesName: 'Paul',
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
    clientName: 'Cindy',
    type: '安装调试',
    engineerName: '刘达',
    salesName: '王岩',
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
    clientName: 'Wendy',
    type: '安装调试',
    engineerName: '',
    salesName: 'Mary',
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
    clientName: 'Linda',
    type: '安装调试',
    engineerName: '李想',
    salesName: '张鑫',
    time: '',
    creatTime: '2016-04-01 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-22 17:00'
  }, {
    id: 5,
    NO: 'bx131220233',
    status: '已审核',
    statusColor: '#444444',
    value: 12,
    clientName: 'Frank',
    type: '安装调试',
    engineerName: '王小利',
    salesName: 'Mack jack',
    time: '',
    creatTime: '2016-01-01 15:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 6,
    NO: 'bx131220733',
    status: '已接单',
    statusColor: '#FF0000',
    value: 12,
    clientName: 'Cindy',
    type: '安装调试',
    engineerName: '刘达',
    salesName: '王岩',
    time: '',
    creatTime: '2016-07-01 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 7,
    NO: 'bx131220283',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: 'Wendy',
    type: '安装调试',
    engineerName: '',
    salesName: '刘琴',
    time: '',
    creatTime: '2016-01-01 12:20',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
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

.factory('MyInformation',function() {
  var myInformation = {
    id:01,
    name:'翟微',
    position:'派单员',
    img:'img/photo1.jpg',
    phonenum: '12312341234',
    mark: 100
  };
  return {
    get: function() {
      return myInformation;
    },
    setPosition: function(newPostiton) {
      myInformation. position = newPostiton;
      return myInformation;
    }
  };
})

.factory('Message_infos',function() {
  var message_infos = [{
    type:0,
    title:'分值改动通知',
    full_information:'派单员小李修改了报修单的分值',
    id:'bx131220733',
    tag:0,
    state:'未读',
    format:"badge icon-badge assertive"
  },
  {
    type:1,
    title:'密码找回通知',
    full_information:'用户gc13122001申请找回登录密码',
    id:'bx131220283',
    tag:0,
    state:'未读',
    format:"badge icon-badge assertive"
  },
  {
    type:0,
    title:'分值改动通知',
    full_information:'派单员小李修改了报修单的分值',
    id:'bx131220283',
    tag:1,
    state:'已读',
    format:"badge icon-badge"
  },
  {
    type:2,
    title:'密码修改通知',
    full_information:'用户gc13122001修改了登录密码',
    id:'bx131220733',
    tag:1,
    state:'已读',
    format:"badge icon-badge"
  }];

  return {
    all:function() {
      return message_infos;
    },
    get: function(message_infoId) {
      for (var i = 0; i < message_infos.length; i++) {
        if (i === parseInt(message_infoId)) {
          return message_infos[i];
        }
      }
      return null;
    }
  };
}) 

.factory("MarkChanges",function() {
  var markChanges = [{
    id:0,
    value:+10,
    title:"完成修理工作"
  },{
    id:1,
    value:-10,
    title:"遭到顾客投诉"
  },{
    id:2,
    value:+20,
    title:"顾客给出五星好评"
  }];

  return {
    all:function() {
      return markChanges;
    }
  };
})
angular.module('starter.service',[])

.factory('Phones',function() {
   
   var phones = [{
   	  group: 'A',
   	  persons: [{
        id: 0, 
        name: 'AZHU',
        phonenum: '18305185997'
      },{
        id: 1,
        name: 'AZZ',
        phonenum: '15850552363'
      }]
   }, {
      group: 'B',
      persons: [{
         id: 2,
   	     name: 'Benben',
   	     phonenum: '13778702182'
       }]
   	// }, {

    //   id: 3,
   	// 	name: 'Zhuzhu',
   	// 	group: 'Z',
   	// 	phonenum: '15850552273'
   	// }, {
    //   id: 3,
   	// 	name: 'Wenwen',
   	// 	group: 'W',
   	// 	phonenum: '15850552363'
   }];
   
   return {
   	all: function() {
   		return phones;
   	},
   remove: function(phone) {
      phones.splice(phones.indexOf(phone), 1);
    },
    // getFromGroup:function(phoneId) {
    //   for(var i=0;i<phones.length;i++) {
    //     if(i === parseInt(phoneId))
    //   }
    // },
    searchphone:function(phonename) {
      for (var i = 0; i < phones.length; i++) {
          if(phones[i].group === phonename[0])
            return phones[i];
        // for(var j=0; j < phones[i].persons.length; j++) {
        //    if (phones[i].persons[j].name === phonename) {
        //      return phones[i].persons[j];
        //   }
        // }
      }
      return null;
    },
    get: function(personId) {
      for (var i = 0; i < phones.length; i++) {
        for(var j=0; j < phones[i].persons.length; j++) {
           if (phones[i].persons[j].id === parseInt(personId)) {
             return phones[i].persons[j];
          }
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
  var engineers = [{
    id: 0,
    NO: 'gc00001',
    name:'Amy'
  }, {
    id: 1,
    NO: 'gc00002',
    name:'Andy'
  }, {
    id: 2,
    NO: 'gc00003',
    name:'Bob'
  }]

  var salesmans = [{
    id: 0,
    NO: 'xs00001',
    name:'Cindy'
  }, {
    id: 1,
    NO: 'xs00002',
    name:'David'
  }, {
    id: 2,
    NO: 'xs00003',
    name:'Eric'
  }]

  var distributers = [{
    id: 0,
    NO: 'pd00001',
    name:'Etone'
  }, {
    id: 1,
    NO: 'pd00002',
    name:'Frank'
  }, {
    id: 2,
    NO: 'pd00003',
    name:'Gracie'
  }];

  return {
    all_engineer: function() {
      return engineers
    },
    all_salesman: function() {
      return salesmans
    },
    all_distributer: function() {
      return distributers
    }
  }
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
    id: 1,
    NO: 'bx131220237',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '',
    creatTime: '2016-01-03 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 15:00'
  }, {
    id: 2,
    NO: 'bx131220233',
    status: '已审核',
    statusColor: '#444444',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '',
    creatTime: '2016-01-01 15:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 3,
    NO: 'bx131220733',
    status: '已接单',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '',
    creatTime: '2016-07-01 12:00',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 4,
    NO: 'bx131220283',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '',
    creatTime: '2016-01-01 12:20',
    orderTakeTime: '2016-02-01 12:00',
    finishTime: '2016-03-01 12:00',
    auditTime: '2016-04-01 17:00'
  }, {
    id: 5,
    NO: 'bx131220333',
    status: '已完成',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
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
    position:'工程师',
    img:'img/photo1.jpg',
    phonenum: '12312341234',
    mark: 100
  };
  return {
    get: function() {
      return myInformation;
    },
  };
})

.factory('Message_infos',function() {
  var message_infos = [{
    id:01,
    title:'分值改动通知',
    full_information:'派单员小李修改了报修单XXXXXXXX的分值',
    img:'img/photo1.jpg'
  },{
    id:02,
    title:'待办事项通知',
    full_information:'接下来你要做的是添加小李为派单员',
    img:'img/ionic.png'
  }];

  return {
    all:function() {
      return message_infos;
    },
    get: function(message_infoId) {
      for (var i = 0; i < message_infos.length; i++) {
        if (i === parseInt(message_infoId)-1) {
          return message_infos[i];
        }
      }
      return null;
    }
  };
}) 

.factory("MarkChanges",function() {
  var markChanges = [{
    id:01,
    value:+10,
    title:"完成修理工作"
  },{
    id:02,
    value:-10,
    title:"遭到顾客投诉"
  },{
    id:03,
    value:+20,
    title:"顾客给出五星好评"
  }];

  return {
    all:function() {
      return markChanges;
    }
  };
})
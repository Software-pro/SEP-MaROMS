angular.module('starter.service',[])

.factory('Phones',function() {
   
   var phones = [{
      id: 0,
   	  name: 'Aben',
   	  group: 'A',
   	  phonenum: '18305185997'

   }, {
      id: 1,
   	  name: 'Benben',
   	  group: 'B',
   	  phonenum: '13778702182'
   	}, {
      id: 2,
   		name: 'Zhuzhu',
   		group: 'Z',
   		phonenum: '15850552273'
   	}, {
      id: 3,
   		name: 'Wenwen',
   		group: 'W',
   		phonenum: '15850552363'
   }];
   
   return {
   	all: function() {
   		return phones;
   	},
   remove: function(phone) {
      phones.splice(phones.indexOf(phone), 1);
    },
    get: function(phoneId) {
      for (var i = 0; i < phones.length; i++) {
        if (i === parseInt(phoneId)) {
          return phones[i];
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
    id: 1,
    NO: 'bx131220233',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '2016-01-01 17:00'
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
    time: '2016-01-01 17:00'
  }, {
    id: 3,
    NO: 'bx131220233',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '2016-01-01 17:00'
  }, {
    id: 4,
    NO: 'bx131220233',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '2016-01-01 17:00'
  }, {
    id: 5,
    NO: 'bx131220233',
    status: '未接',
    statusColor: '#FF0000',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '2016-01-01 17:00'
  }];

  return {
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
    }
  };
})

.factory('PersonalInformation',function() {
  var personalInformation = {
    id:01,
    name:'翟微',
    position:'工程师',
    img:'img/photo1.jpg'
  };
  return {
    get: function() {
      return personalInformation;
    }
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
    }
  };
}) 
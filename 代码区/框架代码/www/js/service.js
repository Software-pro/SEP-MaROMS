angular.module('starter.service',[])

.factory('phones',function() {
   
   var Phones = [{
   	  name: 'Aben',
   	  group: 'A',
   	  phonenum: '18305185997'
   }, {
   	  name: 'Benben',
   	  group: 'B',
   	  phonenum: '13778702182'
   	}, {
   		name: 'Zhuzhu',
   		group: 'Z',
   		phonenum: '15850552273'
   	}, {
   		name: 'Wenwen',
   		group: 'W',
   		phonenum: '15850552363'
   }];
   
   return {
   	all: function() {
   		return Phones;
   	}
   };
})

.factory('Forms', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
 var forms = [{
    id: 1,
    NO: 'bx131220233',
    status: '未接',
    value: 12,
    clientName: '彭滟茹',
    type: '安装调试',
    engineerName: '无',
    salesName: '张琴',
    time: '2016-01-01 17:00'
  }, {
    id: 2,
    NO: 'bx131220233',
    status: '未接',
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
});

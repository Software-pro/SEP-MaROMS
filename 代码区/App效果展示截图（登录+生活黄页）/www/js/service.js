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
});
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
})

.controller('ViewFormsCtrl', function($scope) {
  $scope.forms = [{
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
})


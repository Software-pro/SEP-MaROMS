angular.module('starter',['ionic'])
.controller('app2Ctrl',function($scope){
	$scope.log = "表单详情";
    $scope.number = "123456";
    $scope.state = "已审核";
    $scope.clientname = "张三";
    $scope.clientphone = "12345678910";
    $scope.clientunit = "南京大学";
    $scope.clientaddr = "江苏省南京市";
    $scope.service = "安装调试";
    $scope.engineer = "李四";
    $scope.salesman = "王二";
    $scope.stocknumber = "123";
    $scope.createtime = "2016-03-01";
    $scope.accepttime = "2016-03-01";
    $scope.finishtime = "2016-03-01";
    $scope.checktime = "2016-03-01";


  
})
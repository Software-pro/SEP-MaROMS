// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter',['ionic','starter.controllers','starter.service'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('login',{
      url:'/login',
      templateUrl:'templates/login.html',
      controller:'LoginCtrl'
    })

   .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    })

    .state('app.viewForms', {
      url: '/viewForms',
      views: {
        'menuContent': {
          templateUrl: 'templates/menu-viewForms.html',
          controller: 'ViewFormsCtrl'
        }
      }
    })   

    .state('app.contacts',{
       url:'/contacts',
       views: {
         'menuContent': {
           templateUrl:'templates/menu-contacts.html',
           controller: 'contactsCtrl'
        }
       }
    })

    .state('app.contact-detail', {
      url:'/contacts/:personId',
      views: {
        'menuContent': {
          templateUrl:'templates/contact-detail.html',
          controller: 'contactdetailCtrl'
        }
      }
    })

    .state('app.my',{
       url:'/my',
       views: {
         'menuContent': {
           templateUrl:'templates/menu-my.html',
           controller: 'myCtrl'
        }
       }
    })

    
    .state('app.message',{
       url:'/message',
       views: {
         'menuContent': {
           templateUrl:'templates/menu-message.html',
           controller: 'messageCtrl'
        }
       }
    })

    .state('app.viewForms-newForm',{
      url:'/viewForms/viewForms-newForm',
      views: {
        'menuContent': {
          templateUrl:'templates/viewForms-newForm.html',
          controller: 'newFormCtrl'
        }
      }
    })

    .state('app.viewForms-editForm',{
      url:'/viewForms/viewForms-editForm',
      views: {
        'menuContent': {
          templateUrl:'templates/viewForms-editForm.html',
          controller: 'editFormCtrl'
        }
      }
    })
    .state('app.viewForms-detail',{
      url:'/viewForms/:formId',
      views: {
        'menuContent': {
          templateUrl:'templates/viewForms-detail.html',
          controller: 'formDetailCtrl'
        }
      }
    })

   .state('app.my-detail', {
      url:'/my/my-detail',
      views: {
        'menuContent' : {
          templateUrl:'templates/my-detail.html',
          controller: 'myDetailCtrl'
        }
      }
    })

    .state('app.message-detail', {
      url:'/message/:message_infoId',
      views: {
        'menuContent': {
          templateUrl:'templates/message-detail.html',
          controller:'messageDetailCtrl'
        }
      }
    })

     .state('app.mark', {
      url:'/my/mark',
      views: {
        'menuContent': {
          templateUrl:'templates/mark.html',
          controller:'markCtrl'
        }
      }
    })

     .state('password-modify',{
      url:'/password-modify',
        cache:false,//该页面无缓冲
        templateUrl:'templates/password-modify.html',
        controller:'passwordModifyCtrl'
     }) 

     .state('password-forget',{
      url:'/password-forget',
        cache:false,//该页面无缓冲
        templateUrl:'templates/password-forget.html',
        controller:'passwordForgetCtrl'
     })

     .state('app.detail-personalForms',{
      url:'/detail-personalForms/:personId',
      views: {
        'menuContent': {
          templateUrl:'templates/detail-personalForms.html',
          controller: 'PersonalFormsCtrl'
        }
      }
    })
     ;
    $urlRouterProvider.otherwise('/login');     

})

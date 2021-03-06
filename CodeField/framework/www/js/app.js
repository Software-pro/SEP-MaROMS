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
      cache:false,
      templateUrl:'templates/login.html',
      controller:'LoginCtrl'
    })

   .state('app', {
    url: '/app',
    abstract: true,
    cache:false,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
    })

    .state('app.viewForms', {
      url: '/viewForms',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/menu-viewForms.html',
          controller: 'ViewFormsCtrl'
        }
      }
    })   

    .state('app.contacts',{
       url:'/contacts',
       cache:false,
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
      // cache:false,
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

    .state('app.contacts-newtacts',{
      url:'/contacts/contacts-newtacts',
      cache:false,
      views: {
        'menuContent' : {
          templateUrl:'templates/contacts-newtacts.html',
          controller:'newtactsCtrl'
        }
      }
    })

    .state('app.viewForms-editForm',{
      url:'/viewForms/viewForms-editForm',
      cache:false,
      views: {
        'menuContent': {
          templateUrl:'templates/viewForms-editForm.html',
          controller: 'editFormCtrl'
        }
      }
    })
    .state('app.viewForms-detail',{
      url:'/viewForms/:formId',
      cache:false,
      views: {
        'menuContent': {
          templateUrl:'templates/viewForms-detail.html',
          controller: 'formDetailCtrl'
        }
      }
    })

    .state('app.message-modify',{
      url:'/message/0/:contentid',
      cache:false,
      views:{
        'menuContent':{
          templateUrl:'templates/message-modify.html',
          controller:'markModifyCtrl'
        }
      }

    })

    .state('app.message-passwordforget',{
      url:'/message/1/:contentid',
      views:{
        'menuContent':{
          templateUrl:'templates/message-passwordforget.html',
          controller:'messagePasswordForgetCtrl'
        }
      }
    })

    .state('app.message-passwordmodify',{
      url:'/message/2/:contentid',
      views:{
        'menuContent':{
          templateUrl:'templates/message-passwordmodify.html',
          controller:'messagePasswordModifyCtrl'
        }
      }
    })
    
    .state('app.message-newtask',{
      url:'/message/3/:formId',
      views:{
        'menuContent':{
          templateUrl:'templates/viewForms-detail.html',
          controller:'formDetailCtrl'
        }
      }
    })

    
    .state('app.message-statechange',{
      url:'/message/4/:formId',
      views:{
        'menuContent':{
          templateUrl:'templates/viewForms-detail.html',
          controller:'formDetailCtrl'
        }
      }
    })

     .state('app.mark', {
      url:'/mark/:personId',
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
      cache:false,
      views: {
        'menuContent': {
          templateUrl:'templates/detail-personalForms.html',
          controller: 'PersonalFormsCtrl'
        }
      }
    })

     .state('app.feedback',{
      url:'/feedback/:formId',
      cache:false,
      views:{
        'menuContent':{
         templateUrl:'templates/feedback.html',
         controller:'feedCtrl'
       }
      }
     })

     .state('app.detail-feedback',{
      url:'/detail-feedback/:formId',
      cache:false,
      views:{
        'menuContent':{
         templateUrl:'templates/detail-feedback.html',
         controller:'feedbackCtrl'
       }
     }
     })

     ;
    $urlRouterProvider.otherwise('/login');     

})

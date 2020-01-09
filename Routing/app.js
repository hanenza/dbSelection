let app = angular.module('dbSelection', ["ngRoute", 

]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/HomePage/HomePage.html',
            controller : 'HomePageController as HomePageController'
        })
        .when('/HomePage', {
            // this is a template
            templateUrl: 'pages/HomePage/HomePage.html',
            controller : 'HomePageController as HomePageController'
        })
        .when('/LogoutPage', {
            // this is a template
            templateUrl: 'pages/LogoutPage/LogoutPage.html',
            controller : 'LogoutPageController as LogoutPagerController'
        })
        .when('/RegisterPage', {
            templateUrl: 'pages/RegisterPage/RegisterPage.html',
            controller : 'RegisterPageController as RegisterPageController'
        })
        .when('/MyProjects', {
            templateUrl: 'pages/MyProjects/MyProjects.html',
            controller : 'MyProjectsController as MyProjectsController'
        })
        .when('/NewProject', {
            templateUrl: 'pages/NewProject/NewProject.html',
            controller : 'NewProjectController as NewProjectController'
        })
        .when('/UMLEditor', {
            templateUrl: 'pages/UMLEditor/UMLEditor.html',
            controller : 'UMLEditorController as UMLEditorController'
        })
        .when('/SQLEditor', {
            templateUrl: 'pages/SQLEditor/SQLEditor.html',
            controller : 'SQLEditorController as SQLEditorController'
        })
        .when('/NFRTable', {
            templateUrl: 'pages/NFRTable/NFRTable.html',
            controller : 'NFRTableController as NFRTableController'
        })
        .when('/MatrixWeight', {
            templateUrl: 'pages/MatrixWeight/MatrixWeight.html',
            controller : 'MatrixWeightController as MatrixWeightController'
        })
        .when('/AboutPage', {
            templateUrl: 'pages/AboutPage/AboutPage.html',
            controller : 'AboutPageController as AboutPageController'
        })
        .when('/RestPassword', {
            templateUrl: 'pages/RestPassword/RestPassword.html',
            controller : 'RestPasswordController as RestPasswordController'
        })
        .otherwise(
            { redirectTo: '/' }
            );         
});
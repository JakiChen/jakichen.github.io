// iReader App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('iReader', [
			//libraries
			'ionic', 
			'iReader.controllers', 
			'iReader.services'
			])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

})

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider
	
	// setup an abstract state for the tabs directive
	.state('tab', {
		url: "/tab",
		abstract: true,
		templateUrl: "templates/tabs.html"
	
	})
	
	// Each tab has its own nav history stack:
	
	.state('tab.dash', {
		url: '/dash',
		views: {
			'tab-dash': {
				templateUrl: 'templates/tab-dash.html',
				controller: 'DashCtrl'
	
			}
	
		}
	
	})
	
	.state('tab.magzine', {
		url: '/magzine',
		views: {
			'tab-magzine': {
				templateUrl: 'templates/tab-magzine.html',
				controller: 'magzineCtrl'
	
			}
	
		}
	
	})
	
	.state('tab.discovery', {
		url: '/discovery',
		views: {
			'tab-discovery': {
				templateUrl: 'templates/tab-discovery.html',
				controller: 'discoeryCtrl'
	
			}
	
		}
	
	})
	.state('tab.discovery-category', {
		url: '/discovery-category',
		views: {
			'tab-discovery': {
				templateUrl: 'templates/tab-discovery-category.html',
				controller: 'discoeryCategoryCtrl'
	
			}
	
		}
	
	})
	
	.state('tab.top', {
		url: '/top',
		views: {
			'tab-top': {
				templateUrl: 'templates/tab-top.html',
				controller: 'topCtrl'
	
			}
	
		}
	
	})
	
	.state('tab.more', {
		url: '/more',
		views: {
			'tab-more': {
				templateUrl: 'templates/tab-more.html',
				controller: 'moreCtrl'
	
			}
	
		}
	
	})
	
	// Each Pages has its own nav history stack:
	.state('sns', {
		url: "/sns",
		templateUrl: "templates/sns.html",
		controller: 'snsCtrl'
	})
	
	.state('dayliy', {
		url: "/dayliy",
		templateUrl: "templates/dayliy.html",
		controller: 'dayliyCtrl'
	})
	
	.state('author', {
		url: "/author/:authorID",
		templateUrl: "templates/author.html",
		controller: 'authorCtrl'
	})
	
	.state('article', {
		url: "/author/:authorID/reports/:ID",
		templateUrl: "templates/article.html",
		controller: 'articleCtrl'
	})
	
	.state('discovery-detail', {
		url: "/category/:categoryItem/id/:categoryKey",
		templateUrl: "templates/discovery.html",
		controller: 'discoveryDetailCtrl'
	})
	
	.state('member', {
		url: "/member",
		templateUrl: "templates/friend.html",
		controller: 'friendCtrl'
	})
	
	.state('magzine', {
		url: "/magzine/:categoryKey",
		templateUrl: "templates/discovery.html",
		controller: 'magzineListCtrl'
	})
	
	.state('collection', {
		url: "/collection/:categoryKey",
		templateUrl: "templates/discovery.html",
		controller: 'collectionListCtrl'
	})
	
	.state('comments', {
		url: "/comments",
		templateUrl: "templates/comments.html",
		controller: 'commentsCtrl'
	})
		
	.state('add-subscribe', {
		url: "/add-subscribe",
		templateUrl: "templates/add-subscribe.html",
		controller: 'addSubscribeCtrl'
	})
	
	.state('search', {
		url: "/search",
		templateUrl: "templates/search.html",
		controller: 'searchCtrl'
	})
	
	.state('welcome', {
		url: "/welcome",
		templateUrl: "templates/welcome.html",
		controller: 'welcomeCtrl'
	})
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/tab/dash');

});
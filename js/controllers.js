/*!
 * Controller.JS
 * Version 1.0.0
 * (c) 2010-2014 wei2c.com http://wei2c.com
 * Author: developers@wei2c.com
 */
 
goPage = 1;


angular.module('iReader.controllers', [])
/*! 
 *
 * Html filter
 * Name: to_trusted
 *
 */
.filter('to_trusted', ['$sce', function ($sce) {
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}])
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: WelcomeCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('welcomeCtrl', function($scope, $state) {
	
})
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: DashCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('DashCtrl', function($scope, $state, MyReadingList) {
	$scope.showBack = false;
	//My Reading List Data
	$scope.readinglist = MyReadingList.all();
})
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: MagzineCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('magzineCtrl', function($scope,$http) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	//Week Top10 Data
	$http.get(	BaseURL + '/service/data/category/magzine/config.json'	)
		 .success(function(data, status, headers, config){
			 $scope.magzine = data;
		 });
})
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: DiscoveryCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('discoeryCtrl', function($scope,$state,$http) { 

	$scope.myTitle ='<a href="#/tab/discovery" nav-clear class="icon-button nav-icon-match-active">匹配</a>';
	
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	//Week Top10 Data
	$http.get(	BaseURL + '/service/data/category/matching/config.json'	)
		 .success(function(data, status, headers, config){
			 $scope.matching = data;
		 });
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: DiscoveryCategoryCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('discoeryCategoryCtrl', function($scope, $state) {
	
	$scope.myTitle ='<a href="#/tab/discovery" nav-clear class="icon-button nav-icon-match">匹配</a>';
	$scope.showMore = function(){
		//how?
	}
})
.controller("categoryCtrl", function($scope, $http, $state) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get(	BaseURL + '/service/data/category/discovery/config.json'	)
		 .success(function(data, status, headers, config){
			 $scope.category = data;
		 });
})
.controller("categoryItemCtrl", function($scope, $http, $state) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get(	BaseURL + '/service/data/category/discovery/'+ $scope.category.categoryItem +'/config.json'	)
		 .success(function(data, status, headers, config){
			 $scope.categoryItems = data;
		 });
})
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: TopCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('topCtrl', function($scope,$http) {
	
	//tabs
	$scope.tabs = [{
		title: '一周榜单',
		url: 'templates/weekTopRanking.tpl.html'
	}, 
	{
		title: '月榜',
		url: 'templates/monthTopRanking.tpl.html'
	}, 
	{
		title: '综合榜单',
		url: 'templates/allTopRanking.tpl.html'
	}];
	
	$scope.currentTab = 'templates/weekTopRanking.tpl.html';
	
	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
	
	
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	//Week Top10 Data
	$http.get(	BaseURL + '/service/data/top_ranking/week.json'	)
		 .success(function(data, status, headers, config){
			 $scope.weekTopRankingList = data;
		 });
	//Month Top10 Data
	$http.get(	BaseURL + '/service/data/top_ranking/month.json'	)
		 .success(function(data, status, headers, config){
			 $scope.monthTopRankingList = data;
		 });
	//All Top10 Data
	$http.get(	BaseURL + '/service/data/top_ranking/all.json'	)
		 .success(function(data, status, headers, config){
			 $scope.allTopRankingList = data;
		 });
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: MoreCtrl
 *
 *-------------------------------------------------------------------------------------!*/
 
.controller('moreCtrl', function($scope) {
	
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: SnsCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('snsCtrl', function($scope,$state) {
	$scope.data = [];
	
	$scope.data.allStatu = 56;
	$scope.data.reviewStatu = 45;
	$scope.data.subscriptionStatu = 11;
	
	//tabs
	$scope.tabs = [{
		title: '动态' + '(' + $scope.data.allStatu + ')',
		url: 'templates/allStatu.tpl.html'
	}, 
	{
		title: '点评' + '(' + $scope.data.reviewStatu+ ')',
		url: 'templates/reviewStatu.tpl.html'
	}, 
	{
		title: '订阅' + '(' +$scope.data.subscriptionStatu+ ')',
		url: 'templates/subscriptionStatu.tpl.html'
	}];
	
	$scope.currentTab = 'templates/allStatu.tpl.html';
	
	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
	
	
	/*!
	 *
	 *Function doRefresh()
	 *
	 */
	$scope.doRefresh = function() {
		//Advertising Item
		$http.get(	BaseURL + '/someData'	)
			 .success(function(data, status, headers, config){
				 $scope.data.advertisingList = data;
		})
		
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
	};

})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: friendCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('friendCtrl', function($scope, $state, $http) {
	$scope.data = [];
	
	$scope.data.allStatu = 56;
	$scope.data.reviewStatu = 45;
	$scope.data.subscriptionStatu = 11;
	
	///tabs
	$scope.tabs = [{
		title: '动态' + '(' + $scope.data.allStatu + ')',
		url: 'templates/allStatu.tpl.html'
	}, 
	{
		title: '点评' + '(' + $scope.data.reviewStatu+ ')',
		url: 'templates/reviewStatu.tpl.html'
	}, 
	{
		title: '订阅' + '(' +$scope.data.subscriptionStatu+ ')',
		url: 'templates/subscriptionStatu.tpl.html'
	}];
	
	$scope.currentTab = 'templates/allStatu.tpl.html';
	
	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}

})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: DayliyCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('dayliyCtrl', function($scope, $interval, $ionicSlideBoxDelegate, $http, $ionicLoading, iReaderService) {
	$ionicLoading.show({
		template: iReaderService.loading()
	})
	
	$scope.data = {};
	 
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	//Advertising Item
	$http.get(	BaseURL + '/service/data/category/dayliy/advertising.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.advertisingList = data;
	})
	//News Item
	$http.get(	BaseURL + '/service/data/category/dayliy/posts.json'	)
		 .success(function(data, status, headers, config){
			 $ionicLoading.hide();
			 $scope.data.articleList = data;
	})
	//Update the ion-slide box
	setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000);
	
    /*!
	 *
	 *Function doRefresh()
	 *
	 */
	$scope.doRefresh = function() {
		//Advertising Item
		$http.get(	BaseURL + '/service/data/category/dayliy/advertising.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.advertisingList = data;
		})
		//News Item
		$http.get(	BaseURL + '/service/data/category/dayliy/posts.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.articleList = data;
		})
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
		 
		//Update the ion-slide box
		setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000)
	};
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: AuthorCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('authorCtrl', function($scope, $stateParams, $http, $state, $interval) {
	
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	// author info
	$http.get(	BaseURL + '/service/data/author/'+ $stateParams.authorID +'/info.json'	)
		 .success(function(data, status, headers, config){
			 $scope.authorInfo = data;
	})
	//auhot article
	$http.get(	BaseURL + '/service/data/author/'+ $stateParams.authorID +'/posts.json'	)
		 .success(function(data, status, headers, config){
			 $scope.articleList = data;
	})
	
	/*!
	 *
	 *Function doRefresh()
	 *
	 */
	 
	$scope.doRefresh = function() {
		// author info
		$http.get(	BaseURL + '/service/data/author/'+ $stateParams.authorID +'/info.json'	)
			 .success(function(data, status, headers, config){
				 $scope.authorInfo = data;
		})
		//auhot article
		$http.get(	BaseURL + '/service/data/author/'+ $stateParams.authorID +'/posts.json'	)
			 .success(function(data, status, headers, config){
				 $scope.articleList = data;
		})
		
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
	};
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: article
 *
 *-------------------------------------------------------------------------------------!*/
.controller('articleCtrl', function($scope, $stateParams, $ionicLoading, $ionicActionSheet, $http, iReaderService) {
	
	var maxPage,
		minPage,
		currentPage = $stateParams.ID;
	
	
	$scope.myTitle ='<ol class="share-group">'
						+ '<li><a class="nav-icon-discus" nav-clear href="#/comments">评论</a></li>'
						+ '<li><a class="nav-icon-share">分享</a></li>'
						+ '<li><a class="nav-icon-collection">收藏</a>' +
					'<ol>';
	
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	
	$scope.authorID = $stateParams.authorID;
	
	// author info
	$http.get(	BaseURL + '/service/data/author/' + $stateParams.authorID + '/articles/' + currentPage + '.json'	)
		 .success(function(data, status, headers, config){
			 $scope.article = data;
	});
	// Get the index page
	$http.get(	BaseURL + '/service/data/author/' + $stateParams.authorID + '/posts.json'	)
		 .success(function(data, status, headers, config){
			 maxPage = data[0].ID
			 minPage = data[ data.length - 1 ].ID
	});
	//function next page
	$scope.nextArticle = function(){
		if ( currentPage < maxPage){
			currentPage = parseInt ( currentPage ) + 1;
			goPage = goPage + 1;
			self.location.href = 'index.html#/author/' + $stateParams.authorID + '/reports/' + currentPage;
		}else{
			$ionicLoading.show({
				template: iReaderService.maxPage_message()
			})
			setTimeout(function(){
				$ionicLoading.hide();
			},1000);
		}
	};
	//function pre page
	$scope.preArticle = function(){
		if (currentPage > minPage){
			currentPage = parseInt ( currentPage ) - 1;
			goPage = goPage + 1;
			self.location.href = 'index.html#/author/' + $stateParams.authorID + '/reports/' + currentPage
		}else{
			$ionicLoading.show({
				template: iReaderService.minPage_message()
			})
			setTimeout(function(){
				$ionicLoading.hide();
			},1000);
		}
	};
	$scope.goBack = function(){
		window.history.go( - goPage)
		goPage = 1;
	}
	
	 // Triggered on a button click, or some other target
	$scope.shareOpen = function() {
	
	// Show the action sheet
	var hideSheet = $ionicActionSheet.show({
		buttons: [
		{ text: '<b>Share</b> This' }
	],
	titleText: '分享文章到',
	cancelText: '取消',
	cancel: function() {
	  // add cancel code..
	},
	buttonClicked: function(index) {
			return true;
		}
	});
	
	// For example's sake, hide the sheet after two seconds
	$timeout(function() {
		hideSheet();
	}, 2000);
	
	};
	
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: discoveryDetailCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('discoveryDetailCtrl', function($scope, $stateParams, $http, $interval, $ionicSlideBoxDelegate) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	
	$scope.data = {};
	//title
	$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/category_name.json'	)
		 .success(function(data, status, headers, config){
			 $scope.categoryTitle = data;
	})
	//advertising
	$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/advertising.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.advertisingList = data;
	})
	//Posts
	$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/posts.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.articleList = data;
	})
	
	//Update the ion-slide box
	setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000);
	
	/*!
	 *
	 *Function doRefresh()
	 *
	 */
	 
	$scope.doRefresh = function() {
		//title
		$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/category_name.json'	)
			 .success(function(data, status, headers, config){
				 $scope.categoryTitle = data;
		})
		//advertising
		$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/advertising.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.advertisingList = data;
		})
		//Posts
		$http.get(	BaseURL + '/service/data/category/discovery/'+ $stateParams.categoryItem + '/'	+ $stateParams.categoryKey + '/posts.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.articleList = data;
		})
		
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
		 
		//Update the ion-slide box
		setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000)
	};
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: AddSubscribeCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('addSubscribeCtrl', function($scope, $state, $http) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get(	BaseURL + '/service/data/author/author.json'	)
		 .success(function(data, status, headers, config){
			 $scope.authorList = data;
	});
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: searchCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('searchCtrl', function($scope, $state, $http, MyReadingList) {
	
	$scope.myTitle ='<input type="search" ng-model="query" placeholder="搜索 文章 公众号" >';

	//My Reading List Data
	$scope.readinglist = MyReadingList.all();
	
	
	//author filter
	$scope.authorFilter = function(Allposts) {
		for(i=0;i < $scope.readinglist.length; i++){
			return ( Allposts.author = $scope.readinglist[i].authorName);
		}
	}
	//tabs
	$scope.tabs = [{
		title: '全部',
		url: 'templates/allPosts.tpl.html'
	}, 
	{
		title: '我的订阅',
		url: 'templates/myReadingList.tpl.html'
	}, 
	{
		title: '微信店铺',
		url: 'templates/weiShop.tpl.html'
	}];
	
	$scope.currentTab = 'templates/allPosts.tpl.html';
	
	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}
	
	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
	
	//All Posts Data
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get(	BaseURL + '/service/data/all/posts.json'	)
		 .success(function(data, status, headers, config){
			 $scope.Allposts = data;
	});
	
	//All Shop Posts Data
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get(	BaseURL + '/service/data/all/posts.shop.json'	)
		 .success(function(data, status, headers, config){
			 $scope.shopPosts = data;
	});
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: magzineListCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('magzineListCtrl', function($scope, $stateParams, $http, $interval, $ionicSlideBoxDelegate) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	
	$scope.data = {};
	//title
	$http.get(	BaseURL + '/service/data/category/magzine/'+ $stateParams.categoryKey + '/category_name.json'	)
		 .success(function(data, status, headers, config){
			 $scope.categoryTitle = data;
	})
	//advertising
	$http.get(	BaseURL + '/service/data/category/magzine/'	+ $stateParams.categoryKey + '/advertising.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.advertisingList = data;
	})
	//Posts
	$http.get(	BaseURL + '/service/data/category/magzine/'	+ $stateParams.categoryKey + '/posts.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.articleList = data;
	})
	
	//Update the ion-slide box
	setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000);
	
	/*!
	 *
	 *Function doRefresh()
	 *
	 */
	 
	$scope.doRefresh = function() {
		//title
		$http.get(	BaseURL + '/service/data/category/magzine/'+ $stateParams.categoryKey + '/category_name.json'	)
			 .success(function(data, status, headers, config){
				 $scope.categoryTitle = data;
		})
		//advertising
		$http.get(	BaseURL + '/service/data/category/magzine/'	+ $stateParams.categoryKey + '/advertising.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.advertisingList = data;
		})
		//Posts
		$http.get(	BaseURL + '/service/data/category/magzine/'	+ $stateParams.categoryKey + '/posts.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.articleList = data;
		})
		
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
		 
		//Update the ion-slide box
		setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000)
	};
})

/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: collectionListCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('collectionListCtrl', function($scope, $stateParams, $http, $interval, $ionicSlideBoxDelegate) {
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	
	$scope.data = {};
	//title
	$http.get(	BaseURL + '/service/data/category/matching/'+ $stateParams.categoryKey + '/category_name.json'	)
		 .success(function(data, status, headers, config){
			 $scope.categoryTitle = data;
	})
	//advertising
	$http.get(	BaseURL + '/service/data/category/matching/'	+ $stateParams.categoryKey + '/advertising.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.advertisingList = data;
	})
	//Posts
	$http.get(	BaseURL + '/service/data/category/matching/'	+ $stateParams.categoryKey + '/posts.json'	)
		 .success(function(data, status, headers, config){
			 $scope.data.articleList = data;
	})
	
	//Update the ion-slide box
	setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000);
	
	/*!
	 *
	 *Function doRefresh()
	 *
	 */
	 
	$scope.doRefresh = function() {
		//title
		$http.get(	BaseURL + '/service/data/category/matching/'+ $stateParams.categoryKey + '/category_name.json'	)
			 .success(function(data, status, headers, config){
				 $scope.categoryTitle = data;
		})
		//advertising
		$http.get(	BaseURL + '/service/data/category/matching/'	+ $stateParams.categoryKey + '/advertising.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.advertisingList = data;
		})
		//Posts
		$http.get(	BaseURL + '/service/data/category/matching/'	+ $stateParams.categoryKey + '/posts.json'	)
			 .success(function(data, status, headers, config){
				 $scope.data.articleList = data;
		})
		
		.finally(function() {
			// Stop the ion-refresher from spinning
			setTimeout(function(){$scope.$broadcast('scroll.refreshComplete')},2000);
		 });
		 
		//Update the ion-slide box
		setTimeout(function(){ $ionicSlideBoxDelegate.update(); },1000)
	};
})
/*! --------------------------------------------------------------------------------------
 *
 * Controller Init
 * Name: commentsCtrl
 *
 *-------------------------------------------------------------------------------------!*/
.controller('commentsCtrl', function($scope, $state, $http) {
	$scope.comments = '';
})

/*!
 * Service.JS
 * Version 1.0.0
 * (c) 2010-2014 wei2c.com http://wei2c.com
 * Author: developers@wei2c.com
 */


// BaseURL
BaseURL = ""; 

angular.module('iReader.services', [])
/*!
 *
 *  iReader.config
 *
 */
.factory('iReaderService',function(){
	//loading templeate
	var messageTpl, 
		loadingTpl ="<div id='wei2c-loading'><span></span><span></span><span></span></div>";	
		
	return{
		loading: function(){
			return loadingTpl;
		},
		maxPage_message: function(){
			return messageTpl = "<div class ='message-alert'>这是第一篇文章</div>";
		},
		minPage_message: function(){
			return messageTpl = "<div class ='message-alert'>没有更多文章了</div>";
		}
	}
})
/*!
 *
 *  My Reading List Data
 *
 */
.factory('MyReadingList', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var MyReadingList = [ 
		{	authorID: "citymag", 
			authorName: "城市画报",
			authorAvatarHrf:"images/avtar_citymag.jpg",
			addTime:"2014-07-23",
			recentArticle:"25岁，如果都教授的形象换成俄罗斯猛男",
			updateTime:"今天"		
		},
		{	authorID: "zaoduke", 
			authorName: "互联网er的早读课",
			authorAvatarHrf:"images/avtar_zaoduke.jpg",
			addTime:"2014-07-21",
			recentArticle:"服务也是门艺术——从中国好商家看生活服务业四大艺术流派",
			updateTime:"06/05"		
		} ,
		{	authorID: "wow36kr", 
			authorName: "36氪",
			authorAvatarHrf:"images/avtar_wow36kr.jpg",
			addTime:"2014-06-22",
			recentArticle:"“节操精选”的社交戏码是从图文“弹幕”玩起的",
			updateTime:"昨天"
		}
	];  

  return {
    all: function() {
      return MyReadingList;
    },
    get: function(authorID) {
      // Simple index lookup
      return MyReadingList[authorID];
    }
  }
})
/*!
 *
 *  Dayliy Data
 *
 */
.factory('DayliyAdvertising', function($http){
	var advertisingList =[];
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get( BaseURL + '/_service/data/category/dayliy/advertising.json' )
		 .success(function(data, status, headers,config){
		 console.log('data success');
		 console.log(data); // object seems fine
	})
	.error(function(data, status, headers,config){
		 console.log('data error');
	})
	.then(function(result){
		 advertisingList = result.data;
	});
	
	return {
		all: function() {
		  console.log('return');
		  console.log(advertisingList);
		  return advertisingList;
		}
	}
	
})

.factory('DayliyArticleList', function($http){
	var dayliyArticleList =[];
	$http.defaults.headers.common["X-Custom-Header"] = "Angular.js";
	$http.get( BaseURL + '/_service/data/category/dayliy/posts.json' )
		 .success(function(data, status, headers,config){
		 console.log('data success');
		 console.log(data); // object seems fine
	})
	.error(function(data, status, headers,config){
		 console.log('data error');
	})
	.then(function(result){
		 dayliyArticleList = result.data;
	});
	
	return {
		all: function() {
		  console.log('return');
		  console.log(dayliyArticleList);
		  return dayliyArticleList;
		}
	}
	
})


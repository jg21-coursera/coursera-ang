(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    restrict:'E',
    templateUrl: '/foundItems.html'
  };
  return ddo;
}

NarrowItDownController.$inject = ['$scope','MenuSearchService'];
function NarrowItDownController($scope,MenuSearchService) {
    var menu = this;
    //var found = [];
    menu.getMatchedMenuItems = function () {
      var promise = MenuSearchService.getMatchedMenuItems(menu.description);
      promise.then(function (result){
        console.log('result',result);
        menu.found= result;
        if (menu.found.length <= 0) {
          menu.message = 'Nothing found';
        }
      });
    };

    menu.removeItem = function (itemIndex) {
      menu.filteredItems.splice(itemIndex,1);
    };

  };


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

  service.getMatchedMenuItems = function(searchTerm) {
    var promise = service.getMenuItems();
    return promise.then(function (response) {
      // process result and only keep items that match
      var foundItems = response.data;
      var filteredItems = [];

      if (searchTerm !== undefined && searchTerm !== '') {
        searchTerm = searchTerm.toLowerCase();
        var menu_items = foundItems.menu_items;
        for (var i = 0; i < menu_items.length; i++) {
          var description = menu_items[i].description;
          if (description.toLowerCase().indexOf(searchTerm) !== -1) {
            filteredItems.push(menu_items[i]);
          }
        }
      }
      console.log('filteredItems',filteredItems);

      // return processed items
      return filteredItems;
    },function (error){
      console.log('Error occured calling HTTP Service:'+error);
    });
  };

}

})();

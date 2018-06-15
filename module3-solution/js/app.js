(function () {
'use strict';

angular.module('MenuItemsApp', [])
.controller('MenuItemsController', MenuItemsController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuItemsController.$inject = ['$scope','MenuItemsService'];
function MenuItemsController($scope,MenuItemsService) {
  var menu = this;
  $scope.description = "";
  menu.filteredItems=[];
  menu.message="";

  var promise = MenuItemsService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data;
    console.log('response',response);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.filterMenuItems = function () {
    menu.message="Nothing found";
    var filterText = $scope.description;
    menu.filteredItems=[];
    if (filterText !== undefined && filterText !== '') {
      filterText = filterText.toLowerCase();
      var menu_items = menu.items.menu_items;
      for (var i = 0; i < menu_items.length; i++) {
        var description = menu_items[i].description;
        if (description.toLowerCase().indexOf(filterText) !== -1) {
          menu.filteredItems.push(menu_items[i]);
        }
      }
    }

    //console.log('menu.filteredItems',menu.filteredItems);
  };

  menu.removeItem = function (itemIndex) {
    menu.filteredItems.splice(itemIndex,1);
  };

  // menu.logMenuItems = function (shortName) {
  //   var promise = MenuCategoriesService.getMenuForCategory(shortName);
  //
  //   promise.then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };

}


MenuItemsService.$inject = ['$http', 'ApiBasePath'];
function MenuItemsService($http, ApiBasePath) {
  var service = this;

  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };


  // service.getMenuForCategory = function (shortName) {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json"),
  //     params: {
  //       category: shortName
  //     }
  //   });
  //
  //   return response;
  // };

}

})();

(function () {
'use strict';

angular.module('MenuItemsApp', [])
.controller('MenuItemsController', MenuItemsController)
.service('MenuItemsService', MenuItemsService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuItemsController.$inject = ['MenuItemsService'];
function MenuItemsController(MenuItemsService) {
  var menu = this;
  var description = menu.description;
  console.log('description',description);

  var promise = MenuItemsService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data;
    console.log('response',response);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.filterMenuItems = function () {
    console.log('description',description);
    var filterText = description;
    var filteredList = [];
    if (filterText == '') {
      filteredList = items;
    } else {
      filterText = filterText.toLowerCase();
      for (item in items) {
        if (item.description.toLowerCase().indexOf(filterText) != -1) {
          filteredList.push(item);
        }
      }
    }

    return filteredList;
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

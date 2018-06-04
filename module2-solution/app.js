(function () {
'use strict';

angular.module('shoppingListCheckOff', [])
.controller('ToBuyListController', ToBuyListController)
.controller('AlreadyBoughtListController', AlreadyBoughtListController)
.service('ShoppingListService', ShoppingListService);

ToBuyListController.$inject = ['ShoppingListService'];
function ToBuyListController(ShoppingListService) {
  var toBuyListControl = this;
  toBuyListControl.toBuyList = ShoppingListService.getToBuyList();

  toBuyListControl.addToBoughtList = function(itemIndex) {
    ShoppingListService.moveItem(itemIndex);
  };
}

AlreadyBoughtListController.$inject = ['ShoppingListService'];
function AlreadyBoughtListController(ShoppingListService) {
  var alreadyBoughtListControl = this;
  alreadyBoughtListControl.alreadyBoughtList = ShoppingListService.getAlreadyBoughtList();
  console.log(alreadyBoughtListControl.alreadyBoughtList);
}

function ShoppingListService() {
  var service = this;

  service.toBuyList = [{name: "cookies", quantity: 10},
  {name: "milk", quantity: 1},{name: "toothbrush", quantity: 2},
  {name: "toothpaste", quantity: 1},{name: "tomato", quantity: 6}];

  service.alreadyBoughtList = [];

  service.moveItem = function (itemIdex) {
    var movedItem = service.toBuyList.splice(itemIdex, 1)[0];
    console.log('movedItem',movedItem);
    console.log('service.toBuyList',service.toBuyList);
    service.alreadyBoughtList.push(movedItem);
  };

  service.getToBuyList = function () {
    return service.toBuyList;
  };

  service.getAlreadyBoughtList = function () {
    return service.alreadyBoughtList;
  };

}

})();

// (function () {
//   'use strict';
//   angular.module('LunchCheck',[])
//   .controller('LunchCheckController',LunchCheckController);
//   LunchCheckController.$inject = ['$scope'];
//
//   function LunchCheckController($scope) {
//     $scope.evaluated_message="Test";
//     //console.log($scope.msg);
//
//     $scope.buttonPressed = function() {
//       var lunch_items = $scope.lunchMenu;
//       $scope.evaluated_message=lunch_items;
//     };
//   }
// })();
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.msg = "";

  $scope.buttonPressed = function () {
    var lunch_items = $scope.lunch_menu;
    $scope.msg=validate_lunch_items(lunch_items);
  };

  function validate_lunch_items(lunch_items) {
    var msg = "";
    if (!lunch_items || lunch_items == "") {
      msg="Please enter data first";
    } else {
      var lunch_items_array = lunch_items.split(',');
      if (lunch_items_array.length <=3) {
        msg="Enjoy!";
      } else {
        msg="Too much!";
      }
    }

    return msg;

  }

}

})();

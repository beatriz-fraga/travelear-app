const app = angular.module("travelear-app", []);
app.controller("travelear-controller", ($scope, $http) => {
  $scope.title = "Travelear";
  $scope.hotelName = "";
  $scope.hotelAddress = "";
  $scope.hotelImg = "";
  $scope.hotelTelephone = "";
  $scope.hotelList = [];

  $scope.addHotel = () => {
    if (!$scope.hotelName || !$scope.hotelAddress || !$scope.hotelTelephone) {
      return alert("Digite os dados corretamente: ");
    }
    $http
      .post("http://localhost:3333/api/hotels/", {
        name: $scope.hotelName,
        address: $scope.hotelAddress,
        img: $scope.hotelImg,
        telefone: $scope.telefone,
      })
      .then(
        () => {
          $scope.loadHotelList();
        },
        () => {
          alert("Ops, aconteceu algum erro.");
        }
      );
    $scope.hotelName = "";
    $scope.hotelAddress = "";
    $scope.hotelImg = "";
    $scope.hotelTelephone = "";
  };

  $scope.deleteHotel = (id) => {
    $http.delete("http://localhost:3333/api/hotels/" + id).then(() => {
      $scope.loadHotelList();
    });
  };

  $scope.loadHotelList = async () => {
    const { data } = await $http.get("http://localhost:3333/api/hotels/");
    $scope.hotelList = data;
    $scope.$apply();
  };

  $scope.loadHotelList();
});

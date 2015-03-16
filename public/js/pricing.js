angular.module('hiperboreaApp',[])
.controller('PricingController',['$scope',function($scope){
    $scope.data=[
        [45,0,false]
      , [34,0,false]
      , [182,0,false]
      , [45,0,false]
      , [34,0,false]
      , [57,0,false]
      , [136,0,false]
      , [34,0,false]
      , [34,0,false]
      , [0,0,false]
      , [455,0,false]
      , [754,0,false]
      , [1810,0,false]
      , [1206,0,false]
      , [1206,0,false]
      , [591,0,false]
      , [296,0,false]
      , [42,0,false]
      , [32,0,false]
      , [75,0,false]
      , [20,0,false]
    ];

    $scope.total=0;

    $scope.calculate=function(index){
        if($scope.data[index][2]){
            $scope.data[index][1]=$scope.data[index][0];
        }else{
            $scope.data[index][1]=0;
        }

        $scope.total=$scope.data.reduce(function(sum,element){
            return sum+element[1];
        },0);
    }
}]);


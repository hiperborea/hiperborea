function PricingController($scope) {
    $scope.data=[
        [28,0,false]
      , [21,0,false]
      , [112,0,false]
      , [28,0,false]
      , [21,0,false]
      , [35,0,false]
      , [56,0,false]
      , [14,0,false]
      , [21,0,false]
      , [0,0,false]
      , [280,0,false]
      , [500,0,false]
      , [1200,0,false]
      , [800,0,false]
      , [800,0,false]
      , [224,0,false]
      , [112,0,false]
      , [0,0,false]
      , [56,0,false]
      , [0,0,false]
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
}


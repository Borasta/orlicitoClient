app.controller("LoginCtrl", ["$scope", "$http", "$state", "userLogin",
    function ($scope, $http, $state, userLogin ) {
        // $state.transitionTo("home");

        if(userLogin.getSession())
            $state.transitionTo("home");

        // Inicializacion de variables
        $scope.login = {
            username: "",
            password: ""
        };

        $scope.signup = {
            name: "",
            lastname: "",
            email: "",
            username1: "",
            password1: "",
            password2: ""
        };

        $scope.loginFunc = function() {
            console.log("login");
            $http({
                "method": "POST",
                "url": "http://localhost:5000/login",
                "data": $scope.login
            }).then(
                function(res) {
                    console.log(res.data);
                    userLogin.setSession(res.data);
                    $state.transitionTo("home");
                },
                function(res) {
                    alert(res.data);
                }
            )
        };

        $scope.signupFunc = function() {
            console.log("signup");
            $http({
                "method": "POST",
                "url": "http://localhost:5000/signup",
                "data": $scope.signup
            }).then(
                function(res) {
                    console.log(res.data);
                    userLogin.setSession(res.data);
                    $state.transitionTo("home");
                },
                function(res) {
                    alert(res.data);
                }
            )
        }
    }

]);

app.controller("HomeCtrl", ["$scope", "$http", "$state", "userLogin",
    function ($scope, $http, $state, userLogin) {

        $scope.user = userLogin.getSession();

        $scope.logout = function() {
            userLogin.deleteSession();
            $scope.user = null;
            $state.transitionTo("login");
        };

        $scope.func = function() {
            $http({
                "method": "GET",
                "url": "http://localhost:5000/user"
            }).then(
                function(res) {
                    console.log(res.data);
                },
                function(res) {
                    alert(res.data);
                }
            )
        }
    }
]);

app.controller("IndexCtrl", ["$scope", "$http",
    function ($scope, $http) {

    }
]);

app.controller("ProfileCtrl", ["$scope", "$http",
    function ($scope, $http) {

    }
]);

app.controller("TakePictureCtrl", ["$scope", "$http",
    function ($scope, $http) {
        $scope.myImg = {
            src: ""
        };

        function onSuccess(imageData) {
            $scope.myImg.src = "data:image/jpeg;base64," + imageData;
            $scope.$apply();
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }

        $scope.takePicture = function () {
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL
            });
        }
    }
]);

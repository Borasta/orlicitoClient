var baseUrl = "192.168.1.2";

app.controller("LoginCtrl", ["$scope", "$http", "$state", "userLogin",
    function ($scope, $http, $state, userLogin ) {
        // $state.transitionTo("home");

        if(userLogin.getSession())
            $state.transitionTo("home.index");

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
                "url": "http://" + baseUrl + ":5000/login",
                "data": $scope.login
            }).then(
                function(res) {
                    console.log(res.data);
                    userLogin.setSession(res.data);
                    $state.transitionTo("home.index");
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
                "url": "http://" + baseUrl + ":5000/signup",
                "data": $scope.signup
            }).then(
                function(res) {
                    console.log(res.data);
                    userLogin.setSession(res.data);
                    $state.transitionTo("home.index");
                },
                function(res) {
                    alert(res.data);
                }
            )
        }
    }

]);

app.controller("HomeCtrl", ["$scope", "$http", "$state", "userLogin", "media",
    function ($scope, $http, $state, userLogin, media) {

        $scope.user = userLogin.getSession();

        var socket = io("http://" + baseUrl + ":5000");
        socket.on($scope.user.username, function (data) {
            switch( data.type ) {
                case "like":
                case "comment":
                    Materialize.toast(data.msg, 8000);
                    break;
            }
            // socket.emit('my other event', { my: 'data' });
        });

        $scope.logout = function() {
            userLogin.deleteSession();
            $scope.user = null;
            $state.transitionTo("login");
        };

        $scope.func = function() {
            $http({
                "method": "GET",
                "url": "http://" + baseUrl + ":5000/like"
            }).then(
                function(res) {
                    console.log(res);
                },
                function(res) {
                    alert(res.data);
                }
            )
        };

        $scope.like = function(post) {
            console.log(post);
            $http({
                "method": "POST",
                "url": "http://" + baseUrl + ":5000/like",
                "data": {
                    "id_publish": post.id_publish,
                    "liked": post.liked ? 0 : 1
                }
            }).then(
                function(res) {
                    console.log(res);
                    post.liked = Number(res.data);
                },
                function(res) {
                    alert(res.data);
                }
            )
        };

        $scope.setSrc = function(post) {
            console.log("hola");
            if( !post.src ) {
                post.src = post.username + "/" + post.media;
                switch(post.media_type) {
                    case "image":
                        post.src += ".png";
                        break;
                    case "audio":
                        post.src += ".mp3";
                        break;
                    case "video":
                        post.src += ".mp4";
                        break;
                }
            }

        };

        $scope.a = function(){
            $http({
                "method": "POST",
                "url": "http://" + baseUrl + ":5000/comment",
                "data": {
                    id_publish: 1,
                    comment: "Hola mundo, gran diagrama"
                }
            }).then(
                function(res) {
                    console.log(res);
                },
                function(res) {
                    alert(res.data);
                }
            )
        };


        $scope.$watch("archivo", function (newVal, oldVal) {
            if(newVal) {
                media.setMedia($scope.archivo);
                $state.transitionTo("home.upload");
            }
        })


    }
]);

app.controller("IndexCtrl", ["$scope", "$http",
    function ($scope, $http) {

    }
]);

app.controller("UploadCtrl", ["$scope", "$http", "media",
    function ($scope, $http, media) {
        $scope.uploadFunc = function () {
            $scope.archivo = media.getMedia();
            console.log($scope);
        }
    }
]);

app.controller("ProfileCtrl", ["$scope", "$http", "$stateParams", "userLogin",
    function ($scope, $http, $stateParams, userLogin) {

        $scope.user = userLogin.getSession();

        $http({
            "method": "GET",
            "url": "http://" + baseUrl + ":5000/publish",
            "params": {
                "username": $stateParams.username
            }
        }).then(
            function(res) {
                console.log(res.data);
                $scope.posts = res.data;
            },
            function(res) {
                alert(res.data);
            }
        )

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

app.config(["$stateProvider", "$urlRouterProvider",

    function($state, $url) {
        $url.otherwise("/login");
        // $url.when("/home", "/home/index");

        $state
            .state("login", {
                "url": "/login",
                "templateUrl": "../views/login.html",
                "controller": "LoginCtrl"
            })
            .state("home", {
                "url": "/home",
                "templateUrl": "../views/home.html",
                "controller": "HomeCtrl"
            })
            .state("home.index", {
                "url": "/index",
                "templateUrl": "../views/index.html",
                "controller": "IndexCtrl"
            })
            .state("home.profile", {
                "url": "/profile",
                "templateUrl": "../views/profile.html",
                "controller": "ProfileCtrl"
            })
            .state("home.takePicture", {
                "url": "/take-picture",
                "templateUrl": "../views/take-picture.html",
                "controller": "TakePictureCtrl"
            });

    }
]);
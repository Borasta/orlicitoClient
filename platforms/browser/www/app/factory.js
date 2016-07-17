app.factory("userLogin", [ "$http", "store",
    function($http, $store) {

        var userLocal = $store.get("user");

        // Verificamos si existe una sesion activa
        if( userLocal && userLocal.name && userLocal.lastname && userLocal.token ) {
            console.log("Si existe una sesion activa");
            console.log(userLocal);
            $http.defaults.headers.common.Authorization = userLocal.token;
        }

        return {
            setSession: function( user ) {
                if( user.name && user.lastname && user.token ) {
                    $store.set("user", user);
                    userLocal = user;
                    $http.defaults.headers.common.Authorization = userLocal.token;
                }
                else {
                    console.log("Existe un problema al crear los datos de la sesion")
                }
            },
            getSession: function () {
                return $store.get("user");
            },
            deleteSession: function () {
                $store.remove("user");
                $http.defaults.headers.common.Authorization = null;
            }
        }

    }
]);

app.factory("media", [
    function() {
        var media = null;
        return {
            setMedia: function( m ) {
                media = m;
            },
            getMedia: function () {
                return media;
            }
        }

    }
]);
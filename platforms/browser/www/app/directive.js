app.directive('filereader', [
    function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('change', function(){
                    if (element[0].files.length > 1)
                        scope[attrs.filereader] = element[0].files;
                    else
                        scope[attrs.filereader] = element[0].files[0];
                        scope.$apply();
                });
            }
        };
    }
]);

app.directive('audios', function($sce) {
    return {
        restrict: 'A',
        scope: {
            code:'=',
            play:'='
        },
        replace: true,
        template: '<audio media-player="audio1" ng-src="{{url}}" autoplay></audio>',
        link: function (scope, element, attrs) {
            var src = null;
            var play = false;
            scope.$watch('code', function (newVal, oldVal) {
                if (newVal !== undefined) {
                    src = newVal
                }
            });
            scope.$watch('play', function (newVal, oldVal) {
                var audio = element[0];
                play = newVal;
                if(!scope.url && play)
                    scope.url = $sce.trustAsResourceUrl("http://orlicito.herokuapp.com/media/" + src);
                if (play !== undefined) {
                    if(play)
                        audio.play();
                    else {
                        audio.pause();
                        audio.currentTime = 0;
                    }
                }
            });
        }
    };
});

app.directive('videos', function($sce) {
    return {
        restrict: 'A',
        scope: {
            code:'=',
            play:'='
        },
        replace: true,
        template: '<video media-player="video1" ng-src="{{url}}" autoplay></video>',
        link: function (scope, element, attrs) {
            var src = null;
            var play = false;
            scope.$watch('code', function (newVal, oldVal) {
                if (newVal !== undefined) {
                    src = newVal
                }
            });
            scope.$watch('play', function (newVal, oldVal) {
                var video = element[0];
                play = newVal;
                if(!scope.url && play)
                    scope.url = $sce.trustAsResourceUrl("http://orlicito.herokuapp.com/media/" + src);
                if (play !== undefined) {
                    if(play)
                        video.play();
                    else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        }
    };
});
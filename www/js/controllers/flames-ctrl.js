'use strict';
(function() {
    angular.module('flames')
        .controller('flamesCtrl', ['$scope', '$cordovaSocialSharing', flamesCtrl]);

    function flamesCtrl($scope, $cordovaSocialSharing) {

        function showAboutUsModel(event) {
            event.preventDefault();
            $('#about-us-model').modal('open');
        }

        $scope.showAboutUsModel = showAboutUsModel;

        $scope.flames = function() {

            var name1 = $scope.user.yourName;
            var name2 = $scope.user.crushName;
            var firstArray = [];
            var secondArray = [];
            var finalString = [];
            firstArray = name1.toLowerCase().replace(/ /gi, '').split('');
            secondArray = name2.toLowerCase().replace(/ /gi, '').split('');
            for (var i in firstArray) {
                for (var j in secondArray) {
                    if ((firstArray[i] == secondArray[j]) && (firstArray[i] != '') && (secondArray[j] != '')) {
                        firstArray[i] = '';
                        secondArray[j] = '';
                    }
                }
            }

            for (var i = 0; i <= firstArray.length; i++) {
                if (firstArray[i] == '') {
                    firstArray.splice(i, 1);
                }
            }

            for (var j = 0; j <= secondArray.length; j++) {
                if (secondArray[j] == '') {
                    secondArray.splice(j, 1);
                }
            }
            finalString = firstArray.toString().replace(/,/gi, '') + secondArray.toString().replace(/,/gi, '');
            var l = finalString.length;
            result(l);

            $('#flames-modal').modal('open');

        }


        function result(n) {
            var string = 'flames';
            var number = n;
            var pro = [];

            while (string.length >= 2) {
                var j = 0;
                pro = [];
                var position = number % string.length;

                if (position != 0) {
                    for (var i = position + 1; i <= string.length; i++) {
                        pro[j] = string.charAt(i - 1);
                        j++;
                    }

                    for (var i = 0; i <= position - 2; i++) {
                        pro[j] = string.charAt(i);
                        j++;
                    }
                    string = pro.toString().replace(/,/gi, '');
                } else {
                    string = string.slice(0, -1);
                }
            }
            display(string);
        }

        function display(s) {
            if (s === 'f') {
                $scope.message = 'Friend';
            }

            if (s === 'l') {
                $scope.message = 'Love';
            }

            if (s === 'a') {
                $scope.message = 'Affectionate';
            }

            if (s === 'm') {
                $scope.message = 'Marriage';
            }

            if (s === 'e') {
                $scope.message = 'Enemy';
            }

            if (s === 's') {
                $scope.message = 'Sister';
            }
        }


        function resetForm(form) {
            form.$$element[0].reset();
            $(form.$$element[0]).find('label').removeClass('active')
        }

        function onReady() {
            $('.button-collapse').sideNav({ closeOnClick: true });
        }

        function socialShare(event) {
            event.preventDefault();
            var message = 'Download Flames App Now And Find Out Your Relation Ship.. Have A Fun';
            var subject = 'Flames App';
            var link = 'www.vertisize.com';

            function successCb(result) {
                //Success
            };

            function errorCb(err) {
                alert(err + 'Something Went Wrong While Shareing');
            }

            $cordovaSocialSharing
                .share(message, subject, null, link) // Share via native share sheet
                .then(successCb, errorCb);
        }

        $(document).ready(onReady);
        $scope.reset = resetForm;
        $scope.socialShare = socialShare;


    }
})();

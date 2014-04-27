/**
 * fr.fileReader: Wrapper for HTML5 FileReader
 *
 * @version 0.0.1
 */

'use strict';
angular.module('fr.fileReader', []).directive('type', ['$window', function ($window) {

    if (!$window.File || !$window.FileReader) {
        throw new Error('Browser not supported');
    }

    return {
        scope: {
            fileModel: '='
        },
        link: function (scope, element, attrs) {
            if (attrs.type !== 'file') {
                return;
            }

            var method = attrs.method || 'readAsText';
            var fileReader = new $window.FileReader();

            fileReader.onloadend = function (evt) {
                scope.$apply(function () {
                    scope.fileModel = evt.target.result;
                });
            };

            element.on('change', function(e) {
                if (!e.target.files || !e.target.files.length || !e.target.files[0]) {
                    return true;
                }
                var files = e.target.files;
                fileReader[method](files[0]);
            });
        }
    };
}]);
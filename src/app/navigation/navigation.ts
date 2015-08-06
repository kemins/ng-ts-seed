/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace navigation {


    export function NavigationBarDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'navigation/navBar.tpl.html',
            link: (scope: ng.IScope) => {
            }
        };
    }

    export function FooterBarDirective(): ng.IDirective {
        return {
            restrict: 'E',
            templateUrl: 'navigation/footerBar.tpl.html',
            link: (scope: ng.IScope) => {
            }
        };
    }
}

angular
    .module("navigation", [])
    .directive("navigationBar", navigation.NavigationBarDirective)
    .directive("footerBar", navigation.FooterBarDirective);



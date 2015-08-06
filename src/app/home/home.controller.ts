/// <reference path="../core/types/types.ts"/>
/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace home {

    export class HomeCtrl {

        user: models.User;

        /* @ngInject */
        constructor(private $scope: IHomeScope, private homeService: services.IHomeService) {
            this.user = new models.User();
        }

        sayHello(): void {
            this.homeService.greet(this.user);
        }
    }
    export interface IHomeScope extends ng.IScope {
        homeCtrl: HomeCtrl;
    }
}

angular
    .module("home.controller", ['home.services'
    ])
    .controller("HomeCtrl", home.HomeCtrl);


/// <reference path="../../types/types.ts"/>

module Home {

    export class HomeCtrl {

        pageTitle: string;
        userName: string;

        /* @ngInject */
        constructor(private $scope: IHomeScope, homeService: services.IHomeService) {
            this.pageTitle = "Home page!";
        }

        sayHello(): void {
            alert("Hello " + this.userName);
        }
    }

    export interface IHomeScope extends ng.IScope {
        homeCtrl: HomeCtrl;
    }
}

angular
    .module("home.controller", ['home.services'
    ])
    .controller("HomeCtrl", Home.HomeCtrl);


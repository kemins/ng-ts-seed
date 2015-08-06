/// <reference path="../type-definitions/typings/tsd.d.ts"/>
/// <reference path="core/types/types.ts"/>

namespace boilerplate.app.controller {

    export interface IAppScope extends ng.IScope {
        appCtrl: AppCtrl;
        pageSysName: string;
        pageTitle: string;
        INPUT_MAX_CHARS: number;
    }

    export interface ITermsScope extends IAppScope {
        termsCtrl: TermsAndConditionsCtrl;
    }

    export class AppCtrl {

        /* @ngInject */
        constructor($scope: IAppScope, $location: ng.ILocationService, private $modal: angular.ui.bootstrap.IModalService ) {

            $scope.appCtrl = this;

            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.data.pageTitle)) {
                    $scope.pageTitle = toState.data.pageTitle + ' | Photo-State';
                    $scope.pageSysName = toState.data.name;
                }
            });


            $scope.INPUT_MAX_CHARS = 255;//appConfig.inputMaxChars;
        }

        openModalWindow(options: widgets.IPopupWindow) {
            var modalInstance: angular.ui.bootstrap.IModalServiceInstance = this.$modal.open({
                animation: options.animation,
                templateUrl: options.templateUrl,
                controller: options.controller,
                controllerAs: options.controllerAs,
                size: options.size || 'md'
            });

            if (options.okHandler) {
                modalInstance.result.then(options.okHandler);//sucssess
            }

            if (options.cancelHandler) {
                modalInstance.result.catch(options.cancelHandler);//error
            }

            if (options.finalHandler) {
                modalInstance.result.finally(options.finalHandler);
            }
        }

        openTermsAndConditionsDialog() {
            this.openModalWindow({
                useAnimation: true,
                templateUrl: 'terms-and-conditions/terms-and-conditions.tpl.html',
                controller: 'TermsCtrl'
            });
        }
    }

    export class TermsAndConditionsCtrl {

        /* @ngInject */
        constructor($scope: ITermsScope, $log: ng.ILogService, private $modalInstance: angular.ui.bootstrap.IModalServiceInstance){
            $scope.termsCtrl = this;
        }

        cancel() {
            this.$modalInstance.dismiss('cancel');
        }
    }
}

angular
    .module("boilerplate.app.controller", [
    ])
    .controller("AppCtrl", boilerplate.app.controller.AppCtrl)
    .controller("TermsCtrl", boilerplate.app.controller.TermsAndConditionsCtrl);

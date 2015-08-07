/// <reference path="../type-definitions/typings/tsd.d.ts"/>

namespace boilerplate.app.service {

    /* @ngInject */
    export function localRestangular(Restangular: restangular.IService) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('.');
            RestangularConfigurer.setRequestSuffix('.json');
        });
    }
}

angular
    .module("boilerplate.app.services", [
        'restangular'
    ])
    .factory('localRestangular', boilerplate.app.service.localRestangular);

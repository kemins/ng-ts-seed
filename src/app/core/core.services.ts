/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace boilerplate.core.service {

    /* @ngInject */
    export function localRestangular(Restangular: restangular.IService) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setBaseUrl('.');
            RestangularConfigurer.setRequestSuffix('.json');
        });
    }
}

angular
    .module("boilerplate.core.services", [
        'restangular'
    ])
    .factory('localRestangular', boilerplate.core.service.localRestangular);

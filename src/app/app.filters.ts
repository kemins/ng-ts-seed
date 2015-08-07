/// <reference path="../type-definitions/typings/tsd.d.ts"/>

namespace boilerplate.app.filters {

    /* @ngInject */
    export function safeHTML($sce) {
        return $sce.trustAsHtml;
    }
}

angular
    .module("boilerplate.app.filters", ['ngSanitize'])
    .filter("safeHtml", boilerplate.app.filters.safeHTML);
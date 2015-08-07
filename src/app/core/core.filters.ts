/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace boilerplate.core.filters {

    /* @ngInject */
    export function safeHTML($sce) {
        return $sce.trustAsHtml;
    }
}

angular
    .module("boilerplate.core.filters", ['ngSanitize'])
    .filter("safeHtml", boilerplate.core.filters.safeHTML);
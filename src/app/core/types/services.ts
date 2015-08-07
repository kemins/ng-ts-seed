/// <reference path="types.ts"/>

namespace boilerplate.services {

    export interface IHomeService {
        getPageContent(): angular.IPromise<any>;
    }
}

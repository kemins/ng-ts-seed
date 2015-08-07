/// <reference path="types.ts"/>

namespace boilerplate.services {

    export interface IHomeService {
        greet(user: boilerplate.models.User): void;
        getPageContent(): angular.IPromise<any>;
    }
}

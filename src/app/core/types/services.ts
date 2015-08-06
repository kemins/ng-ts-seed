/// <reference path="types.ts"/>

namespace boilerplate.services {

    export interface IHomeService {
        greet(user: models.User): void;
    }
}

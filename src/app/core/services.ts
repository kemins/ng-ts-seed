/// <reference path="types.ts"/>

namespace services {

    export interface IHomeService {
        greet(user: models.User): void;
    }
}

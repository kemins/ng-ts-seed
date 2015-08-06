/// <reference path="../core/types/types.ts"/>
/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace home {
  export class HomeService implements boilerplate.services.IHomeService {

    greet(user: models.User): void{
      alert(user.name);
    }
  }
}


angular
  .module("home.services", [])
  .service("homeService", home.HomeService);

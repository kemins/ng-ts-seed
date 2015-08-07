/// <reference path="../core/types/types.ts"/>
/// <reference path="../../type-definitions/typings/tsd.d.ts"/>

namespace home {
  export class HomeService implements boilerplate.services.IHomeService {

    /* @ngInject */
    constructor(private localRestangular: restangular.IService) {

    }

    greet(user: boilerplate.models.User): void{
      alert(user.name);
    }

    getPageContent(): angular.IPromise<any> {
      return this.localRestangular.one('assets').customGET('slides/slides-data');
    }
  }
}


angular
  .module("home.services", ['restangular'])
  .service("homeService", home.HomeService);

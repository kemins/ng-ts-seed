/// <reference path="../../types/types.ts"/>

class HomeService implements services.IHomeService {

  fetchSlides(): Array<models.Slide> {
    var res: Array<models.Slide> = [];
    return res;
  }
}


angular
  .module("home.services", [])
  .service("homeService", HomeService);

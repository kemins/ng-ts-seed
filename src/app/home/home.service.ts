/// <reference path="../core/types.ts"/>
/// <reference path="../../types//types.ts"/>

class HomeService implements services.IHomeService {

  greet(user: models.User): void{
    alert(user.name);
  }
}


angular
  .module("home.services", [])
  .service("homeService", HomeService);

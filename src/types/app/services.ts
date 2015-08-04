module services {

    export interface IHomeService {
        fetchSlides(): models.Slide[];
    }
}

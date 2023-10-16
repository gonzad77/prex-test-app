import { Injectable } from "@angular/core";
import { RestService } from "src/app/helpers/rest.helper";
import { Film } from "src/app/models/film.model";

@Injectable({
  providedIn: 'root'
})

export class FilmService {

  constructor(
    private rest: RestService
  ) {}

  getAll = () => {
    return this.rest.get('/', {}, [200])
  }
  
  edit = ({_id, title, description, stars, src, date}: Film) => {
    return this.rest.put('/edit', {
      _id,
      title,
      description,
      stars,
      src,
      date
    }, [200])
  }

  delete = ({_id}: Film) => {
    return this.rest.delete(`/delete?_id=${_id}`, {}, [200])
  }
}
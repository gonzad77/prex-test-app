import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showSearchBar: boolean = false;

  filmsOriginal = [
    {
      title: 'Abc',
      description: 'Descripcion larga',
      src: 'assets/icon/favicon.png',
      stars: 0
    },
    {
      title: 'Dewe',
      description: 'Descripcion larga',
      src: 'assets/icon/favicon.png',
      stars: 1
    },
    {
      title: 'Adsdwe',
      description: 'Descripcion larga',
      src: 'assets/icon/favicon.png',
      stars: 2
    },
    {
      title: 'SSSDDD',
      description: 'Descripcion larga',
      src: 'assets/icon/favicon.png',
      stars: 3
    },
    {
      title: 'dadwdwd',
      description: 'Descripcion larga',
      src: 'assets/icon/favicon.png',
      stars: 5
    }
  ]

  films: Array<Film> = []

  constructor() { }

  ngOnInit() {
    Object.assign(this.films, this.filmsOriginal);
  }

  filterFilm(e: any) {
    Object.assign(this.films, this.filmsOriginal);
    const value: string = e.detail.value;
    this.films = this.films.filter( film => film.title.toLowerCase().match(value.toLowerCase()))
  }

}

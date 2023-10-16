import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { NavController } from '@ionic/angular';
import { FilmsState } from 'src/app/states/films.state';
import { FilmService } from 'src/app/services/film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showSearchBar: boolean = false;

  filmsOriginal: Array<Film> = []

  films: Array<Film> = []

  constructor(
    private navCtrl: NavController,
    private filmsState: FilmsState,
    private filmService: FilmService
  ) { 
    this.startListeners();
  }

  async ngOnInit() {
    const response = await this.filmService.getAll() as Response;
    const data = response.body as any;
    this.filmsOriginal = data;
    this.filmsState.set(this.filmsOriginal)
    Object.assign(this.films, this.filmsOriginal);
  }

  startListeners = () => {
    this.filmsState.listen().subscribe(films => {
      this.filmsOriginal = films;
      this.films = [];
      Object.assign(this.films, this.filmsOriginal);
    })
  }

  filterFilm = (e: any) => {
    Object.assign(this.films, this.filmsOriginal);
    const value: string = e.detail.value;
    this.films = this.films.filter( film => film.title.toLowerCase().match(value.toLowerCase()))
  }

  edit = (film: Film) => {
    this.navCtrl.navigateForward(['edit', film]);
  }

}

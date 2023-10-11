import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/models/film.model';
import { NavController } from '@ionic/angular';
import { FilmsState } from 'src/app/states/films.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  showSearchBar: boolean = false;

  filmsOriginal = [
    {
      id: '0',
      title: 'Abc',
      description: 'Descripcion largaasdasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      src: 'https://ionicframework.com/docs/img/demos/card-media.png',
      stars: 0,
      date: new Date()
    },
    {
      id: '1',
      title: 'Dewe',
      description: 'Descripcion larga',
      src: 'https://ionicframework.com/docs/img/demos/card-media.png',
      stars: 1,
      date: new Date()
    },
    {
      id: '2',
      title: 'Adsdwe',
      description: 'Descripcion larga',
      src: 'https://ionicframework.com/docs/img/demos/card-media.png',
      stars: 2,
      date: new Date()
    },
    {
      id: '3',
      title: 'SSSDDD',
      description: 'Descripcion larga',
      src: 'https://ionicframework.com/docs/img/demos/card-media.png',
      stars: 3,
      date: new Date()
    },
    {
      id: '4',
      title: 'dadwdwd',
      description: 'Descripcion larga',
      src: 'https://ionicframework.com/docs/img/demos/card-media.png',
      stars: 5,
      date: new Date()
    }
  ]

  films: Array<Film> = []

  constructor(
    private navCtrl: NavController,
    private filmsState: FilmsState
  ) { 
    this.startListeners();
  }

  ngOnInit() {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { DefaultFilm, Film } from 'src/app/models/film.model';
import { FilmsState } from 'src/app/states/films.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  film: Film = DefaultFilm();

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private filmsState: FilmsState
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.film = params as Film;
    })
  }

  delete = async () => {
    const alert = await this.alertCtrl.create({
      backdropDismiss: true,
      header: 'Delete',
      message: `Are you sure to delete ${this.film.title}?`,
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'Delete', handler: () => this.doDelete()}
      ]
    })
    alert.present();
  }

  doDelete = () => {
    const actualFilms = this.filmsState.get();
    const newFilms = actualFilms.filter( f => f._id !== this.film._id);
    this.filmsState.set(newFilms);
    this.navCtrl.pop();
  }

  goEdit = () => {
    this.navCtrl.navigateForward(['edit-form', this.film])
  }

}

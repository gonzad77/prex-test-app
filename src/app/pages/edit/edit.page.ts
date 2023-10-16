import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { DefaultFilm, Film } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film.service';
import { FilmsState } from 'src/app/states/films.state';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  private loader: HTMLIonLoadingElement | undefined;

  film: Film = DefaultFilm();

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private filmsState: FilmsState,
    private filmService: FilmService
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

  doDelete = async () => {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...'
    })
    await this.loader.present();
    try {
      await this.filmService.delete(this.film);
      this.updateState();
      this.navCtrl.navigateRoot('/home');
      this.loader.dismiss();
    } catch (e: any) {
      const toast = await this.toastCtrl.create({
        message: e.error.message ? e.error.message : 'Unexpected error, try again later.',
        duration: 3000,
        position: 'top',
        color: 'danger',
        cssClass: 'ion-text-center'
      })
      toast.present();
      this.loader.dismiss();
    }
  }

  private updateState = () => {
    const actualFilms = this.filmsState.get();
    const newFilms = actualFilms.filter( f => f._id !== this.film._id);
    this.filmsState.set(newFilms);
  }

  goEdit = () => {
    this.navCtrl.navigateForward(['edit-form', this.film])
  }

}

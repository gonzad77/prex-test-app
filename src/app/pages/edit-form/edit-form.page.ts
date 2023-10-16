import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { DefaultFilm, Film } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film.service';
import { FilmsState } from 'src/app/states/films.state';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.page.html',
  styleUrls: ['./edit-form.page.scss'],
})
export class EditFormPage implements OnInit {

  private loader: HTMLIonLoadingElement | undefined;

  public editForm: FormGroup;
  public film: Film = DefaultFilm();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private filmService: FilmService,
    private filmState: FilmsState
  ) { 
    this.editForm = this.formBuilder.group({
      title: new FormControl(this.film.title, Validators.required),
      stars: new FormControl(this.film.stars, Validators.required),
      date: new FormControl(this.film.date, Validators.required),
      description: new FormControl(this.film.description, Validators.required),
    })
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.film = params as Film;
      this.editForm.setValue({
        title: this.film.title,
        stars: Number(this.film.stars),
        date: new Date(this.film.date).toISOString(),
        description: this.film.description
      })
    })
  }

  doEdit = async (form: any) => {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...'
    })
    await this.loader.present();
    try {
      const newFilm: Film = {...form};
      newFilm._id = this.film._id;
      newFilm.src = this.film.src;

      await this.filmService.edit(newFilm)
      this.updateFilmState(newFilm);
      
      this.navCtrl.navigateRoot(['/home']);
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

  private updateFilmState = (newFilm: Film) => {
    const films = this.filmState.get();
    films.forEach((film, i) => {
      if(film._id === newFilm._id) films[i] = newFilm;
    })
    this.filmState.set(films);
  };
}

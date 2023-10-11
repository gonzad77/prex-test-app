import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DefaultFilm, Film } from 'src/app/models/film.model';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.page.html',
  styleUrls: ['./edit-form.page.scss'],
})
export class EditFormPage implements OnInit {

  public editForm: FormGroup;
  public film: Film = DefaultFilm();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
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
        date: this.film.date,
        description: this.film.description
      })
    })
  }

  doEdit = () => {
    const newFilm: Film = this.editForm.value;
    newFilm.id = this.film.id;
    newFilm.src = this.film.src;
    console.log(newFilm)
  }

  dateChange = (e: any) => {
    console.log(e)
  }

}

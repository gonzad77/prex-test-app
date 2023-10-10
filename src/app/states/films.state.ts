import { Film } from "../models/film.model"
import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class FilmsState {

  public state: Array<Film> = [];
  public subject = new Subject<Array<Film>>();

  constructor() {}

  public set = (value: Array<Film>) => {
    Object.assign(this.state, value);
    this.subject.next(this.state);
  }

  public get = () => {
    return this.state
  }

  public listen = () => {
    return this.subject.asObservable()
  }

  public unset = () => {
    this.set([]);
  }

  public unsubscribe = (subscription: Subscription) => {
    subscription.unsubscribe();
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public show = {
    password: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    // this.loginForm = this.formBuilder.group({
    //   username: new FormControl('', Validators.required)
    // })
  }

  login = async () => {
    const toast = await this.toastCtrl.create({
      message: 'error message',
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'ion-text-center'
    })
    toast.present()
  }

  goToSignup = async() => {
    this.navCtrl.navigateRoot(['/signup']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loader: HTMLIonLoadingElement | undefined;

  public loginForm: FormGroup;
  public show = {
    password: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  login = async (form: any) => {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...'
    })
    await this.loader.present();
    try {
      const login: Login = { ...form }
      await this.authService.login(login) as Response;
      this.navCtrl.navigateRoot(['/home']);
      this.loader.dismiss();
    } catch (e: any) {
      const toast = await this.toastCtrl.create({
        message: e.error.message,
        duration: 3000,
        position: 'top',
        color: 'danger',
        cssClass: 'ion-text-center'
      })
      toast.present();
      this.loader.dismiss();
    }
  }

  goToSignup = async() => {
    this.navCtrl.navigateRoot(['/signup']);
  }

}

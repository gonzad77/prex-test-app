import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

import { Login } from 'src/app/models/login.model';

import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import { Camera, CameraResultType } from '@capacitor/camera';

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
  public logo: string | undefined = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private storage: StorageService
  ) { 
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  async ngOnInit() {
    this.logo = await this.storage.get('logo');
  }

  login = async (form: any) => {
    this.loader = await this.loadingCtrl.create({
      message: 'Loading...'
    })
    await this.loader.present();
    try {
      const login: Login = { ...form }
      await this.authService.login(login) as Response;
      await this.storage.set('user', login.username);
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

  goToSignup = async() => {
    this.navCtrl.navigateRoot(['/signup']);
  }

  takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      correctOrientation:true,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.logo = imageUrl;
    await this.storage.set('logo', imageUrl);
  }
}

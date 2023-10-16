import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Signup } from 'src/app/models/signup.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  private loader: HTMLIonLoadingElement | undefined;

  public signupForm: FormGroup;
  public show = {
    password: false,
    confirmPassword: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService
  ) { 
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  signup = async (form: any) => {

    this.loader = await this.loadingCtrl.create({
      message: 'Loading...'
    })
    
    const signup: Signup = { ...form };

    signup.confirmPassword !== signup.password ? this.createToast('Passwords do not match', 'danger') : this.doSignup(signup)
    
  }

  private createToast = async (message: string, color: string) => {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color,
      cssClass: 'ion-text-center'
    })
    toast.present()
  }

  private doSignup = async (signup: Signup) => {
    try {
      const response = await this.authService.register(signup)
      this.loader?.dismiss();
      this.createToast('User created', 'success');
    } catch(e: any) {
      this.createToast(e.error.message ? e.error.message : 'Unexpected error, try again later.', 'danger');
      this.loader?.dismiss();
    }
  }

  goToLogin = () => {
    this.navCtrl.navigateRoot(['/login']);
  }

}

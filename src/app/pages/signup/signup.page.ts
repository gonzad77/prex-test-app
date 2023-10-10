import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Signup } from 'src/app/models/signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public signupForm: FormGroup;
  public show = {
    password: false,
    confirmPassword: false
  }

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { 
    this.signupForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
  }

  signup = (form: any) => {
    
    const signup: Signup = { ...form };

    signup.confirmPassword !== signup.password ? this.createToast('Passwords do not match') : this.doSignup(signup)
    
  }

  private createToast = async (message: string) => {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger',
      cssClass: 'ion-text-center'
    })
    toast.present()
  }

  private doSignup(signup: Signup) {
    console.log(signup);
  }

  goToLogin = async() => {
    this.navCtrl.navigateRoot(['/login']);
  }

}

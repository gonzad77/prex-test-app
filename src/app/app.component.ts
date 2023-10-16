import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp = async () => {
    try {
      await SplashScreen.hide();
      await StatusBar.setStyle({ style: Style.Dark });
  
      if (this.platform.is('android')) {
        StatusBar.setBackgroundColor({ color: '#1C1C1C' });
      }
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }
  async ngOnInit() {
    await this.storage.init();
    await this.storage.remove('logo');
    const username = await this.storage.get('user');
    if (username) this.navCtrl.navigateRoot('/home')
  }
}

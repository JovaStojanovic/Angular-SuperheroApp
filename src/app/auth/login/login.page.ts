import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private alertCtrl: AlertController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm){
    console.log(form);
    if(form.valid) {
      this.authService.login(form.value).subscribe(resData => {
        console.log("Prijava uspesna");
        this.presentAlertLogin();
        console.log(resData)
        this.router.navigateByUrl("/");
      });
    } else {
      console.log("Prijava NEuspesna");
      this.presentAlertLoginError();
    }
  }

  async presentAlertLogin() {
    const alert = await this.alertCtrl.create({
      header: 'You are logged in!',
      message: 'You have successfully logged in!',
      buttons: ['GOOD'],
    });

    await alert.present();
  }

  async presentAlertLoginError() {
    const alert = await this.alertCtrl.create({
      header: 'Your login failed!',
      message: 'Your account does not exist!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  toRegister(){
    this.router.navigateByUrl('register')
  }
}

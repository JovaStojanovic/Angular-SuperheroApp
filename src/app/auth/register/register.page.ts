import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

   registerForm: FormGroup;
  constructor(private alertCtrl: AlertController, private authService: AuthService,private router: Router) {

  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      //prvi argument u konstruktoru za formcontrol je default vrednost, drugi argument je validator
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null,[Validators.required, Validators.email]),
      password: new FormControl(null,[Validators.required, Validators.minLength(7)])
    });
  }

  onRegister(){
    console.log(this.registerForm);
    if(this.registerForm.valid){
    this.authService.register(this.registerForm.value).subscribe(resData=> {
      console.log("Registracija uspela");
      this.presentAlertRegister();
      console.log(resData);
      this.router.navigateByUrl("/login");
    })} else {
      this.presentAlertRegisterError();
    }
  }

  async presentAlertRegister() {
    const alert = await this.alertCtrl.create({
      header: 'You are registered!',
      message: 'Please, log in with your account now!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertRegisterError() {
    const alert = await this.alertCtrl.create({
      header: 'Your registration failed!',
      message: 'Please, try again!',
      buttons: ['OK'],
    });

    await alert.present();
  }

}

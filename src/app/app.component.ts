import { Component } from '@angular/core';
import {AddSuperheroModalComponent} from "./add-superhero.modal/add-superhero.modal.component";
import {ModalController} from "@ionic/angular";
import {SuperheroServiceService} from "./superhero-service.service";
import {AuthService} from "./auth/auth.service";
import { defineCustomElement } from '@ionic/core/components/ion-modal.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private modalCtrl: ModalController, private superheroService: SuperheroServiceService, private authService: AuthService) {}


  openModal(){
    this.modalCtrl.create({
      component: AddSuperheroModalComponent
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
        if(resultData.role === 'confirm') {
          console.log(resultData);
          //povratna vrednost ove POST metode je Observable pa zato moramo da se subscribe-ujemo i da definisemo next fju
          //odnosno sta treba da se desi kad se superhero sacuva na firebase-u
          this.superheroService.addSuperhero(
            resultData.data.superheroData.name,
            resultData.data.superheroData.description,
            resultData.data.superheroData.strength,
            resultData.data.superheroData.universe,
            resultData.data.superheroData.imageUrl,
            this.authService.getUserId(),
              "star-outline").subscribe((res) =>{
              console.log(res);
          })
        }
    })
  }

  defineCustomElement(){}; 

}

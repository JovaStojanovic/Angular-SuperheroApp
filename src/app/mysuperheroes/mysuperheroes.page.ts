import { Component, OnInit } from '@angular/core';
import {AddSuperheroModalComponent} from "../add-superhero.modal/add-superhero.modal.component";
import {AlertController, ModalController} from "@ionic/angular";
import {SuperheroServiceService} from "../superhero-service.service";
import {AuthService} from "../auth/auth.service";
import {Superhero} from "../superheroes/superhero-element/superhero-model";
import {Subscription} from "rxjs";
import {UpdateSuperheroModalComponent} from "../update-superhero.modal/update-superhero.modal.component";

@Component({
  selector: 'app-mysuperheroes',
  templateUrl: './mysuperheroes.page.html',
  styleUrls: ['./mysuperheroes.page.scss'],
})
export class MysuperheroesPage implements OnInit {
  superheroes: Superhero[];
  private _superheroSub: Subscription;
  superherosById: Superhero[];
  constructor(private alertCtrl: AlertController, private modalCtrl: ModalController, private superheroService: SuperheroServiceService, private authService: AuthService) {
    this.superheroes = [];
    this.superherosById=[];
    this._superheroSub= new Subscription();
  }

  ngOnInit() {
    this.superheroService.getSuperheroesById().subscribe((superheroData)=>{
      console.log(superheroData);
      this.superheroes = superheroData;
    });
  }

  ionViewWillEnter(){
    this.superheroService.getSuperheroesById().subscribe((superheroData)=>{
      console.log(superheroData);
      this.superheroes = superheroData;
    });

  }
  deleteSuperhero(superheroID: String) {
    this.superheroService.deleteSuperhero(superheroID).subscribe(() =>{

        this.ngOnInit();
        this.ionViewWillEnter();
    });
  }

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
          this.ngOnInit();
          this.ionViewWillEnter();
          this.presentAlertAdd();
        })
      }
    })
  }

    async presentAlertAdd() {
        const alert = await this.alertCtrl.create({
            header: 'Superhero added!',
            message: 'You have successfully added a new superhero!',
            buttons: ['GOOD'],
        });

        await alert.present();
    }

    async presentAlertUpdate() {
        const alert = await this.alertCtrl.create({
            header: 'Superhero updated!',
            message: 'You have successfully updated this superhero!',
            buttons: ['GOOD'],
        });

        await alert.present();
    }

  updateSuperhero(id: string, name: String, description: String, strength: number, universe: String, imageUrl: String, iconName: string) {
    this.modalCtrl.create({
      component: UpdateSuperheroModalComponent,
      componentProps: {'superheroName' : name,
        'superheroDescription': description,
        'superheroStrength' : strength,
        'superheroUniverse' : universe,
        'superheroImageUrl' : imageUrl
      }
    }).then((modal: HTMLIonModalElement) => {
      modal.present();
      return modal.onDidDismiss();
    }).then((resultData) => {
      if(resultData.role === 'confirm') {
        console.log(resultData);
        //povratna vrednost ove POST metode je Observable pa zato moramo da se subscribe-ujemo i da definisemo next fju
        //odnosno sta treba da se desi kad se superhero sacuva na firebase-u
        this.superheroService.updateSuperheroID(
            id,
            {name: resultData.data.superheroData.name,
              description: resultData.data.superheroData.description,
              strength: resultData.data.superheroData.strength,
              universe: resultData.data.superheroData.universe,
              imageUrl: resultData.data.superheroData.imageUrl,
              user_id: this.authService.getUserId(),
              iconName: iconName}
              ).subscribe((res) =>{
          console.log(res);
          this.ngOnInit();
          this.ionViewWillEnter();
          this.presentAlertUpdate();
        })
      }
    })
  }
}

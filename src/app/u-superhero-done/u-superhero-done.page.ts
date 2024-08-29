import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { SuperheroServiceService } from '../superhero-service.service';
import { AuthService } from '../auth/auth.service';
import { USuperhero } from './usuperhero-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-u-superhero-done',
  templateUrl: './u-superhero-done.page.html',
  styleUrls: ['./u-superhero-done.page.scss'],
})
export class USuperheroDonePage implements OnInit {

  constructor(private superheroService: SuperheroServiceService, private authService: AuthService, private router:Router) { }


  usuperheroes: USuperhero[];
  usuperhero: USuperhero;
  
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';
  isThereUSuperhero: boolean = false;


  ngOnInit() {
    this.superheroService.getallUSuperhero().subscribe((usuperherosData)=>{
      this.usuperheroes = usuperherosData;
      console.log("USUPERHEROJI", this.usuperheroes)
      for(const key in usuperherosData){
        //provera da ne gleda nasledjene property-je
        if(usuperherosData.hasOwnProperty(key)){
          if(usuperherosData[key].user_id == this.authService.getUserId()){
            this.isThereUSuperhero = true;
            this.usuperhero = usuperherosData[key];
          }
        }
      }
    })
    console.log(this.usuperhero);
  }



}

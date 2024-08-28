import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SuperheroServiceService } from '../superhero-service.service';
import { AuthService } from '../auth/auth.service';
import { USuperhero } from '../u-superhero/usuperhero-model';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor( private router:Router, private superheroService: SuperheroServiceService, private authService: AuthService) { }
  superheroForm: FormGroup;

  usuperheroes: USuperhero[];
  usuperhero: USuperhero;
  
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';

  ngOnInit() {
    this.superheroService.getallUSuperhero().subscribe((usuperherosData)=>{
      this.usuperheroes = usuperherosData;
      console.log("USUPERHEROJI", this.usuperheroes)
      if(usuperherosData.length>0) {
      for(const key in usuperherosData){
        console.log(usuperherosData[key].user_id + " ------------------------- " + this.authService.getUserId());
        if(usuperherosData.hasOwnProperty(key)){
          if(usuperherosData[key].user_id == this.authService.getUserId()){
            this.router.navigateByUrl('usuperherodone')
          } else {
            this.router.navigateByUrl('usuperhero')
          }
        }
      }} else{
        this.router.navigateByUrl('usuperhero')
      }
    })
  }

  



}

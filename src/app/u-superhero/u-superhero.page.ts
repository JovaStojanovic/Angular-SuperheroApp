import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { SuperheroServiceService } from '../superhero-service.service';
import { AuthService } from '../auth/auth.service';
import { USuperhero } from './usuperhero-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-u-superhero',
  templateUrl: './u-superhero.page.html',
  styleUrls: ['./u-superhero.page.scss'],
})
export class USuperheroPage implements OnInit {

  constructor(private superheroService: SuperheroServiceService, private authService: AuthService, private router:Router) { }

  superheroForm: FormGroup;

  usuperheroes: USuperhero[];
  usuperhero: USuperhero;
  
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  btnLabel: string = 'Capture image';
  isThereUSuperhero: boolean = false;

  closeCamera(){
    this.stream = null;
  }


  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.btnLabel = 'Re capture image'
    this.superheroForm.value.img = this.previewImage
    console.log(this.superheroForm.value.img)
    console.log(this.superheroForm.value);
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }

  checkPermision(){
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 300,
        height: 500
      }
    }).then((res) => {
      console.log("response", res);
      this.stream = res;
      this.status = 'My camera is accessing';
      this.btnLabel = 'Capture image';
    }).catch(err => {
      console.log(err);
      if(err?.message === 'Permission denied') {
        this.status = 'Permission denied please try again by approving the access';
      } else {
        this.status = 'You may not having camera system, Please try again ...';
      }
    })
  }

  captureImage() {
    this.trigger.next();
  }

  ngOnInit() {
    this.superheroForm = new FormGroup({
      //prvi argument u konstruktoru za formcontrol je default vrednost, drugi argument je validator
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      img: new FormControl(null, Validators.required)
    });
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
  }

  onUpload(){
    console.log(this.superheroForm.value);
    this.superheroService.uploadUSuperhero(this.superheroForm.value.name, this.superheroForm.value.description, this.superheroForm.value.img, this.authService.getUserId()).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('usuperherodone')
    });
  }



}

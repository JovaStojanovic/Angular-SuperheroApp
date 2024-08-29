import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SuperheroServiceService } from '../superhero-service.service';
import { AuthService } from '../auth/auth.service';
import { USuperhero } from './usuperhero-model';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
 

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

  //photo: SafeResourceUrl;

  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.previewImage=image.dataUrl;
    this.superheroForm.value.img = this.previewImage
    console.log(this.superheroForm.value.img)
  };


  onSubmit(form: NgForm){
    console.log(form.value);
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
    console.log(this.previewImage);
    this.superheroService.uploadUSuperhero(this.superheroForm.value.name, this.superheroForm.value.description, this.previewImage, this.authService.getUserId()).subscribe((res)=>{
      console.log(res);
      this.router.navigateByUrl('usuperherodone')
    });
  }



}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map,tap} from "rxjs";
import {Superhero} from "./superheroes/superhero-element/superhero-model";
import {AuthService} from "./auth/auth.service";
import {MysuperheroesPage} from "./mysuperheroes/mysuperheroes.page";

interface SuperheroData {
  name: String;
  description: String;
  strength: number;
  universe: String;
  imageUrl: String;
  user_id: String;
}


@Injectable({
  providedIn: 'root'
})
export class SuperheroServiceService {

  private _superheroes = new BehaviorSubject<Superhero[]>([])

  get superheroes(){
    return this._superheroes.asObservable();
  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  addSuperhero(name: String,
  description: String,
  strength: number,
  universe: String,
  imageUrl: String,
  user_id: String){
    return this.http.post<{id: string}>('https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json', {
      name, description, strength, universe, imageUrl, user_id
    })
  }


  //vraca objekat u formatu {"id1": {superhero1},"id2": {superhero2}...  }
  //superhero1 i superhero2 prate strukturu interfejsa SuperheroData
  //id dodeljuje sam firebase
  getSuperheroes(){
    return this.http.get<{[key: string]: SuperheroData}>('https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json')
      .pipe(map((superheroData)=>{
        console.log(superheroData);
        const superheroes: Superhero[]=[];

        for(const key in superheroData){
          //provera da ne gleda nasledjene property-je
          if(superheroData.hasOwnProperty(key)){
            superheroes.push({
              id:key,
              name: superheroData[key].name,
              description: superheroData[key].description,
              strength: superheroData[key].strength,
              universe: superheroData[key].universe,
              imageUrl: superheroData[key].imageUrl,
              user_id: this.authService.getUserId()
            });
          }
        }

        return superheroes;
      }),
      tap((superheroes)=>{
        this._superheroes.next(superheroes);


    }));
  }
  getSuperheroesById(){
    return this.http.get<{[key: string]: SuperheroData}>('https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json')
      .pipe(map((superheroData)=>{
          console.log(superheroData);
          const superheroes: Superhero[]=[];
          //const superherosById: Superhero[]=[];
          for(const key in superheroData){
            //provera da ne gleda nasledjene property-je
            if(superheroData.hasOwnProperty(key) && superheroData[key].user_id == this.authService.getUserId()){
              superheroes.push({
                id:key,
                name: superheroData[key].name,
                description: superheroData[key].description,
                strength: superheroData[key].strength,
                universe: superheroData[key].universe,
                imageUrl: superheroData[key].imageUrl,
                user_id: this.authService.getUserId()
              });
            }
          }

          /*for (let i = 0; i < superheroes.length; i++){
            if(superheroes[i].user_id == this.authService.getUserId()){
              superherosById.push(superheroes[i]);
            }
          }*/

          return superheroes;
        }),
        tap((superheroes)=>{
          this._superheroes.next(superheroes);


        }));
  }

  deleteSuperhero(superheroID: String) {
    return this.http.delete('https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes/'+superheroID+'.json');
  }

    updateSuperhero(id: string, updatedSuperhero: {name: string, description: string, strength: number, universe: string, imageUrl: string, userId: string}) {
      return this.http.put('https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes/'+id+'.json', updatedSuperhero);
    }
}

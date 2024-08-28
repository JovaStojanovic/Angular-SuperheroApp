import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map,tap} from "rxjs";
import {Superhero} from "./superheroes/superhero-element/superhero-model";
import {AuthService} from "./auth/auth.service";
import {Favorite} from "./favorites/favorite-element/favorite-model";
import { USuperhero } from './u-superhero/usuperhero-model';

interface SuperheroData {
  name: string;
  description: string;
  strength: number;
  universe: string;
  imageUrl: string;
  user_id: string;
  iconName: string;
}

interface USuperheroData {
  name: string;
  description: string;
  img: string;
  user_id: string;
}


interface FavoritesData{
  superheroID: string;
  user_id: String;
}


@Injectable({
  providedIn: 'root'
})
export class SuperheroServiceService {
  superheroesList: Superhero[];
  favoriteForDeleteId: string;
  id: string;
  isIt: Boolean;
  private _superheroes = new BehaviorSubject<Superhero[]>([])
  private _usuperheroes = new BehaviorSubject<USuperhero[]>([])
  private _favorites = new BehaviorSubject<Superhero[]>([])
  get superheroes(){
    return this._superheroes.asObservable();
  }
  get usuperheroes(){
    return this._usuperheroes.asObservable();
  }
  get favorites(){
    return this._favorites.asObservable();
  }
  constructor(private http: HttpClient, private authService: AuthService) { }

  addSuperhero(name: String,
  description: String,
  strength: number,
  universe: String,
  imageUrl: String,
  user_id: String,
  iconName: String){
    return this.http.post<{id: string}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json?auth=${this.authService.getToken()}`, {
      name, description, strength, universe, imageUrl, user_id, iconName
    })
  }

  uploadUSuperhero(name: string, description: string, img: string, user_id: String,){
    return this.http.post<{id: string}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/usuperhero.json?auth=${this.authService.getToken()}`, {
      name, description, img, user_id
    })
  }

  addFavorite(superheroID: String,
              user_id: String) {
    return this.http.post<{id: string}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/favorites.json?auth=${this.authService.getToken()}`, {
      superheroID, user_id
    })
  }

  

  //vraca objekat u formatu {"id1": {superhero1},"id2": {superhero2}...  }
  //superhero1 i superhero2 prate strukturu interfejsa SuperheroData
  //id dodeljuje sam firebase
  getSuperheroes(){
    return this.http.get<{[key: string]: SuperheroData}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json?auth=${this.authService.getToken()}`)
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
              user_id: this.authService.getUserId(),
                iconName: superheroData[key].iconName
            });
          }
        }

        return superheroes;
      }),
      tap((superheroes)=>{
        this._superheroes.next(superheroes);


    }));
  }

  getallUSuperhero(){
    return this.http.get<{[key: string]: USuperheroData}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/usuperhero.json?auth=${this.authService.getToken()}`)
      .pipe(map((usuperheroData)=>{
        console.log(usuperheroData);
        const usuperheroes: USuperhero[]=[];

        for(const key in usuperheroData){
          //provera da ne gleda nasledjene property-je
          if(usuperheroData.hasOwnProperty(key)){
            usuperheroes.push({
              id:key,
              name: usuperheroData[key].name,
              description: usuperheroData[key].description,
              img: usuperheroData[key].img,
              user_id: usuperheroData[key].user_id
            });
          }
        }

        return usuperheroes;
      }),
      tap((usuperheroes)=>{
        this._usuperheroes.next(usuperheroes);


    }));
  }

  getSuperheroesById(){
    return this.http.get<{[key: string]: SuperheroData}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes.json?auth=${this.authService.getToken()}`)
      .pipe(map((superheroData)=>{
          console.log(superheroData);
          console.log(this.authService.getUserId());
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
                user_id: this.authService.getUserId(),
                  iconName: superheroData[key].iconName
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
    return this.http.delete(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes/`+superheroID+`.json?auth=${this.authService.getToken()}`);
  }

    updateSuperhero(id: string, updatedSuperhero: {name: string, description: string, strength: number, universe: string, imageUrl: string,  iconName: string}) {
      return this.http.put(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes/`+id+`.json?auth=${this.authService.getToken()}`, updatedSuperhero);
    }

  updateSuperheroID(id: string, updatedSuperhero: {name: string, description: string, strength: number, universe: string, imageUrl: string, user_id:string, iconName: string}) {
    return this.http.put(`https://superhero-app-5c948-default-rtdb.firebaseio.com/superheroes/`+id+`.json?auth=${this.authService.getToken()}`, updatedSuperhero);
  }

  deleteFavorite(superheroID: string) {
    let id2: string = "";
    this.getFavoriteBySuperheroIDAndUserId(superheroID).subscribe(res=> {
      id2 = res;
      console.log(res);
      return this.http.delete(`https://superhero-app-5c948-default-rtdb.firebaseio.com/favorites/`+res+`.json?auth=${this.authService.getToken()}`).subscribe();
    });
  }
  getFavoriteBySuperheroIDAndUserId(superheroID: String) {
    return this.http.get<{[key: string]: FavoritesData}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/favorites.json?auth=${this.authService.getToken()}`)
      .pipe(map((favoritesData)=>{
          console.log(favoritesData);
          for(const key in favoritesData){
            //provera da ne gleda nasledjene property-je
            if(favoritesData.hasOwnProperty(key) && favoritesData[key].user_id == this.authService.getUserId() && favoritesData[key].superheroID == superheroID){
              this.favoriteForDeleteId = key;
            }
          }

          console.log(this.favoriteForDeleteId);
          return this.favoriteForDeleteId;
        }))
  }
  getFavoritesById() {
    return this.http.get<{[key: string]: FavoritesData}>(`https://superhero-app-5c948-default-rtdb.firebaseio.com/favorites.json?auth=${this.authService.getToken()}`)
      .pipe(map((favoritesData)=>{
          console.log(favoritesData);
          const favorites: Favorite[]=[];
          const superheroesF: Superhero[]=[];
          for(const key in favoritesData){
            //provera da ne gleda nasledjene property-je
            if(favoritesData.hasOwnProperty(key) && favoritesData[key].user_id == this.authService.getUserId()){
              favorites.push({
                id:key,
                superheroID: favoritesData[key].superheroID,
                user_id: this.authService.getUserId()
              });
            }
          }
          this.getSuperheroes().subscribe((IDsuperheroes)=>{
            console.log(IDsuperheroes);
            console.log(favorites);
            this.superheroesList = IDsuperheroes;
            for(const keyF in favorites) {
              for(const keyS in this.superheroesList) {
                if(favorites[keyF].superheroID == this.superheroesList[keyS].id && favorites[keyF].user_id == this.authService.getUserId()) {
                  console.log("POGODAK");
                  superheroesF.push({
                    id:this.superheroesList[keyS].id,
                    name: this.superheroesList[keyS].name,
                    description: this.superheroesList[keyS].description,
                    strength: this.superheroesList[keyS].strength,
                    universe: this.superheroesList[keyS].universe,
                    imageUrl: this.superheroesList[keyS].imageUrl,
                    user_id: this.authService.getUserId(),
                      iconName: this.superheroesList[keyS].iconName
                  });
                }
              }
            }
          });


          console.log(superheroesF);
          return superheroesF;
        }),
        tap((superheroesF)=>{
          this._superheroes.next(superheroesF);


        }));
  }

  isItInFavorites(superheroID: string){
    return this.http.get<{[key: string]: FavoritesData}>('https://superhero-app-5c948-default-rtdb.firebaseio.com/favorites.json')
      .pipe(map((favoritesData)=>{
        console.log(favoritesData);
        for(const key in favoritesData){
          //provera da ne gleda nasledjene property-je
          if(favoritesData.hasOwnProperty(key) && favoritesData[key].user_id == this.authService.getUserId() && favoritesData[key].superheroID == superheroID){
            return true;
          }
        }
        return false;
      }));
  }
}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'superheroes',
    loadChildren: () => import('./superheroes/superheroes.module').then( m => m.SuperheroesPageModule),
    canLoad: [AuthGuard]
  },
  /*{
    path: 'add-superhero',
    loadChildren: () => import('./add-superhero/add-superhero.module').then( m => m.AddSuperheroPageModule)
  },*/
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
      canLoad: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login-or-registration',
    loadChildren: () => import('./auth/login-or-registration/login-or-registration.module').then( m => m.LoginOrRegistrationPageModule)
  },
  {
    path: 'mysuperheroes',
    loadChildren: () => import('./mysuperheroes/mysuperheroes.module').then( m => m.MysuperheroesPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'usuperhero',
    loadChildren: () => import('./u-superhero/u-superhero.module').then( m => m.USuperheroPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'usuperherodone',
    loadChildren: () => import('./u-superhero-done/u-superhero-done.module').then( m => m.USuperheroDonePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule),
    canLoad: [AuthGuard]
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

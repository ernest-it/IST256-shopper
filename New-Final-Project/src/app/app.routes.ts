// Logan: route definitions for the Dine Finder app

import { Routes } from '@angular/router';
import { Browse } from './browse/browse';
import { Detail } from './detail/detail';
import { Favorites } from './favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' },
  { path: 'browse', component: Browse, title: 'Browse Restaurants' },
  { path: 'detail/:id', component: Detail, title: 'Restaurant Details' },
  { path: 'favorites', component: Favorites, title: 'Favorites' },
  { path: '**', redirectTo: 'browse' },
];

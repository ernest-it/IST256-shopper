// Mason: favorites and custom restaurant list management

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../restaurant';
import { DataService } from '../data.service';
import { CustomForm } from '../custom-form/custom-form';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, CustomForm],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

  // ---- Service ----

  private dataService = inject(DataService);

  // ---- View State ----

  favorites: Restaurant[] = [];
  customs:   Restaurant[] = [];

  // ---- Init ----

  constructor() {
    this.refresh();
  }

  // ---- Refresh both lists ----

  refresh() {
    this.dataService.loadAll().then((list) => {
      let favIds = this.dataService.getFavorites();
      let custom = this.dataService.getCustomRestaurants();

      let saved: Restaurant[] = [];
      favIds.forEach((id) => {
        let r = list.find((x) => x.id === id);
        if (r) {
          saved.push(r);
        }
      });

      this.favorites = saved;
      this.customs   = custom;
    });
  }

  // ---- Remove a saved favorite ----

  onRemoveFavorite(id: string) {
    this.dataService.removeFavorite(id);
    this.refresh();
  }

  // ---- Delete a custom restaurant ----

  onDeleteCustom(id: string) {
    this.dataService.deleteCustomRestaurant(id);
    this.dataService.removeFavorite(id);
    this.refresh();
  }

  // ---- Star Rendering ----

  stars(rating: number): string {
    let full  = Math.floor(rating);
    let empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }
}

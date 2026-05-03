// Logan: skeleton class for the favorites page. Mason wires the favorites
// list and the custom restaurants list (load + remove + delete). The
// add-custom-restaurant form is its own component owned by Jeremy and is
// embedded in the template, so this file does not depend on Jeremy.

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { CustomForm } from '../custom-form/custom-form';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, CustomForm],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

  // saved + custom lists
  favorites: Restaurant[] = [];
  customs: Restaurant[] = [];

  constructor() {
    // Mason: inject the data service and call refresh()
  }

  // Mason: re-pull both lists from the data service
  refresh() {
    // TODO Mason
  }

  // Mason: remove the favorite by id and refresh the list
  onRemoveFavorite(_id: string) {
    // TODO Mason
  }

  // Mason: delete the custom restaurant by id and refresh
  onDeleteCustom(_id: string) {
    // TODO Mason
  }

  // simple star rendering helper used by the template
  stars(rating: number): string {
    const full = Math.floor(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

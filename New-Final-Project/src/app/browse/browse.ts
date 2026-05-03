// Logan: skeleton class for the browse view. Mason fills in the data load,
// search/filter/sort logic, and favorite toggling.

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../models/restaurant';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './browse.html',
  styleUrl: './browse.css',
})
export class Browse {

  // form bindings
  searchText = '';
  selectedCuisine = 'All';
  selectedPrice = 'All';
  minRating = 0;
  sortBy = 'ratingDesc';

  // dropdown options
  cuisines: string[] = [
    'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
    'Mediterranean', 'Mexican', 'Southern', 'Steakhouse', 'Thai', 'Vietnamese',
  ];

  // data and view state
  restaurants: Restaurant[] = [];
  filtered: Restaurant[] = [];
  loading = false;
  resultCount = '';

  // Mason: re-run filters and sort whenever a control changes
  onFilterChange() {
    // TODO Mason
  }

  // resets all filters back to defaults, then re-runs the pipeline
  clearFilters() {
    this.searchText = '';
    this.selectedCuisine = 'All';
    this.selectedPrice = 'All';
    this.minRating = 0;
    this.sortBy = 'ratingDesc';
    this.onFilterChange();
  }

  // Mason: read favorite state from the data service
  isFavorite(_id: string): boolean {
    return false;
  }

  // Mason: toggle favorite via the data service
  toggleFavorite(_id: string) {
    // TODO Mason
  }

  // simple star rendering helper used by the template
  stars(rating: number): string {
    const full = Math.floor(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

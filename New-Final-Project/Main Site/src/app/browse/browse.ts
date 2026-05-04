// Mason: browse view with search, filter, and sort

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Restaurant } from '../restaurant';
import { DataService } from '../data.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './browse.html',
  styleUrl: './browse.css',
})
export class Browse {

  // ---- Service ----

  private dataService = inject(DataService);

  // ---- Form Bindings ----

  searchText      = '';
  selectedCuisine = 'All';
  selectedPrice   = 'All';
  minRating       = 0;
  sortBy          = 'ratingDesc';

  // ---- Dropdown Options ----

  cuisines: string[] = [
    'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
    'Mediterranean', 'Mexican', 'Southern', 'Steakhouse', 'Thai', 'Vietnamese',
  ];

  // ---- View State ----

  restaurants: Restaurant[] = [];
  filtered:    Restaurant[] = [];
  loading                   = true;
  resultCount               = '';

  // ---- Init ----

  constructor() {
    this.dataService.loadAll().then((list) => {
      this.restaurants = list;
      this.loading     = false;
      this.onFilterChange();
    });
  }

  // ---- Filter and Sort Pipeline ----

  onFilterChange() {
    let cuisine = this.selectedCuisine;
    let price   = this.selectedPrice;
    let minRate = this.minRating;
    let keyword = this.searchText.trim().toLowerCase();

    let filtered = this.restaurants.filter((r) => {
      if (cuisine !== 'All' && r.cuisine !== cuisine) return false;
      if (price   !== 'All' && r.priceRange !== price) return false;
      if (r.rating < minRate) return false;
      if (keyword !== '') {
        let inName = r.name.toLowerCase().includes(keyword);
        let inDesc = (r.description || '').toLowerCase().includes(keyword);
        if (!inName && !inDesc) return false;
      }
      return true;
    });

    let sorted = this.applySort(filtered);

    this.filtered    = sorted;
    this.resultCount = sorted.length + ' of ' + this.restaurants.length + ' restaurants shown';
  }

  applySort(list: Restaurant[]): Restaurant[] {
    let mode = this.sortBy;
    let copy = list.slice();

    if (mode === 'ratingDesc') {
      copy.sort((a, b) => b.rating - a.rating);
    } else if (mode === 'ratingAsc') {
      copy.sort((a, b) => a.rating - b.rating);
    } else if (mode === 'priceAsc') {
      copy.sort((a, b) => a.priceRange.length - b.priceRange.length);
    } else if (mode === 'priceDesc') {
      copy.sort((a, b) => b.priceRange.length - a.priceRange.length);
    } else if (mode === 'nameAsc') {
      copy.sort((a, b) => a.name.localeCompare(b.name));
    }
    return copy;
  }

  // ---- Filter Reset ----

  clearFilters() {
    this.searchText      = '';
    this.selectedCuisine = 'All';
    this.selectedPrice   = 'All';
    this.minRating       = 0;
    this.sortBy          = 'ratingDesc';
    this.onFilterChange();
  }

  // ---- Favorites ----

  isFavorite(id: string): boolean {
    return this.dataService.isFavorite(id);
  }

  toggleFavorite(id: string) {
    this.dataService.toggleFavorite(id);
  }

  // ---- Star Rendering ----

  stars(rating: number): string {
    let full  = Math.floor(rating);
    let empty = 5 - full;
    return '★'.repeat(full) + '☆'.repeat(empty);
  }
}

// Will: data service

import { Injectable } from '@angular/core';
import { Restaurant, PersonalNote } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private FAVORITES_KEY = 'dineFinder.favorites';
  private NOTES_KEY = 'dineFinder.notes';
  private CUSTOM_KEY = 'dineFinder.customRestaurants';

  constructor() {}

  // LOAD ALL RESTAURANTS
  async loadAll(): Promise<Restaurant[]> {
    const response = await fetch('assets/restaurants.json');
    const base: Restaurant[] = await response.json();
    const custom = this.getCustomRestaurants();
    return base.concat(custom);
  }

  async getById(id: string): Promise<Restaurant | undefined> {
    const list = await this.loadAll();
    return list.find((r) => r.id === id);
  }

  // FAVORITES
  getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
  }

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  }

  addFavorite(id: string) {
    const favs = this.getFavorites();
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    }
  }

  removeFavorite(id: string) {
    const updated = this.getFavorites().filter((f) => f !== id);
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(updated));
  }

  toggleFavorite(id: string) {
    this.isFavorite(id) ? this.removeFavorite(id) : this.addFavorite(id);
  }

  // NOTES
  getNote(id: string): PersonalNote | null {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    return notes[id] || null;
  }

  saveNote(id: string, note: string, ranking: number) {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    notes[id] = { note, ranking };
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  deleteNote(id: string) {
    const notes = JSON.parse(localStorage.getItem(this.NOTES_KEY) || '{}');
    delete notes[id];
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  // CUSTOM RESTAURANTS
  getCustomRestaurants(): Restaurant[] {
    return JSON.parse(localStorage.getItem(this.CUSTOM_KEY) || '[]');
  }

  saveCustomRestaurant(restaurant: Restaurant) {
    const custom = this.getCustomRestaurants();
    if (!restaurant.id) {
      restaurant.id = 'C' + Date.now();
    }
    custom.push(restaurant);
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(custom));
  }

  deleteCustomRestaurant(id: string) {
    const updated = this.getCustomRestaurants().filter((r) => r.id !== id);
    localStorage.setItem(this.CUSTOM_KEY, JSON.stringify(updated));
  }
}

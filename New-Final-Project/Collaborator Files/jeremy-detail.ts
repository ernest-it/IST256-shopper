// Jeremy: detail page logic and notes form validation

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Restaurant, PersonalNote } from '../models/restaurant';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  restaurantId: string | null = null;
  restaurant: Restaurant | null = null;
  loading = true;

  noteText = '';
  noteRanking: number | null = null;
  savedNote: PersonalNote | null = null;

  noteTextError = '';
  noteRankingError = '';

  formMessage = '';
  formAlertClass = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.loadRestaurant();
  }

  // load the restaurant info from the data service
  loadRestaurant() {
    var id = this.restaurantId;
    if (id === null) {
      this.loading = false;
      return;
    }

    this.dataService.getById(id).then((r) => {
      if (r) {
        this.restaurant = r;
      }
      this.loading = false;
      this.loadExistingNote();
    });
  }

  // pull the saved note for this restaurant if there is one
  loadExistingNote() {
    var id = this.restaurantId;
    if (id === null) {
      return;
    }

    var existing = this.dataService.getNote(id);
    if (existing) {
      this.savedNote = existing;
      this.noteText = existing.note;
      this.noteRanking = existing.ranking;
    } else {
      this.savedNote = null;
    }
  }

  // validate and save (or update) the note
  onSaveNote() {
    var id = this.restaurantId;
    if (id === null) {
      return;
    }

    var isValid = true;

    // clear out old error messages
    this.noteTextError = '';
    this.noteRankingError = '';
    this.formMessage = '';

    // note must not be blank
    if (this.noteText.trim() === '') {
      this.noteTextError = 'A note is required.';
      isValid = false;
    }

    // ranking must be a number from 1 to 10
    var rank = this.noteRanking;
    if (rank === null || isNaN(rank) || rank < 1 || rank > 10) {
      this.noteRankingError = 'Ranking must be a number from 1 to 10.';
      isValid = false;
    }

    if (isValid && rank !== null) {
      this.dataService.saveNote(id, this.noteText.trim(), rank);
      this.formMessage = 'Note saved.';
      this.formAlertClass = 'alert alert-success';
      this.loadExistingNote();
    }
  }

  // clear the saved note for this restaurant
  onDeleteNote() {
    var id = this.restaurantId;
    if (id === null) {
      return;
    }

    this.dataService.deleteNote(id);
    this.savedNote = null;
    this.noteText = '';
    this.noteRanking = null;
    this.formMessage = 'Note deleted.';
    this.formAlertClass = 'alert alert-warning';
  }

  // render stars for the rating
  stars(rating: number): string {
    var full = Math.floor(rating);
    var empty = 5 - full;
    var out = '';
    for (var i = 0; i < full; i++) {
      out = out + '★';
    }
    for (var j = 0; j < empty; j++) {
      out = out + '☆';
    }
    return out;
  }
}

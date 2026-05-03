// Logan: skeleton class for the restaurant detail view. Jeremy fills in the
// data load, the notes form validation, and save/update/delete behavior.

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Restaurant, PersonalNote } from '../models/restaurant';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail {

  // route + data state
  restaurantId: string | null = null;
  restaurant: Restaurant | null = null;
  loading = true;

  // notes form bindings
  noteText = '';
  noteRanking: number | null = null;
  savedNote: PersonalNote | null = null;

  // validation messages
  noteTextError = '';
  noteRankingError = '';

  // form-level message and its bootstrap alert class
  formMessage = '';
  formAlertClass = '';

  constructor(private route: ActivatedRoute) {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    // Jeremy: load the restaurant via the data service, then loadExistingNote()
  }

  // Jeremy: pull existing note for restaurantId from the data service
  loadExistingNote() {
    // TODO Jeremy
  }

  // Jeremy: validate noteText (required) and noteRanking (1 to 10), then save
  onSaveNote() {
    // TODO Jeremy
  }

  // Jeremy: clear the saved note for this restaurant
  onDeleteNote() {
    // TODO Jeremy
  }

  // simple star rendering helper used by the template
  stars(rating: number): string {
    const full = Math.floor(rating);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }
}

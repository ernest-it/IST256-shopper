// Jeremy: custom restaurant form validation

import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Restaurant } from '../restaurant';
import { DataService } from '../data.service';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-form.html',
})
export class CustomForm {

  cName = '';
  cCuisine = '';
  cPrice = '';
  cRating: number | null = null;
  cLocation = '';
  cAddress = '';
  cPhone = '';
  cDescription = '';

  cNameError = '';
  cCuisineError = '';
  cPriceError = '';
  cRatingError = '';
  cLocationError = '';
  cAddressError = '';

  customMessage = '';
  customAlertClass = '';

  cuisines: string[] = [
    'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
    'Mediterranean', 'Mexican', 'Southern', 'Steakhouse', 'Thai', 'Vietnamese',
  ];

  saved = output<void>();

  constructor(private dataService: DataService) {}

  // validate and save the new custom restaurant
  onSaveCustom() {
    var isValid = true;

    var name = this.cName.trim();
    var cuisine = this.cCuisine;
    var price = this.cPrice;
    var rating = this.cRating;
    var loc = this.cLocation.trim();
    var addr = this.cAddress.trim();
    var phone = this.cPhone.trim();
    var desc = this.cDescription.trim();

    // clear out old error messages
    this.cNameError = '';
    this.cCuisineError = '';
    this.cPriceError = '';
    this.cRatingError = '';
    this.cLocationError = '';
    this.cAddressError = '';
    this.customMessage = '';

    // check required fields
    if (name === '') {
      this.cNameError = 'Restaurant name is required.';
      isValid = false;
    }

    if (cuisine === '') {
      this.cCuisineError = 'Please select a cuisine.';
      isValid = false;
    }

    if (price === '') {
      this.cPriceError = 'Please select a price range.';
      isValid = false;
    }

    if (rating === null || isNaN(rating) || rating < 1 || rating > 5) {
      this.cRatingError = 'Rating must be a number from 1 to 5.';
      isValid = false;
    }

    if (loc === '') {
      this.cLocationError = 'Location is required.';
      isValid = false;
    }

    if (addr === '') {
      this.cAddressError = 'Address is required.';
      isValid = false;
    }

    if (isValid && rating !== null) {

      var newRestaurant: Restaurant = {
        id: 'C' + Date.now(),
        name: name,
        cuisine: cuisine,
        priceRange: price,
        rating: rating,
        location: loc,
        address: addr,
        phone: phone,
        hours: '',
        description: desc,
      };

      this.dataService.saveCustomRestaurant(newRestaurant);

      this.customMessage = 'Restaurant saved.';
      this.customAlertClass = 'alert alert-success';

      // reset the form fields
      this.cName = '';
      this.cCuisine = '';
      this.cPrice = '';
      this.cRating = null;
      this.cLocation = '';
      this.cAddress = '';
      this.cPhone = '';
      this.cDescription = '';

      // tell the favorites page to refresh
      this.saved.emit();
    }
  }
}

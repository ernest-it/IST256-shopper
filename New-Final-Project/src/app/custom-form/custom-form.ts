// Logan: skeleton class for the add custom restaurant form. Jeremy fills in
// the validation and the call to the data service. The component emits a
// "saved" event so the parent (Favorites) can refresh its list.

import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './custom-form.html',
  styleUrl: './custom-form.css',
})
export class CustomForm {

  // form bindings
  cName = '';
  cCuisine = '';
  cPrice = '';
  cRating: number | null = null;
  cLocation = '';
  cAddress = '';
  cPhone = '';
  cDescription = '';

  // validation messages
  cNameError = '';
  cCuisineError = '';
  cPriceError = '';
  cRatingError = '';
  cLocationError = '';
  cAddressError = '';

  // form-level message and alert class
  customMessage = '';
  customAlertClass = '';

  // dropdown options
  cuisines: string[] = [
    'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese',
    'Mediterranean', 'Mexican', 'Southern', 'Steakhouse', 'Thai', 'Vietnamese',
  ];

  // emitted to parent so the favorites list refreshes after a save
  saved = output<void>();

  // Jeremy: validate every required field, build a Restaurant object,
  // call dataService.saveCustomRestaurant(...), reset the form, set
  // customMessage / customAlertClass, then call this.saved.emit()
  onSaveCustom() {
    // TODO Jeremy
  }
}

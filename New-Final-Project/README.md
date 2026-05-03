# Dine Finder

IST 256 Final Project, Group 5: Will Cressman, Logan Henry, Jeremy Lucotch, Mason Miller.

A restaurant choices application built in Angular 18, using Bootstrap 3 styling and a local JSON file for data.

## Prerequisites (one time setup)

You need Node.js 18 or newer and the Angular CLI installed.

```
# install Node.js from https://nodejs.org/ (choose the LTS download)
# then in a terminal:
npm install -g @angular/cli
```

## Running the app locally

From inside the New-Final-Project folder:

```
npm install        # one time, installs Angular and all dependencies
npm start          # runs the dev server at http://localhost:4200
```

Open http://localhost:4200 in a browser. The app reloads automatically when files change.

## Building for submission

To produce a static build that the instructor can open from a folder:

```
npm run build
```

The build is written to `dist/dine-finder/browser/`. Zip the entire New-Final-Project folder for submission, or zip the build output if a static deliverable is preferred.

## Project layout

```
New-Final-Project/
  src/
    index.html           Logan, app shell document
    main.ts              app bootstrap entry
    styles.css           Logan, shared theme
    assets/
      restaurants.json   Will, restaurant data
    app/
      app.ts/html/css    Logan, root component with navbar and router outlet
      app.config.ts      Logan, providers
      app.routes.ts      Logan, route definitions
      models/
        restaurant.ts    Will, shared types
      browse/            Logan template + skeleton, Mason fills in logic
      detail/            Logan template + skeleton, Jeremy fills in logic
      favorites/         Logan template + skeleton, Mason fills in logic
      custom-form/       Logan template + skeleton, Jeremy fills in logic
      services/          Will, data service goes here
  angular.json           Angular workspace config
  package.json           dependencies and scripts
  tsconfig.json          TypeScript config
  tsconfig.app.json      app-specific TS config
```

## What each teammate still needs to deliver

### Will Cressman (Data and Integration Lead, ~20%)

Files to create:
- `src/assets/restaurants.json` (the placeholder there has one row, replace it with at least 15 restaurants)
- `src/app/services/data.service.ts`

The data service should be an `@Injectable({ providedIn: 'root' })` class with these methods used by the components:

| Method | Returns | Notes |
|---|---|---|
| `loadAll()` | `Promise<Restaurant[]>` | fetch restaurants.json and concatenate any custom restaurants from localStorage |
| `getById(id: string)` | `Restaurant \| null` | look up across the loaded list |
| `getFavorites()` | `string[]` | restaurant ids saved in localStorage |
| `isFavorite(id: string)` | `boolean` | |
| `toggleFavorite(id: string)` | `void` | |
| `addFavorite(id: string)` / `removeFavorite(id: string)` | `void` | |
| `getNote(id: string)` | `PersonalNote \| null` | |
| `saveNote(id: string, note: string, ranking: number)` | `void` | |
| `deleteNote(id: string)` | `void` | |
| `getCustomRestaurants()` | `Restaurant[]` | |
| `saveCustomRestaurant(r: Restaurant)` | `void` | |
| `deleteCustomRestaurant(id: string)` | `void` | |

localStorage keys to use: `dineFinder.favorites`, `dineFinder.notes`, `dineFinder.customRestaurants`.

The service is one of two `fetch()` call sites required by the rubric. The second is whoever loads the JSON in a component (Mason can call `loadAll()` from `Browse.constructor` or via an `ngOnInit`).

### Mason Miller (Lead Designer, ~20%)

Files to fill in:
- `src/app/browse/browse.ts` (replace stub methods)
- `src/app/favorites/favorites.ts` (the favorites and custom lists, plus the remove and delete handlers)
- `src/app/browse/browse.css` and `src/app/favorites/favorites.css` (card visuals: `.restaurant-card`, `.card-cuisine` badge, `.card-rating` gold stars, `.card-actions`, `.fav-heart`, `.filter-bar`)

In `browse.ts`, inject the data service via `inject(DataService)` and:
- on construct, call `loadAll()` then store the result in `this.restaurants` and run `onFilterChange()`
- `onFilterChange()` filters on cuisine / price / minRating / search text, then sorts on `sortBy`, and writes the result to `this.filtered` and the count text to `this.resultCount`
- `isFavorite(id)` and `toggleFavorite(id)` defer to the data service

In `favorites.ts`, inject the data service and on construct call `refresh()` which pulls saved favorites and customs. The custom restaurant form is its own component (`<app-custom-form>`) and the template already wires `(saved)="refresh()"`, so the favorites page does not depend on Jeremy.

### Jeremy Lucotch (Forms / Validation, ~20%)

Files to fill in (both are self-contained, no other teammate edits these):
- `src/app/detail/detail.ts` (notes form validation and save/update/delete)
- `src/app/custom-form/custom-form.ts` (custom restaurant form validation)

In `detail.ts`, inject the data service:
- on construct, look up the restaurant by `restaurantId` and call `loadExistingNote()` to prefill the form if a note already exists
- `onSaveNote()` validates `noteText` (required) and `noteRanking` (number 1 to 10), populates `noteTextError` / `noteRankingError`, then saves via the service. Set `formMessage` and `formAlertClass = 'alert alert-success'` on success
- `onDeleteNote()` calls the service and clears the form

In `custom-form.ts.onSaveCustom()`, validate `cName`, `cCuisine`, `cPrice`, `cRating` (1 to 5), `cLocation`, `cAddress`, build a Restaurant with a generated id (`'C' + Date.now()`), call `dataService.saveCustomRestaurant(...)`, reset all form fields, and call `this.saved.emit()` so the parent favorites page refreshes.

### Logan Henry (Project Manager, this is what is already done)

- `src/index.html` shell
- `src/styles.css` shared theme
- `src/app/app.ts`, `app.html`, `app.css`, `app.config.ts`, `app.routes.ts`
- `src/app/browse/browse.html` (template, with a skeleton class)
- `src/app/detail/detail.html` (template, with a skeleton class)
- `src/app/favorites/favorites.html` (template, with a skeleton class)

## Final project rubric coverage

- Three major views: `/browse`, `/detail/:id`, `/favorites`
- Two forms with validation: notes and ranking on detail, custom restaurant on favorites
- At least two async fetch requests: data service `loadAll()` is invoked from Browse, Detail, and Favorites
- JSON data: `src/assets/restaurants.json` plus localStorage state for favorites, notes, and custom restaurants
- Add, edit, remove items: favorites toggle, notes save/update/delete, custom restaurants add/delete
- Two or more data interaction features: search by keyword, filter on cuisine / price / rating, sort by rating / price / name
- Separate files for HTML, CSS, and JavaScript: enforced by Angular's component file split
- Polished consistent UI: Bootstrap 3 plus the dark theme from styles.css

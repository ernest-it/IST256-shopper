// Will: shared restaurant document shape used across all components

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;   // one of $, $$, $$$, $$$$
  rating: number;       // 1.0 to 5.0
  location: string;
  address: string;
  phone?: string;
  hours?: string;
  description?: string;
}

export interface PersonalNote {
  note: string;
  ranking: number;      // 1 to 10
}

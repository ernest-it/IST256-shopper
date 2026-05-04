// Will: restaurant types

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: string;
  rating: number;
  location: string;
  address: string;
  phone?: string;
  hours?: string;
  description?: string;
}

export interface PersonalNote {
  note: string;
  ranking: number;
}

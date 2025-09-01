export interface Country {
  _id: string;
  name: string;
  code: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  flag: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Procedure {
  _id: string;
  name: string;
  category: 'cosmetic' | 'dental' | 'imaging' | 'other';
  description: string;
  isNonInvasive: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Cost {
  _id: string;
  procedure: Procedure;
  country: Country;
  usCost: number;
  localCost: number;
  savings: number;
  savingsPercentage: number;
  currency: string;
  // Additional travel costs
  flightCost: number;
  hotelCost: number;
  visaCost: number;
  insuranceCost: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

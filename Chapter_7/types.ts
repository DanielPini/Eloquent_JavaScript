export type Graph = {
  [key: string]: string[];
};

export type SearchItem = { at: string; route: string[] };

export type Parcel = {
  place: string;
  address: string;
};

export type Memory = string[] | null;

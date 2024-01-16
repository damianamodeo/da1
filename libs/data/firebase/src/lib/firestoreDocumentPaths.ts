import { Bbox } from '@data-mapbox';

// NOT AT HOMES DOCUMENT
// const not_at_homes: {
//   suburb_options: SuburbOptions;
//   street_options: StreetOptions;
//   return_list: AddressList;
//   write_list: AddressList;
// } = {
//   suburb_options: [{ name: '', bbox: [0, 0, 0, 0] }],
//   street_options: [{ name: '', lat: 0, lng: 0 }],
//   return_list: [{}],
//   write_list: [],
// };

export type SuburbOption = {
  name: string;
  bbox: Bbox;
};

export type StreetOption = {
  name: string;
  lat: number;
  lng: number;
  suburb: string;
};

export type NotAtHomeAddress = {
  houseNumber: string;
  unitNumber: string;
  street: string;
  suburb: string;
  lat: number;
  lng: number;
  relevance: number;
  user: string;
  timestamp: number;
};

export type AddressList = NotAtHomeAddress[];

export const firestoreDocumentPaths = {
  not_at_homes: 'not_at_homes',
  // 'australia_nsw_maitland/maps': 'australia_nsw_maitland/maps',
  // 'australia_nsw_maitland/map_data': 'australia_nsw_maitland/map_data',
  // 'australia_nsw_maitland/not_at_homes': 'australia_nsw_maitland/not_at_homes',
  // 'maitland_nsw_australia/maps': 'maitland_nsw_australia/maps',
  // 'maitland_nsw_australia/not_at_homes': 'maitland_nsw_australia/not_at_homes',
  // 'notAtHomes/MaitlandCongregation': 'notAtHomes/MaitlandCongregation',
} as const;

export type FirestorePaths =
  (typeof firestoreDocumentPaths)[keyof typeof firestoreDocumentPaths];

export const docProperties = {
  test: 'test',
  mapData: 'mapData',
  map_data: 'map_data',
  maps: 'maps',
  not_at_homes: 'not_at_homes',
} as const;

export type FirestoreProperties = keyof typeof docProperties | string;

export default firestoreDocumentPaths;

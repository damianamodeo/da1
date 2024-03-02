import { SettingsDocument } from './document-types/settings';

export type NotAtHomeDocument = {
  return_list: NotAtHomeAddress[];
  write_list: NotAtHomeAddress[];
  suburb_options: SuburbOption[];
  street_options: StreetOption[];
};

export type SuburbOption = {
  name: string;
  bbox: [number, number, number, number];
};

export type StreetOption = {
  name: string;
  lat: number;
  lng: number;
  suburb: string;
};

export type NotAtHomeAddress = {
  return?: boolean;
  houseNumber: string;
  lat: number;
  lng: number;
  relevance: number;
  street: string;
  suburb: string;
  timestamp: number;
  unitNumber: string;
  user: string;
};

export type AddressList = NotAtHomeAddress[];

export type FireStoreDocuments =
  | NotAtHomeDocument
  | SettingsDocument
  | undefined;

export const firestoreDocumentPaths = {
  not_at_homes: 'not_at_homes',
  // 'australia_nsw_maitland/maps': 'australia_nsw_maitland/maps',
  // 'australia_nsw_maitland/map_data': 'australia_nsw_maitland/map_data',
  // 'australia_nsw_maitland/not_at_homes': 'australia_nsw_maitland/not_at_homes',
  // 'maitland_nsw_australia/maps': 'maitland_nsw_australia/maps',
  // 'maitland_nsw_australia/not_at_homes': 'maitland_nsw_australia/not_at_homes',
  // 'notAtHomes/MaitlandCongregation': 'notAtHomes/MaitlandCongregation',
} as const;

export type FirestoreDocumentPaths =
  (typeof firestoreDocumentPaths)[keyof typeof firestoreDocumentPaths];

// export const docProperties = {
//   test: 'test',
//   mapData: 'mapData',
//   map_data: 'map_data',
//   maps: 'maps',
//   not_at_homes: 'not_at_homes',
// } as const;

// export type FirestoreProperties = keyof typeof docProperties | string;

export default firestoreDocumentPaths;

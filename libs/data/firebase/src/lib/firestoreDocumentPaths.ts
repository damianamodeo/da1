export const firestoreDocumentPaths = {
  test: 'test/test',
  'australia_nsw_maitland/maps': 'australia_nsw_maitland/maps',
  'australia_nsw_maitland/map_data': 'australia_nsw_maitland/map_data',
  'australia_nsw_maitland/not_at_homes': 'australia_nsw_maitland/not_at_homes',
  'maitland_nsw_australia/maps': 'maitland_nsw_australia/maps',
  'maitland_nsw_australia/not_at_homes': 'maitland_nsw_australia/not_at_homes',
  'notAtHomes/MaitlandCongregation': 'notAtHomes/MaitlandCongregation',
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

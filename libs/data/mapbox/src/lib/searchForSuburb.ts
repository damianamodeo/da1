const MINIMUM_QUERY_LENGTH = 2;

import { GLOBAL_VARIABLES } from '@config';

// TODO make bbox user dependent
// TODO move api key to .env

export const searchForSuburb = async (suburbQuery: string) => {
  if (suburbQuery.length <= MINIMUM_QUERY_LENGTH) return [];

  const bbox = `&bbox=${146}%2C${-33}%2C${156}%2C${-31}`;
  const access_token = `&access_token=${GLOBAL_VARIABLES.MAPBOX_API_KEY}`;

  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${suburbQuery}.json?types=place${bbox}${access_token}`;
    const response = await fetch(url);
    const data = await response.json();
    const features = data.features;
    if (features === undefined) {
      return [];
    }
    return features;
  } catch (error) {
    console.error(error);
  }
};

export default searchForSuburb;

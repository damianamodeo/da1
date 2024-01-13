import { GLOBAL_VARIABLES } from '@config';

const MINIMUM_QUERY_LENGTH = 2;
const SEARCH_TOLERANCE = 0.0005; // 0.005 = approx 500m

export const searchForStreet = async ({
  streetQuery,
  bbox,
  suburb,
  country,
}: {
  streetQuery: string;
  bbox?: [number, number, number, number];
  suburb?: string;
  country?: string;
}) => {
  // TODO add suburb bbox to street search
  // TODO make bbox user dependent
  // TODO move api key to .env

  if (streetQuery.length <= MINIMUM_QUERY_LENGTH) {
    return [];
  }

  const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  const query = `${suburb}%20${streetQuery}`.replace(/ /g, '%20');
  const type = `types=address`;
  const bboxStr =
    bbox &&
    `&bbox=${bbox[0] - SEARCH_TOLERANCE}%2C${bbox[1] - SEARCH_TOLERANCE}%2C${
      bbox[2] + SEARCH_TOLERANCE
    }%2C${bbox[3] + SEARCH_TOLERANCE}`;
  const suburbStr = suburb && `&suburb=${suburb}`;
  const countryStr = country && `&country=${country}`;
  const access_token = `&access_token=${GLOBAL_VARIABLES.MAPBOX_API_KEY}`;
  const url = `${baseURL}${query}.json?${type}${bboxStr}${suburbStr}${countryStr}${access_token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const features = data.features;
    if (features === undefined) {
      return [];
    }
    return features;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default searchForStreet;

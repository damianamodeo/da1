import { GLOBAL_VARIABLES } from '@config';

type QueryType = {
  houseNumber: string;
  street: number | string;
  suburb: number | string;
  bbox?: [number, number, number, number];
  proximity: [number, number];
};
// TODO move api key to .env
// TODO possibly return street coords if no exact match is found
export const getAddressCoords = async ({
  houseNumber,
  street,
  suburb,
  bbox,
  proximity,
}: QueryType) => {
  const searchStr = `${houseNumber}%20${street}%20${suburb}`.replace(
    / /g,
    '%20'
  );
  const bboxStr =
    bbox && `&bbox=${bbox[0]}%2C${bbox[1]}%2C${bbox[2]}%2C${bbox[3]}`;
  const proximityStr =
    proximity && `&proximity=${proximity[0]}%2C${proximity[1]}`;
  const access_token = `&access_token=${GLOBAL_VARIABLES.MAPBOX_API_KEY}`;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchStr}.json?types=address&fuzzyMatch=false${bboxStr}${proximityStr}${access_token}`;
  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.features.length === 0) {
        return { lng: proximity[0], lat: proximity[1], relevance: 0 };
      }

      return {
        lng: data.features[0].center[0],
        lat: data.features[0].center[1],
        relevance: data.features[0].relevance,
      };
    });
};

export default getAddressCoords;

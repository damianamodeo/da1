import { GLOBAL_VARIABLES } from '@config';
import { useEffect, useState } from 'react';

const MINIMUM_QUERY_LENGTH = 2;
const searchTolerance = 0.0005; // 0.005 = approx 500m

export const useSearchStreet = ({
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
  const [features, setFeatures] = useState<any[]>([]);

  const baseURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
  const query = `${suburb}%20${streetQuery}`.replace(/ /g, '%20');
  const type = `types=address`;
  const bboxStr =
    bbox &&
    `&bbox=${bbox[0] - searchTolerance}%2C${bbox[1] - searchTolerance}%2C${
      bbox[2] + searchTolerance
    }%2C${bbox[3] + searchTolerance}`;
  const suburbStr = suburb && `&suburb=${suburb}`;
  const countryStr = country && `&country=${country}`;
  const access_token = `&access_token=${GLOBAL_VARIABLES.MAPBOX_API_KEY}`;
  const url = `${baseURL}${query}.json?${type}${bboxStr}${suburbStr}${countryStr}${access_token}`;


  // TODO add suburb bbox to street search
  // TODO make bbox user dependent
  // TODO move api key to .env
  // TODO prevent unnecessary run of this function

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const features = data.features;

        // console.log('🚀  features:', features);

        if (features === undefined) {
          setFeatures([]);
          return;
        }
        setFeatures(features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (streetQuery.length >= MINIMUM_QUERY_LENGTH) {
      fetchData();
    } else {
      setFeatures([]);
    }
  }, [streetQuery, bbox, suburb, country]);

  return features;
};

export default useSearchStreet;

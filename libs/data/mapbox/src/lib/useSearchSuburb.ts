const MAPBOX_API_TOKEN =
  'pk.eyJ1IjoiZGFtaWFuYW1vZGVvIiwiYSI6ImNqeWxnb3lsejA4OXozYmxpajhzMXdvZjQifQ.OJBOK5ZvGEX2VaScbW_zUQ';

const MINIMUM_QUERY_LENGTH = 2;

import { useEffect, useState } from 'react';

export const useSearchSuburb = (
  suburbQuery: string,
  country?: string,
  bbox?: number[]
) => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const searchSuburb = async () => {
      try {
        const types = 'place';
        const proximity = '151.209889,-33.874666';
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${suburbQuery}.json?types=${types}&proximity=${proximity}&access_token=${MAPBOX_API_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        const features = data.features;
        setFeatures(features);
      } catch (error) {
        console.error(error);
      }
    };

    if (suburbQuery.length >= MINIMUM_QUERY_LENGTH) {
      searchSuburb();
    } else {
      setFeatures([]);
    }
  }, [suburbQuery]);

  return features;
};

export default useSearchSuburb;

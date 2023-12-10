import { useEffect, useState } from 'react';

export const useSearchStreet = (
  streetQuery: string,
  bbox?: number[],
  suburb?: string,
  country?: string
) => {
  const [features, setFeatures] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchString = `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetQuery}.json?proximity=151.209889%2C-33.874666&types=address&fuzzyMatch=false&access_token=pk.eyJ1IjoiZGFtaWFuYW1vZGVvIiwiYSI6ImNqeWxnb3lsejA4OXozYmxpajhzMXdvZjQifQ.OJBOK5ZvGEX2VaScbW_zUQ&suburb=${suburb}`;
        const response = await fetch(searchString);
        const data = await response.json();
        const features = data.features;
        setFeatures(features);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [streetQuery, bbox, suburb, country]);

  return features;
};

export default useSearchStreet;

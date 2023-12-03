type QueryType = {
  houseNumber: string;
  street: string;
  suburb: string;
  bbox: [number, number, number, number];
  country?: string;
};

export const getAddressCoordinates = async ({
  houseNumber,
  street,
  suburb,
  bbox,
  country = 'au',
}: QueryType) => {
  const tolerance = 0.015;

  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${houseNumber}%20${street}%20${suburb}%20.json?country=${country}&bbox=${
    bbox[0] - tolerance
  }%2C${bbox[1] - tolerance}%2C${bbox[2] + tolerance}%2C${
    bbox[3] + tolerance
  }&types=address&fuzzyMatch=false&access_token=pk.eyJ1IjoiZGFtaWFuYW1vZGVvIiwiYSI6ImNqeWxnb3lsejA4OXozYmxpajhzMXdvZjQifQ.OJBOK5ZvGEX2VaScbW_zUQ`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      lng: data.features[0].center[0],
      lat: data.features[0].center[1],
      relevance: data.features[0].relevance,
    };
  } catch (error) {
    return error;

    // Handle the error...
  }
};

export default getAddressCoordinates;

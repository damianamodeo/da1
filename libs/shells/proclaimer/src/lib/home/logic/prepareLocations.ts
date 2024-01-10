import { DocumentData } from 'firebase/firestore';

export const prepareLocations = (addresses: DocumentData | undefined) => {
  return (
    addresses?.return_list
      ?.sort((a: any, b: any) => {
        const aUnitNumber = parseInt(a.unitNumber.match(/\d+/)?.[0], 10);
        const bUnitNumber = parseInt(b.unitNumber.match(/\d+/)?.[0], 10);
        const aHouseNumber = parseInt(a.houseNumber.match(/\d+/)?.[0], 10);
        const bHouseNumber = parseInt(b.houseNumber.match(/\d+/)?.[0], 10);
        if (aUnitNumber < bUnitNumber) {
          return -1;
        }
        if (aUnitNumber > bUnitNumber) {
          return 1;
        }
        if (aHouseNumber < bHouseNumber) {
          return -1;
        }
        if (aHouseNumber > bHouseNumber) {
          return 1;
        }
        return 0;
      })
      .reduce(
        (
          acc: any[],
          address: {
            lng: number;
            lat: number;
            houseNumber: string;
            street: string;
            suburb: string;
            unitNumber: string;
            relevance: number;
          }
        ) => {
          const {
            lng,
            lat,
            houseNumber,
            street,
            suburb,
            unitNumber,
            relevance,
          } = address;
          const match = acc.find(
            (location) =>
              location.lng === lng &&
              location.lat === lat &&
              location.properties.units.some(
                (prop: { houseNumber: any; street: any; suburb: any }) =>
                  prop.houseNumber === houseNumber &&
                  prop.street === street &&
                  prop.suburb === suburb
              )
          );

          if (match && unitNumber !== '') {
            match.properties.unitCount += 1;
            match.properties.units.push({ ...address });
            acc.push({
              lng,
              lat,
              properties: {
                units: [],
                houseNumber: 'f',
                relevance,
                unitCount: -1,
              },
            });
          } else {
            acc.push({
              lng,
              lat,
              properties: {
                units: [{ ...address }],
                houseNumber,
                relevance,
                unitCount: unitNumber !== '' ? 1 : 0,
              },
            });
          }

          return acc;
        },
        []
      )
      .map(
        (
          { lng, lat, unitCount, ...rest }: any,
          index: any,
          arr: {
            slice: (
              arg0: number,
              arg1: any
            ) => {
              (): any;
              new (): any;
              filter: {
                (arg0: (item: any) => boolean): {
                  (): any;
                  new (): any;
                  length: any;
                };
                new (): any;
              };
            };
          }
        ) => {
          const matchingCoordsCount = arr
            .slice(0, index)
            .filter((item) => item.lng === lng && item.lat === lat).length;

          const squareRoot = Math.sqrt(matchingCoordsCount);

          function bezierCurve(
            x: number,
            p0: number,
            p1: number,
            p2: number,
            p3: number
          ) {
            const t = Math.min(Math.max(x, 0), 1); // Ensure x is within the range [0, 1]
            const u = 1 - t;

            const term1 = u * u * u;
            const term2 = 3 * u * u * t;
            const term3 = 3 * u * t * t;
            const term4 = t * t * t;

            const result = term1 * p0 + term2 * p1 + term3 * p2 + term4 * p3;

            return result * 90;
          }

          const xxx = bezierCurve(matchingCoordsCount / 140, 0.6, 4.8, 4, 2);
          const radius = xxx * 0.000003; // Adjust the 0.1 factor to control the spiral's size

          const yyy = bezierCurve(matchingCoordsCount / 55, 1, 2, 1.75, 2.5);
          const angle = yyy * 0.2; // Adjust the 0.1 factor to control the spiral's tightness

          const newLng =
            matchingCoordsCount === 0 ? lng : lng + radius * Math.cos(angle);
          const newLat =
            matchingCoordsCount === 0 ? lat : lat + radius * Math.sin(angle);

          return {
            longitude: unitCount === -1 ? lng : newLng,
            latitude: unitCount === -1 ? lat : newLat,
            properties: {
              matchingCoordsCount,
            },
            ...rest,
          };
        }
      ) || []
  );
};

export default prepareLocations;

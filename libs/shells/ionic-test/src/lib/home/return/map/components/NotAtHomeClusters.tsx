import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';
import { Clusters2 } from '@ui-mapbox';

export const NotAtHomeClusters = ({ view, updateView, mapRef }: any) => {
  const addresses = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const locations =
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
      .map(
        (
          { lng, lat, ...rest }: any,
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

          const newMatchingCoordsCount = matchingCoordsCount + 1.2;
          var initialValue = newMatchingCoordsCount;
          var decayFactor = 0.95;
          var currentValue =
            initialValue * Math.pow(decayFactor, newMatchingCoordsCount);
          // console.log(currentValue);
          const radius = currentValue * 0.000022; // Adjust the 0.1 factor to control the spiral's size

          var initialValue2 = newMatchingCoordsCount;
          var decayFactor2 = 0.96;
          var currentValue2 =
            initialValue2 * Math.pow(decayFactor2, newMatchingCoordsCount);
          const angle = currentValue2 * 1.9; // Adjust the 0.1 factor to control the spiral's tightness

          const newLng = lng + radius * Math.cos(angle);
          const newLat = lat + radius * Math.sin(angle);

          return {
            longitude: newLng,
            latitude: newLat,
            properties: {
              ...rest,
              matchingCoordsCount,
            },
          };
        }
      ) || [];

  const Cluster = ({ properties }: any) => {
    return (
      <div
        className="centered"
        style={{
          zIndex: 1,
          color: 'white',
          backgroundColor: 'blue',
          width: `${30 + properties.point_count * 1.5}px`,
          height: `${30 + properties.point_count * 1.5}px`,
          borderRadius: '50%',
        }}
      >
        {properties.point_count}
      </div>
    );
  };
  const Marker = ({ properties }: any) => {
    const color = properties.relevance === 1 ? 'red' : 'orange';
    const size = (factor: number) => {
      return view.zoom < 15
        ? 7
        : (view.zoom * view.zoom) / (factor - view.zoom);
    };

    if (properties.unitNumber === '') {
      return (
        <div
          className="centered"
          style={{
            zIndex: 0,
            color: 'white',
            fontSize: size(34),
            backgroundColor: color,
            width: size(26),
            height: size(26),
            borderRadius: '50%',
          }}
        >
          {view.zoom > 15 && properties.houseNumber}
          {/* {view.zoom.toFixed(2)} */}
        </div>
      );
    }
    return (
      <div
        className="centered"
        style={{
          zIndex: 0,
          color: 'white',
          fontSize: size(40),
          backgroundColor: color,
          width: size(34) * 2.75,
          height: size(34),
          borderRadius: size(90),
        }}
      >
        {properties.unitNumber}/{properties.houseNumber}
      </div>
    );
  };
  return (
    <Clusters2
      view={view}
      updateView={updateView}
      mapRef={mapRef}
      locations={locations}
      onMarkerClick={(properties) => {
        alert(
          `${properties.unitNumber ? properties.unitNumber + '/' : ''}${
            properties.houseNumber
          } ${properties.street} ${properties.suburb}`
        );
      }}
      ClusterComponent={Cluster}
      MarkerComponent={Marker}
    />
  );
};

export default NotAtHomeClusters;

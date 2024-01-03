import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';
import { Clusters } from '@ui-mapbox';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './Layers';

import { Map, Source, Layer } from 'react-map-gl';

export const NotAtHomeClusters2 = ({ view, updateView, mapRef }: any) => {
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

  const Cluster = ({ properties }: any) => {};
  const Marker = ({ properties }: any) => {};
  return (
    <Clusters
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
      // ClusterComponent={Cluster}
      // MarkerComponent={Marker}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={locations}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Clusters>
  );
};

export default NotAtHomeClusters2;

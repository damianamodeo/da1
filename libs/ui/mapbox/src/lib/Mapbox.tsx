import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import mapboxgl, { LngLatLike, Map, MapboxGeoJSONFeature } from 'mapbox-gl';
import { GLOBAL_VARIABLES } from '@config';
import './Map.css';
import 'mapbox-gl';
import geoJson from './chicago-parks';
import {
  AddressList,
  firestoreDocumentPaths,
  useFirestoreData,
} from '@data-firebase';
import {
  Feature,
  FeatureCollection,
  Geometry,
  GeoJsonProperties,
  Position,
} from 'geojson';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';

mapboxgl.accessToken = GLOBAL_VARIABLES.MAPBOX_API_KEY;

const coords = GLOBAL_VARIABLES.MAITLAND_COORDS;

const addressToGeoJSON = (
  addresses: {
    coordinates: Position;
    properties: GeoJsonProperties;
  }[]
): FeatureCollection<Geometry, GeoJsonProperties> => {
  const geoJson: Feature<Geometry, GeoJsonProperties>[] = addresses.map(
    ({ coordinates, properties }) => {
      return {
        type: 'Feature',
        properties,
        geometry: {
          type: 'Point',
          coordinates,
        },
      };
    }
  );
  return { type: 'FeatureCollection', features: geoJson };
};

const initialState = (): any => {
  return {
    map: null,
    modalIsOpen: false,
  };
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        ...state,
        timestamp: action.payload.timestamp,
        address: action.payload.address,
        action: action.payload.action,
      };
    default:
      return state;
  }
};

export const Mapbox = () => {
  const mapContainerRef = useRef<any>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [address, setAddress] = useState<any>({
    suburb: '',
    street: '',
    houseNumber: '',
    unitNumber: '',
    timeStamp: 0,
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  const addresses = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const xxx =
    addresses?.return_list?.map(
      ({ lng, lat, ...rest }: { lng: number; lat: number }) => {
        return {
          coordinates: [lng, lat],
          properties: rest,
        };
      }
    ) || [];

  const data = addressToGeoJSON(xxx);

  const clusterFactory = ({
    id,
    style,
    map: newMap,
    data,
    onClick,
  }: {
    id: string;
    style: string;
    map: any;
    data: any;
    onClick: (properties: { [key: string]: any }) => any;
  }) => {
    const styles: { [key: string]: any } = {
      not_at_homes: {
        'circle-color': ['#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
      },
      not_at_homes2: {
        'circle-color': [
          '#F00',
          2,
          '#F11',
          3,
          '#F22',
          4,
          '#F33',
          5,
          '#F44',
          6,
          '#F55',
          7,
          '#F66',
          8,
          '#F77',
          9,
          '#F88',
          10,
          '#F99',
          11,
          '#faa',
          12,
          '#fbb',
          13,
          '#fcc',
          14,
          '#fdd',
          15,
          '#fee',
          16,
          '#fff',
        ],
        'circle-radius': [10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40, 30, 50],
      },
    };
    newMap.addSource('earthquakes', {
      type: 'geojson',
      data: data,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });

    // cluster circle
    newMap.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
        'circle-color': [
          'step',
          ['get', 'point_count'],
          ...styles[style]['circle-color'],
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          ...styles[style]['circle-radius'],
        ],
        'circle-stroke-width': 1,
        'circle-stroke-color': '#000',
      },
    });

    // cluster text
    newMap.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

    // cluster click
    newMap.on('click', 'clusters', (e: { point: any }) => {
      const features = newMap.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      const clusterId = features[0].properties.cluster_id;
      newMap
        .getSource('earthquakes')
        .getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
          if (err) return;

          newMap.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // marker circle
    newMap.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#F00',
        'circle-radius': 15,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#FFF',
      },
    });

    // marker text
    newMap.addLayer({
      id: 'point-houseNumber',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      layout: {
        'text-field': ['get', 'houseNumber'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 16,
      },
    });

    // marker click
    newMap.on('click', 'unclustered-point', (e: any) =>
      onClick(e.features[0].properties)
    );

    // other
    newMap.on('mouseenter', 'clusters', () => {
      newMap.getCanvas().style.cursor = 'pointer';
    });

    newMap.on('mouseleave', 'clusters', () => {
      newMap.getCanvas().style.cursor = '';
    });
  };

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [
        GLOBAL_VARIABLES.MAITLAND_COORDS.lng,
        GLOBAL_VARIABLES.MAITLAND_COORDS.lat,
      ],
      zoom: 10,
    });

    newMap.on('load', () => {
      clusterFactory({
        map: newMap,
        id: 'earthquakes',
        style: 'not_at_homes2',
        data: data,
        onClick: (properties: any) => {
          setAddress(properties);
          setModalIsOpen(true);
        },
      });

      const content = [
        {
          id: 'not_at_homes',
          style: 'not_at_homes2',
          type: 'cluster',
          data: data,
          onClick: (properties: any) => console.log(properties),
        },
      ];

      content.forEach((content) => {
        switch (content.type) {
          case 'cluster':
            clusterFactory({
              id: content.id,
              style: content.style,
              map: newMap,
              data: content.data,
              onClick: content.onClick,
            });
            break;

          default:
            break;
        }
      });
    });

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map) {
      const source: any = map.getSource('earthquakes');
      source.setData(data);
    }
  }, [addresses]);

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />

      <IonModal isOpen={modalIsOpen}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirm</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  setModalIsOpen(false);
                }}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {false ? (
            <div className="full centered">
              <LoadingSpinner></LoadingSpinner>
            </div>
          ) : (
            <>
              <IonList inset className="ion-padding">
                <IonListHeader>
                  <IonLabel>
                    {`${address.unitNumber ? address.unitNumber + '/' : ''}${
                      address.houseNumber
                    } ${address.street} ${address.suburb}`}
                    <IonNote>
                      <br></br>
                    </IonNote>
                  </IonLabel>
                </IonListHeader>
              </IonList>
              <IonList className="ion-padding"></IonList>
              {/* TODO add function to delete address or send to letter list */}
              <IonButton
                className="ion-padding"
                expand="block"
                onClick={() => {
                  return;
                }}
              >
                Submit
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>
    </div>
  );
};
export default Mapbox;

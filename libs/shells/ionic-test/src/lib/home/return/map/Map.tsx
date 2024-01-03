import { ErrorBoundary } from 'react-error-boundary';
import { Clusters, Mapbox } from '@ui-mapbox';

import { mailOpenOutline } from 'ionicons/icons';

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  houseNumber,
  units,
} from './components/Layers';
import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';
import {
  IonActionSheet,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

function Fallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

import { Reducer, useReducer } from 'react';

const initialState = {
  modal: false,
  isUnits: true,
  addresses: [{}] as { [key: string]: number | string }[],
};

type State = typeof initialState;

type Action =
  | { type: 'SET_MODAL'; payload: boolean }
  | {
      type: 'SET_ISUNITS';
      payload: {
        isUnits: typeof initialState.isUnits;
        addresses: typeof initialState.addresses;
      };
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      };
    case 'SET_ISUNITS':
      return {
        ...state,
        modal: true,
        isUnits: action.payload.isUnits,
        addresses: action.payload.addresses,
      };
    default:
      return state;
  }
};

export const Map = () => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState);

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
      ) || [];

  const onClick = Clusters.onClick({
    sourceID: 'not_at_homes',
    onPointClick: (properties) => {
      dispatch({
        type: 'SET_ISUNITS',
        payload: {
          isUnits: properties.features[0].properties.unitCount > 0,
          addresses: JSON.parse(properties.features[0].properties.units),
        },
      });
      if (properties.features[0].properties.unitCount > 0) {
        return;
      }
    },
  });

  return (
    <>
      <div className="full centered">
        <ErrorBoundary FallbackComponent={Fallback}>
          <Mapbox
            onClick={onClick}
            interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
          >
            {(controls: any) => {
              return (
                <Clusters
                  {...controls}
                  source={{
                    id: 'not_at_homes',
                    clusterMaxZoom: 13,
                    clusterRadius: 50,
                  }}
                  locations={locations}
                  layers={[
                    clusterLayer,
                    clusterCountLayer,
                    unclusteredPointLayer,
                    houseNumber,
                    units,
                  ]}
                ></Clusters>
              );
            }}
          </Mapbox>
        </ErrorBoundary>
      </div>
      <IonModal isOpen={state.modal && state.isUnits}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirm</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => dispatch({ type: 'SET_MODAL', payload: false })}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonListHeader>
              <IonLabel>
                {state.addresses[0].houseNumber} {state.addresses[0].street}{' '}
                {state.addresses[0].suburb}
              </IonLabel>
            </IonListHeader>
            {state.addresses.map((address) => {
              if (state.isUnits) return;
              return (
                <IonItem key={address.timestamp}>
                  Unit: {address.unitNumber}
                  <IonIcon
                    color="primary"
                    icon={mailOpenOutline}
                    slot="end"
                    onClick={() => {
                      return;
                    }}
                  ></IonIcon>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>

      <IonActionSheet
        isOpen={state.modal && !state.isUnits}
        header="Delete Address"
        subHeader={'state.addresses'}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            // handler: handleConfirmRemove,
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              dispatch({ type: 'SET_MODAL', payload: false });
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
};

export default Map;

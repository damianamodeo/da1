import { ErrorBoundary } from 'react-error-boundary';
import { Clusters, Mapbox } from '@ui-mapbox';
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
  houseNumber,
  units,
} from './components/Layers';
import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';

function Fallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
}

import { Reducer, useReducer } from 'react';
import ConfirmHouseDelete from './components/ConfirmHouseDelete';
import ConfirmUnitsDelete from './components/ConfirmUnitsDelete';
import prepareLocations from '../../../logic/prepareLocations';

const initialState = {
  modal: false,
  isUnits: true,
  addresses: [{}] as { [key: string]: number | string }[],
};

export type State = typeof initialState;

export type Action =
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

  const locations = prepareLocations(addresses);

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

      <ConfirmUnitsDelete
        state={state}
        dispatch={dispatch}
      ></ConfirmUnitsDelete>

      <ConfirmHouseDelete
        state={state}
        dispatch={dispatch}
      ></ConfirmHouseDelete>
    </>
  );
};

export default Map;

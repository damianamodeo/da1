import { useState, SetStateAction, useRef, RefObject } from 'react';
import Map, { GeolocateControl, ViewState } from 'react-map-gl';
import { GLOBAL_VARIABLES } from '@config';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import type { MapMouseEvent, MapRef } from 'react-map-gl';
import { ErrorBoundary } from 'react-error-boundary';
const TOKEN = GLOBAL_VARIABLES.MAPBOX_API_KEY;

export type MapboxProps = {
  children?: ({
    view,
    updateView,
    mapRef,
  }: {
    view: ViewState;
    updateView: (newView: SetStateAction<ViewState>) => void;
    mapRef: RefObject<MapRef>;
  }) => JSX.Element;
  interactiveLayerIds?: (string | undefined)[];
  onClick?: ({
    event,
    view,
    updateView,
    mapRef,
  }: {
    event: MapMouseEvent;
    view: ViewState;
    updateView: (newView: SetStateAction<ViewState>) => void;
    mapRef: RefObject<MapRef>;
  }) => void;
};
export const Mapbox = ({
  children,
  interactiveLayerIds,
  onClick,
}: MapboxProps) => {
  const initialViewState = localStorage.getItem('map-view-state')
    ? JSON.parse(localStorage.getItem('map-view-state') || '')
    : {
        zoom: 12,
        longitude: -91.874,
        latitude: 42.76,
        pitch: 0,
        bearing: 0,
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
      };
  const [view, setView] = useState<ViewState>(initialViewState);
  const mapRef = useRef<MapRef>(null);
  const updateView = (newView: SetStateAction<ViewState>) => setView(newView);

  const ErrorFallback = ({ error }: { error: Error | null }) => {
    return <div>Something went wrong: {error?.message}</div>;
  };
  
  return (
    <div className="full centered">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Map
          mapboxAccessToken={TOKEN}
          reuseMaps
          initialViewState={{
            ...view,
          }}
          mapStyle="mapbox://styles/damianamodeo/clefifzvz000u01nw8h84n67m"
          onRender={(event) => event.target.resize()}
          onMoveEnd={(e) => {
            localStorage.setItem('map-view-state', JSON.stringify(e.viewState));
            setView(e.viewState);
          }}
          ref={mapRef}
          interactiveLayerIds={interactiveLayerIds as string[]}
          onClick={(event) => {
            if (onClick) {
              onClick({ event, view, updateView, mapRef });
            }
          }}
        >
          <GeolocateControl></GeolocateControl>
          {children && children({ view, updateView, mapRef })}
        </Map>
      </ErrorBoundary>
    </div>
  );
};

export default Mapbox;

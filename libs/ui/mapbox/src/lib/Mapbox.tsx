import { useState, SetStateAction, useRef } from 'react';
import Map, { GeolocateControl, ViewState } from 'react-map-gl';

// import DrawControl from './draw-control';
import { GLOBAL_VARIABLES } from '@config';
// import { ErrorBoundary } from '@ui-base';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const TOKEN = GLOBAL_VARIABLES.MAPBOX_API_KEY;

export const Mapbox2 = ({ children }: any) => {
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
  const mapRef = useRef(null);
  const updateView = (newView: SetStateAction<ViewState>) => setView(newView);

  return (
    <div className="full centered">
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
      >
        <GeolocateControl ></GeolocateControl>
        {children({ view, updateView, mapRef })}
      </Map>
    </div>
  );
};

export default Mapbox2;

import { GLOBAL_VARIABLES } from '@config';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const ShellTesting = () => {
  return (
    <div
      style={{ position: 'fixed', top: 50, left: 50, right: 50, bottom: 50 }}
    >
      <Map
        mapboxAccessToken={GLOBAL_VARIABLES.MAPBOX_API_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      />
    </div>
  );
};

export default ShellTesting;

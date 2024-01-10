import { GLOBAL_VARIABLES } from '@config';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const Mapbox1 = () => {
  return (
    <Map
      mapboxAccessToken={GLOBAL_VARIABLES.MAPBOX_API_KEY}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onData={(e) => e.target.resize()}
    />
  );
};

export default Mapbox1;

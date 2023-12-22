import { useRef, useEffect } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { GLOBAL_VARIABLES } from '@config';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = GLOBAL_VARIABLES.MAPBOX_API_KEY;

export const Mapbox = () => {
  const mapContainerRef = useRef<any>(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: GLOBAL_VARIABLES.MAITLAND_COORDS as LngLatLike,
      zoom: 10,
    });

    return () => map.remove();
  }, []);

  return <div className="full" ref={mapContainerRef} />;
};

export default Mapbox;

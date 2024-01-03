import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from 'geojson';
import { Key, SetStateAction } from 'react';
import {
  GeoJSONSource,
  Layer,
  LayerProps,
  MapMouseEvent,
  MapRef,
  Source,
  SourceProps,
  ViewState,
} from 'react-map-gl';
import { JSX } from 'react/jsx-runtime';

export const Clusters = ({
  locations,
  layers,
  source,
}: {
  locations: {
    longitude: number;
    latitude: number;
    properties: { [key: string]: any };
  }[];
  view: ViewState;
  updateView: SetStateAction<ViewState>;
  mapRef: React.RefObject<MapRef>;
  layers: LayerProps[];
  source: Omit<Omit<Omit<SourceProps, 'data'>, 'type'>, 'cluster'>;
}) => {
  const points: Feature<Geometry, GeoJsonProperties>[] = locations.map(
    ({ longitude, latitude, properties }) => ({
      type: 'Feature',
      properties: { cluster: false, ...properties },
      geometry: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    })
  );

  const data: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: [...points],
  };

  return (
    <Source {...source} type={'geojson'} cluster={true} data={data}>
      {layers.map(
        (
          layer: JSX.IntrinsicAttributes & LayerProps,
          index: Key | null | undefined
        ) => (
          <Layer key={index} {...layer}></Layer>
        )
      )}
    </Source>
  );
};

Clusters.onClick = ({
  sourceID,
  onPointClick,
}: {
  sourceID: string;
  onPointClick: (properties: { [key: string]: any }) => void;
}) => {
  return ({
    event,
    mapRef,
  }: {
    event: MapMouseEvent & {
      features?: Feature[] &
        { geometry?: { coordinates?: [number, number] } }[];
    };
    mapRef: any;
  }) => {
    const features = event.features;
    if (!features) {
      return;
    }
    if (features[0]?.properties?.cluster) {
      const clusterId = features[0].properties.cluster_id;
      const mapboxSource = mapRef.current.getSource(sourceID) as GeoJSONSource;
      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) {
          return;
        }
        mapRef.current.easeTo({
          center: features[0].geometry.coordinates || [0, 0],
          zoom,
          duration: 500,
        });
      });
      return;
    }
    onPointClick({ event: event, features: features });
  };
};

export default Clusters;

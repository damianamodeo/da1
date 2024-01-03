import { Marker } from 'react-map-gl';
import useSupercluster from 'use-supercluster';

export type Clusters2Props = {
  locations: {
    longitude: number;
    latitude: number;
    properties: { [key: string]: any };
  }[];
  onMarkerClick: (properties: { [key: string]: any }) => void;
  ClusterComponent: ({
    properties,
  }: {
    properties: { [key: string]: any };
  }) => JSX.Element;
  MarkerComponent: ({
    properties,
  }: {
    properties: { [key: string]: any };
  }) => JSX.Element;
};

export const Clusters2 = ({
  view,
  updateView,
  mapRef,
  locations,
  onMarkerClick,
  ClusterComponent,
  MarkerComponent,
}: {
  view: any;
  updateView: (view: any) => void;
  mapRef: any;
} & Clusters2Props) => {
  const points = locations.map(({ longitude, latitude, properties }) => ({
    type: 'Feature',
    properties: { cluster: false, ...properties },
    geometry: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: view.zoom,
    options: { radius: 75, maxZoom: 13, minPoints: 4 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
          ...rest
        } = cluster.properties;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  updateView({
                    ...view,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                  });
                  mapRef.current?.flyTo({
                    center: [longitude, latitude],
                    zoom: expansionZoom,
                    duration: 2000,
                  });
                }}
              >
                <ClusterComponent properties={cluster.properties} />
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={`crime-${rest.timestamp}`}
            latitude={latitude}
            longitude={longitude}
          >
            <button
              style={{ background: 'transparent', width: '25px' }}
              className="centered"
              onClick={() => {
                onMarkerClick(rest);
              }}
            >
              <MarkerComponent properties={cluster.properties} />
            </button>
          </Marker>
        );
      })}
    </>
  );
};

export default Clusters2;

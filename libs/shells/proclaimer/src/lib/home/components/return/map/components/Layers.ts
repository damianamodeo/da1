import type { LayerProps } from 'react-map-gl';

const clusterSizing = [4, 12, 100, 30, 400, 60];

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': 'blue',
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['get', 'point_count'],
      ...clusterSizing,
    ],
  },
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  filter: ['has', 'point_count'],
  paint: {
    'text-color': 'white',
  },
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': [
      'interpolate',
      ['linear'],
      ['get', 'point_count'],
      ...clusterSizing,
    ],
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['>=', ['get', 'unitCount'], 0],
  ],
  paint: {
    'circle-color': [
      'case',
      ['>', ['get', 'unitCount'], 1],
      ['case', ['>', ['get', 'unitCount'], 5], 'purple', 'orange'],
      'red',
    ],
    'circle-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      16,
      4,
      22,
      [
        'case',
        ['>', ['get', 'unitCount'], 0],
        ['+', ['*', ['get', 'unitCount'], 10], 140],
        100,
      ],
    ],
    'circle-stroke-color': '#fff',
    'circle-opacity': ['case', ['<', ['get', 'relevance'], 1], 0.5, 1],

    'circle-blur': ['case', ['<', ['get', 'relevance'], 1], 0.3, 0],
  },
};

export const houseNumber: LayerProps = {
  id: 'houseNumber',
  type: 'symbol',
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['>=', ['get', 'unitCount'], 0],
  ],
  paint: {
    'text-color': 'white',
    'text-halo-color': [
      'case',
      ['>', ['get', 'unitCount'], 1],
      ['case', ['>', ['get', 'unitCount'], 5], 'purple', 'orange'],
      'red',
    ],
    'text-halo-width': ['case', ['<', ['get', 'relevance'], 1], 0.5, 0],
    'text-halo-blur': ['case', ['<', ['get', 'relevance'], 1], 10, 0],
  },
  layout: {
    'text-offset': ['case', ['==', ['get', 'unitCount'], 0], ["literal",[0, 0]], ["literal",[0, 0.3]]],
    'text-anchor': [
      'case',
      ['==', ['get', 'unitCount'], 0],
      'center',
      'bottom',
    ],
    'text-ignore-placement': true,
    'text-field': [
      'case',
      ['>', ['get', 'unitCount'], 0],
      ['concat', ['get', 'houseNumber'], ''],
      ['get', 'houseNumber'],
    ],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      16,
      4,
      22,
      [
        'case',
        ['>', ['get', 'unitCount'], 0],
        ['+', ['*', ['get', 'unitCount'], 6], 110],
        100,
      ],
    ],
  },
};

export const units: LayerProps = {
  id: 'units',
  type: 'symbol',
  filter: [
    'all',
    ['!', ['has', 'point_count']],
    ['>=', ['get', 'unitCount'], 0],
  ],
  paint: {
    'text-color': 'white',
    'text-halo-color': [
      'case',
      ['>', ['get', 'unitCount'], 1],
      ['case', ['>', ['get', 'unitCount'], 5], 'purple', 'orange'],
      'red',
    ],
    'text-halo-width': ['case', ['<', ['get', 'relevance'], 1], 0.5, 0],
    'text-halo-blur': ['case', ['<', ['get', 'relevance'], 1], 10, 0], // Add halo-blur property
  },
  layout: {
    'text-anchor': 'top',
    'text-offset': [
      'interpolate',
      ['linear'],
      ['zoom'],
      16,
      ["literal",[-0.1, 0.2]],
      22,
      ["literal",[0, 0.5]],
    ],
    'text-ignore-placement': true,
    'text-field': [
      'case',
      ['>', ['get', 'unitCount'], 0],
      [
        'concat',
        ['get', 'unitCount'],
        ['case', ['>', ['get', 'unitCount'], 1], ' units', ' unit'],
      ],
      ['get', ''],
    ],
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': [
      'interpolate',
      ['linear'],
      ['zoom'],
      16,
      4,
      22,
      ['case', ['>', ['get', 'unitCount'], 0], 55, 100],
    ],
  },
};

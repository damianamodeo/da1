import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

export const geoJson: FeatureCollection<Geometry, GeoJsonProperties> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        title: 'Lincoln Park',
        description: 'A northside park that is home to the Lincoln Park Zoo',
      },
      geometry: {
        coordinates: [-87.637596, 41.940403],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Burnham Park',
        description: "A lakefront park on Chicago's south side",
      },
      geometry: {
        coordinates: [-87.603735, 41.829985],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Millennium Park',
        description:
          'A downtown park known for its art installations and unique architecture',
      },
      geometry: {
        coordinates: [-87.622554, 41.882534],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Grant Park',
        description:
          "A downtown park that is the site of many of Chicago's favorite festivals and events",
      },
      geometry: {
        coordinates: [-87.619185, 41.876367],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Humboldt Park',
        description: "A large park on Chicago's northwest side",
      },
      geometry: {
        coordinates: [-87.70199, 41.905423],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Douglas Park',
        description:
          "A large park near in Chicago's North Lawndale neighborhood",
      },
      geometry: {
        coordinates: [-87.699329, 41.860092],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Calumet Park',
        description:
          'A park on the Illinois-Indiana border featuring a historic fieldhouse',
      },
      geometry: {
        coordinates: [-87.530221, 41.715515],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Jackson Park',
        description:
          "A lakeside park that was the site of the 1893 World's Fair",
      },
      geometry: {
        coordinates: [-87.580389, 41.783185],
        type: 'Point',
      },
    },
    {
      type: 'Feature',
      properties: {
        title: 'Columbus Park',
        description: "A large park in Chicago's Austin neighborhood",
      },
      geometry: {
        coordinates: [-87.769775, 41.873683],
        type: 'Point',
      },
    },
  ],
};
const geoJson2: FeatureCollection<Geometry, GeoJsonProperties> ={features:[],type:"FeatureCollection"}

export default geoJson;

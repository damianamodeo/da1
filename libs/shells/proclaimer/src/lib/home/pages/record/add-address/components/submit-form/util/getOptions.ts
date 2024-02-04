import { NotAtHomeDocument } from '@data-firebase';
import { Suburb } from '../../../AddAddress';

export function getSuburbOptions(document: NotAtHomeDocument) {
  if (!document.suburb_options) {
    return [];
  }
  const options = document.suburb_options.map((suburb: Suburb) => {
    return { text: suburb.name, value: suburb.bbox };
  });

  return [...options, { text: 'ADD NEW SUBURB', value: 'new' }];
}

export function getStreetOptions(
  document: NotAtHomeDocument,
  selectedSuburb: string
) {
  if (!document.street_options) {
    return [];
  }
  const options = document.street_options
    .filter((street: any) => street.suburb === selectedSuburb)
    .map((street: any) => {
      return { text: street.name, value: street };
    });
  return [...options, { text: 'ADD NEW STREET', value: 'new' }];
}

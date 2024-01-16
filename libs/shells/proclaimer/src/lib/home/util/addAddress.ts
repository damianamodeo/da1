import {
  AddressList,
  NotAtHomeAddress,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { DocumentData } from 'firebase/firestore';

export const addAddress = ({ address }: any) => {
  writeFirebaseDoc({
    path: firestoreDocumentPaths.not_at_homes,
    data: ({
      existingData,
    }: {
      existingData: DocumentData | undefined;
      documentExists: boolean;
    }): DocumentData | undefined => {
      const { return_list, write_list, ...rest } = existingData as {
        [string: string]: AddressList;
      };

      const timestamp = new Date().getTime();
      const newAddress = {
        suburb: address.suburb,
        street: address.street,
        houseNumber: address.houseNumber,
        unitNumber: address.unitNumber,
        relevance: address.coords ? address.coords.relevance : 0,
        lat: address.coords ? address.coords.lat : 0,
        lng: address.coords ? address.coords.lng : 0,
        user: localStorage.getItem('user') || 'no_user',
        timestamp,
      };

      const list = address.sendToLetterList ? write_list : return_list;
      const untouchedList = !address.sendToLetterList
        ? write_list
        : return_list;

      if (list) {
        list.push(newAddress);

        list.sort((a, b) => a.timestamp - b.timestamp);

        if (list.length > 10000) {
          list.splice(0, list.length - 10000);
        }
        return {
          [address.sendToLetterList ? 'write_list' : 'return_list']: list,
          [address.sendToLetterList ? 'return_list' : 'write_list']:
            untouchedList || [],
          ...rest,
        };
      }

      return {
        [address.sendToLetterList ? 'write_list' : 'return_list']: [newAddress],
        [address.sendToLetterList ? 'return_list' : 'write_list']:
          untouchedList || [],
        ...rest,
      };
    },
  });
};

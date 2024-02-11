import {
  AddressList,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { DocumentData } from 'firebase/firestore';

// TODO add error handeling
export const editAddress = async ({
  action,
  timestamp,
}: {
  action:
    | 'delete_from_write'
    | 'delete_from_return'
    | 'move_to_write'
    | 'move_to_return';
  timestamp: string | number;
}) => {
  await writeFirebaseDoc({
    path: firestoreDocumentPaths.not_at_homes,
    data: ({
      existingData,
    }: {
      existingData: DocumentData | undefined;
    }): DocumentData | undefined => {
      const { return_list, write_list, ...rest } = existingData as {
        [string: string]: AddressList;
      };

      let newReturnList;
      let newWriteList;

      switch (action) {
        case 'delete_from_write':
          newWriteList = write_list.filter(
            (address: any) => address.timestamp !== timestamp
          );
          console.log('modifiedList:', newWriteList);
          return {
            ...rest,
            return_list,
            write_list: newWriteList,
          };

        case 'delete_from_return':
          newReturnList = return_list.filter(
            (address: any) => address.timestamp !== timestamp
          );
          return {
            ...rest,
            return_list: newReturnList,
            write_list,
          };

        case 'move_to_write':
          const addressToMoveToWrite = return_list.find(
            (address: any) => address.timestamp === timestamp
          );

          newReturnList = return_list.filter(
            (address: any) => address.timestamp !== timestamp
          );

          newWriteList = [...write_list, addressToMoveToWrite].sort(
            (a: any, b: any) => b.timestamp - a.timestamp
          );

          return {
            ...rest,
            return_list: newReturnList,
            write_list: newWriteList,
          };

        case 'move_to_return':
          const addressToMoveToReturn = write_list.find(
            (address: any) => address.timestamp === timestamp
          );

          newWriteList = write_list.filter(
            (address: any) => address.timestamp !== timestamp
          );

          newReturnList = [...return_list, addressToMoveToReturn].sort(
            (a: any, b: any) => b.timestamp - a.timestamp
          );

          return {
            ...rest,
            return_list: newReturnList,
            write_list: newWriteList,
          };
      }
    },
  });
};

export default editAddress;

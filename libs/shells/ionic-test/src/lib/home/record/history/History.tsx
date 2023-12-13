// IMPORTS
import {
  AddressList,
  firestoreDocumentPaths,
  useFirestoreData,
  writeFirebaseDoc,
} from '@data-firebase';
import { IonActionSheet, IonIcon, IonItem, IonList } from '@ionic/react';
import { DocumentData } from 'firebase/firestore';
import {
  removeCircle,
  mailOpenOutline,
  arrowUndoOutline,
} from 'ionicons/icons';
import { useMemo, useReducer, useState } from 'react';

// TYPES
type State = {
  timestamp: number;
  address: string;
  action:
    | 'delete_from_write'
    | 'delete_from_return'
    | 'move_to_write'
    | 'move_to_return'
    | 'none';
};

type Action = {
  type: 'SET_ADDRESS';
  payload: State;
};
// REDUCER
const initialState: State = {
  timestamp: 0,
  address: '',
  action: 'none',
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        ...state,
        timestamp: action.payload.timestamp,
        address: action.payload.address,
        action: action.payload.action,
      };
    default:
      return state;
  }
};
// COMPONENT
export const History = () => {
  // STATE
  const [state, dispatch] = useReducer(reducer, initialState);
  // TODO get this data from AddAddress so it doesnt run twice
  const data: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });
  // DATA
  const addresses: AddressList | any[] = useMemo(() => {
    const returnList = (data?.return_list || []).map((obj: AddressList) => ({
      ...obj,
      return: true,
    }));
    const writeList = data?.write_list || [];
    const mergedList = [...returnList, ...writeList];
    const sortedList = mergedList.sort(
      (a: any, b: any) => b.timestamp - a.timestamp
    );
    return sortedList.filter(
      (address: any) => address.user === localStorage.getItem('user')
    );
  }, [data]);
  // HANDLERS

  const editAddress = () => {
    writeFirebaseDoc({
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

        switch (state.action) {
          case 'delete_from_write':
            newWriteList = write_list.filter(
              (address: any) => address.timestamp !== state.timestamp
            );
            console.log('modifiedList:', newWriteList);
            return {
              ...rest,
              return_list,
              write_list: newWriteList,
            };

          case 'delete_from_return':
            newReturnList = return_list.filter(
              (address: any) => address.timestamp !== state.timestamp
            );
            return {
              ...rest,
              return_list: newReturnList,
              write_list,
            };

          case 'move_to_write':
            const addressToMoveToWrite = return_list.find(
              (address: any) => address.timestamp === state.timestamp
            );

            newReturnList = return_list.filter(
              (address: any) => address.timestamp !== state.timestamp
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
              (address: any) => address.timestamp === state.timestamp
            );

            newWriteList = write_list.filter(
              (address: any) => address.timestamp !== state.timestamp
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

        return;
      },
    });
  };

  const handleEdit = (newState: State) => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: newState,
    });
  };

  const handleConfirmRemove = () => {
    editAddress();
    dispatch({
      type: 'SET_ADDRESS',
      payload: initialState,
    });
  };

  const handleConfirmModify = () => {
    editAddress();
    dispatch({
      type: 'SET_ADDRESS',
      payload: initialState,
    });
  };
  // RENDER
  return (
    <div className="">
      <IonList>
        {addresses?.map((address: any, index: number) => {
          return (
            <IonItem key={`${address.id} ${index} `}>
              {/* REMOVE ICON */}
              <IonIcon
                icon={removeCircle}
                color="danger"
                slot="start"
                onClick={() =>
                  handleEdit({
                    timestamp: address.timestamp,
                    address: `${
                      address.unitNumber && `${address.unitNumber}/`
                    } ${address.houseNumber} ${address.street}, ${
                      address.suburb
                    }`,
                    action: `delete_from_${
                      address.return ? 'return' : 'write'
                    }`,
                  })
                }
              ></IonIcon>
              {/* ADDRESS */}
              {`
              ${address.unitNumber && `${address.unitNumber}/`}
              ${address.houseNumber} ${address.street}, ${address.suburb}`}
              {/* LETTER ICON */}
              {!address.return && (
                <IonIcon
                  icon={mailOpenOutline}
                  slot="end"
                  onClick={() =>
                    handleEdit({
                      timestamp: address.timestamp,
                      address: `${
                        address.unitNumber && `${address.unitNumber}/`
                      } ${address.houseNumber} ${address.street}, ${
                        address.suburb
                      }`,
                      action: 'move_to_return',
                    })
                  }
                ></IonIcon>
              )}
              {/* RETURN ICON */}
              {address.return && (
                <IonIcon
                  icon={arrowUndoOutline}
                  slot="end"
                  onClick={() =>
                    handleEdit({
                      timestamp: address.timestamp,
                      address: `${
                        address.unitNumber && `${address.unitNumber}/`
                      } ${address.houseNumber} ${address.street}, ${
                        address.suburb
                      }`,
                      action: 'move_to_write',
                    })
                  }
                ></IonIcon>
              )}
            </IonItem>
          );
        })}
      </IonList>
      {/* DELETE MODAL */}
      <IonActionSheet
        isOpen={
          state.action === 'delete_from_write' ||
          state.action === 'delete_from_return'
        }
        header="Delete Address"
        subHeader={state.address}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            handler: handleConfirmRemove,
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              dispatch({
                type: 'SET_ADDRESS',
                payload: initialState,
              });
            },
          },
        ]}
      ></IonActionSheet>
      {/* MODIFY LIST MODAL */}
      <IonActionSheet
        isOpen={
          state.action === 'move_to_write' || state.action === 'move_to_return'
        }
        header="Change List"
        subHeader={state.address}
        buttons={[
          {
            text: `Move to ${
              state.action === 'move_to_return' ? 'Return' : ''
            } ${state.action === 'move_to_write' ? 'Write' : ''} List`,
            handler: handleConfirmModify,
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              dispatch({
                type: 'SET_ADDRESS',
                payload: initialState,
              });
            },
          },
        ]}
      ></IonActionSheet>
    </div>
  );
};

export default History;

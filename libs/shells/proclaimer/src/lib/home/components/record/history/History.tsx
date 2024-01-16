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
import { useMemo, useReducer } from 'react';
import editAddress from '../../../logic/editAddress';

// TYPES
type State = {
  timestamp: number;
  address: string;
  action:
    | 'delete_from_write'
    | 'delete_from_return'
    | 'move_to_write'
    | 'move_to_return';
  modal: boolean;
};

type Action = {
  type: 'SET_ADDRESS';
  payload: State;
};
// REDUCER
const initialState: State = {
  timestamp: 0,
  address: '',
  action: 'move_to_return',
  modal: false,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ADDRESS':
      return {
        ...state,
        timestamp: action.payload.timestamp,
        address: action.payload.address,
        action: action.payload.action,
        modal: action.payload.modal,
      };
    default:
      return state;
  }
};
// COMPONENT

const HelpText = ({ showHelpText }: { showHelpText: boolean }) => {
  if (!showHelpText) return null;
  return <IonItem>Addresses you submit will show up here</IonItem>;
};

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

  const handleEdit = (newState: State) => {
    dispatch({
      type: 'SET_ADDRESS',
      payload: newState,
    });
  };

  const handleConfirmRemove = () => {
    editAddress({ action: state.action, timestamp: state.timestamp });
    dispatch({
      type: 'SET_ADDRESS',
      payload: initialState,
    });
  };

  const handleConfirmModify = () => {
    editAddress({ action: state.action, timestamp: state.timestamp });
    dispatch({
      type: 'SET_ADDRESS',
      payload: initialState,
    });
  };

  return (
    <div className="">
      <HelpText showHelpText={addresses.length === 0}></HelpText>
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
                    modal: true,
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
                  color="primary"
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
                      modal: true,
                    })
                  }
                ></IonIcon>
              )}
              {/* RETURN ICON */}
              {address.return && (
                <IonIcon
                  color="primary"
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
                      modal: true,
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
          state.modal &&
          (state.action === 'delete_from_write' ||
            state.action === 'delete_from_return')
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
          (state.action === 'move_to_write' ||
            state.action === 'move_to_return') &&
          state.modal
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

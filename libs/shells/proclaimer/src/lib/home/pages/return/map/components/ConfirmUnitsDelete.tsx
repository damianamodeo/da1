import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonItem,
  IonIcon,
  IonActionSheet,
} from '@ionic/react';
import { mailOpenOutline, trash } from 'ionicons/icons';
import { State, Action } from '../Map';
import editAddress from '../../../../util/editAddress';
import { useState } from 'react';
import { AddressList } from '@data-firebase';

export const ConfirmUnitsDelete = ({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) => {
  if (state.addresses[0] === undefined) {
    return null;
  }
  const [confirmMoveActionSheet, setConfirmMoveActionSheet] = useState(false);
  const [confirmDeleteActionSheet, setConfirmDeleteActionSheet] =
    useState(false);
  const [timestamp, setTimestamp] = useState(new Date());
  const [unitNumber, setUnitNumber] = useState('');

  const handleConfirm = async (
    action: 'delete_from_return' | 'move_to_write'
  ) => {
    await editAddress({
      action: action,
      timestamp: timestamp,
    });
    const filteredAddresses = state.addresses.filter(
      (address) => address.timestamp !== timestamp
    ) as AddressList | [];
    setConfirmMoveActionSheet(false);
    setConfirmDeleteActionSheet(false);
    if (filteredAddresses.length === 0) {
      dispatch({ type: 'SET_MODAL', payload: false });
      return;
    }
    dispatch({ type: 'UPDATE_UNITS', payload: filteredAddresses });
  };

  const { houseNumber, street, suburb } = state.addresses[0];
  const actionSheetLabel = `/${houseNumber} ${street} ${suburb}`;

  return (
    <>
      <IonModal isOpen={state.modal && state.isUnits}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirm</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={() => dispatch({ type: 'SET_MODAL', payload: false })}
              >
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonListHeader>
              <IonLabel>
                {houseNumber} {street} <br />
                {suburb}
              </IonLabel>
            </IonListHeader>
            {state.addresses.map((address) => {
              if (!address.timestamp) return;
              return (
                <IonItem key={address.timestamp.getTime()} className="ion-padding-start">
                  Unit:
                  <span className="ion-padding-start ">
                    {address.unitNumber}
                  </span>
                  <IonIcon
                    className="ion-padding-start"
                    color="primary"
                    icon={mailOpenOutline}
                    slot="end"
                    onClick={() => {
                      setTimestamp(address.timestamp);
                      setConfirmMoveActionSheet(true);
                      setUnitNumber(address.unitNumber);
                    }}
                  ></IonIcon>
                  <IonIcon
                    className="ion-padding-start"
                    icon={trash}
                    color="danger"
                    slot="end"
                    onClick={() => {
                      setTimestamp(address.timestamp);
                      setConfirmDeleteActionSheet(true);
                      setUnitNumber(address.unitNumber);
                    }}
                  ></IonIcon>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
      </IonModal>

      <IonActionSheet
        isOpen={confirmMoveActionSheet}
        header="Delete Address"
        subHeader={`${unitNumber}${actionSheetLabel}`}
        buttons={[
          {
            text: 'Send to Write List',
            handler: () => handleConfirm('move_to_write'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setConfirmMoveActionSheet(false);
            },
          },
        ]}
      ></IonActionSheet>
      <IonActionSheet
        isOpen={confirmDeleteActionSheet}
        header="Delete Address"
        subHeader={`${unitNumber}${actionSheetLabel}`}
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => handleConfirm('delete_from_return'),
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              setConfirmDeleteActionSheet(false);
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
};

export default ConfirmUnitsDelete;

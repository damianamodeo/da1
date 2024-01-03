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
import editAddress from '../../../../logic/editAddress';
import { useState } from 'react';

// FIXME unit list doesnt update when moved or deleted
export const ConfirmUnitsDelete = ({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) => {
  const [confirmMoveActionSheet, setConfirmMoveActionSheet] = useState(false);
  const [confirmDeleteActionSheet, setConfirmDeleteActionSheet] =
    useState(false);
  const [timestamp, setTimestamp] = useState(0);

  const handleConfirm = async (
    action: 'delete_from_return' | 'move_to_write'
  ) => {
    await editAddress({
      action: action,
      timestamp: state.addresses[0].timestamp,
    });
    setConfirmMoveActionSheet(false);
    setConfirmDeleteActionSheet(false);
  };

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
                {state.addresses[0].houseNumber} {state.addresses[0].street}{' '}
                <br />
                {state.addresses[0].suburb}
              </IonLabel>
            </IonListHeader>
            {state.addresses.map((address) => {
              if (!address.timestamp) return;
              return (
                <IonItem key={address.timestamp} className="ion-padding-start">
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
                      setTimestamp(address.timestamp as number);
                      setConfirmMoveActionSheet(true);
                    }}
                  ></IonIcon>
                  <IonIcon
                    className="ion-padding-start"
                    icon={trash}
                    color="danger"
                    slot="end"
                    onClick={() => {
                      setTimestamp(address.timestamp as number);
                      setConfirmDeleteActionSheet(true);
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
        subHeader={'state.addresses'}
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
        subHeader={'state.addresses'}
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

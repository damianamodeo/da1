import { AddressList, NotAtHomeAddress } from '@data-firebase';
import {
  IonItem,
  IonList,
  IonButton,
  IonModal,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonToggle,
  IonListHeader,
  IonText,
  IonNote,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { Action, State } from '../../AddAddress';
import { addAddress } from '../../../../../util/addAddress';
import { addressLabel } from '../../../../../util/addressLabel';

// TODO hide address search result until recieved
export const ConfirmSubmitModal = (props: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) => {
  const handleClose = () => {
    return props.dispatch({
      type: 'SET_MODAL',
      payload: '',
    });
  };

  const handleLetterListToggle = (e: any) => {
    props.dispatch({
      type: 'SET_LETTER_LIST',
      payload: e.detail.checked,
    });
  };

  const handleSubmit = () => {
    addAddress({ action: 'add_to_return', address: props.state });

    props.dispatch({
      type: 'ON_SUBMIT',
    });
  };

  return (
    <IonModal isOpen={props.state.modal === 'submit'}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirm</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* TODO add warning if relevance is less 1
         */}
        {/* TODO add notification if address submitted successfully or not */}
        {props.state.loading ? (
          <div className="full centered">
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <IonList inset className="ion-padding" color='primary'>
            {props.state.coords?.relevance === 1 && (
              <IonText color="success">
                <h1 className="ion-text-center">Match Found</h1>
              </IonText>
            )}

            {props.state.coords?.relevance !== 1 && (
              <IonText color="warning">
                <h1 className="ion-text-center">No Match Found</h1>
              </IonText>
            )}

            <IonText>
              <h5 className="ion-text-center ion-padding-vertical">
                {addressLabel(props.state as unknown as NotAtHomeAddress)}
              </h5>
            </IonText>
            <IonItem lines="none">
              Send to Write List
              <IonToggle
                color={'success'}
                slot="end"
                checked={props.state.sendToLetterList}
                onIonChange={handleLetterListToggle}
              ></IonToggle>
            </IonItem>
            <IonButton
              className="ion-padding"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
            <IonItem lines="none" className="ion-text-center">
              {props.state.coords?.relevance !== 1 && (
                <IonText className="ion-padding">
                  Warning! You can submit this address but it's location on the
                  map will be inaccurate.
                </IonText>
              )}
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonModal>
  );
};

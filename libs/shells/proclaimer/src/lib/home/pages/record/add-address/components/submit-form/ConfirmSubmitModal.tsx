import { AddressList } from '@data-firebase';
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

// TODO hide address search result until recieved
export const ConfirmSubmitModal = (props: {
  state: State;
  dispatch: React.Dispatch<Action>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    props.dispatch({
      type: 'SET_MODAL',
      payload: '',
    });
    props.setLoading(true);
  };

  const handleLetterListToggle = (e: any) => {
    props.dispatch({
      type: 'SET_LETTER_LIST',
      payload: e.detail.checked,
    });
  };

  const handleSubmit = () => {
    addAddress({ action: 'add_to_return', address: props.state });
    props.setLoading(true);

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
        {props.loading ? (
          <div className="full centered">
            <LoadingSpinner></LoadingSpinner>
          </div>
        ) : (
          <>
            <IonList inset className="ion-padding">
              <IonListHeader>
                <IonLabel>
                  {props.state.coords?.relevance === 1 ? (
                    <IonText color="success">Match Found</IonText>
                  ) : (
                    <>
                      <IonText color="warning">No Match Found</IonText>
                    </>
                  )}

                  <IonNote>
                    <br></br>
                    {`${
                      props.state.unitNumber && `${props.state.unitNumber}/`
                    }` +
                      `${props.state.houseNumber} ` +
                      `${props.state.street}, ` +
                      `${props.state.suburb}`}
                  </IonNote>
                </IonLabel>
              </IonListHeader>
              {props.state.coords?.relevance !== 1 && (
                <IonNote>
                  You can submit this address but it's location on the map will
                  be inaccurate.
                </IonNote>
              )}
            </IonList>
            <IonList className="ion-padding">
              <IonItem lines="none">
                Send to Write List
                <IonToggle
                  color={'success'}
                  slot="end"
                  checked={props.state.sendToLetterList}
                  onIonChange={handleLetterListToggle}
                ></IonToggle>
              </IonItem>
            </IonList>
            <IonButton
              className="ion-padding"
              expand="block"
              onClick={handleSubmit}
            >
              Submit
            </IonButton>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

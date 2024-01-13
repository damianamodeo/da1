import {
  AddressList,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
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

// TODO hide address search result until recieved
export const ConfirmSubmitModal = (props: any) => {
  const writeAddressToFirestore = ({
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
      suburb: props.state.suburb,
      street: props.state.street,
      houseNumber: props.state.houseNumber,
      unitNumber: props.state.unitNumber,
      relevance: props.state.coords ? props.state.coords.relevance : 0,
      lat: props.state.coords ? props.state.coords.lat : 0,
      lng: props.state.coords ? props.state.coords.lng : 0,
      user: localStorage.getItem('user') || 'no_user',
      timestamp,
    };

    const list = props.state.sendToLetterList ? write_list : return_list;
    const untouchedList = !props.state.sendToLetterList
      ? write_list
      : return_list;

    if (list) {
      list.push(newAddress);

      list.sort((a, b) => a.timestamp - b.timestamp);

      if (list.length > 10000) {
        list.splice(0, list.length - 10000);
      }
      return {
        [props.state.sendToLetterList ? 'write_list' : 'return_list']: list,
        [props.state.sendToLetterList ? 'return_list' : 'write_list']:
          untouchedList || [],
        ...rest,
      };
    }

    return {
      [props.state.sendToLetterList ? 'write_list' : 'return_list']: [
        newAddress,
      ],
      [props.state.sendToLetterList ? 'return_list' : 'write_list']:
        untouchedList || [],
      ...rest,
    };
  };

  return (
    <IonModal isOpen={props.state.submitModal}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirm</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                props.dispatch({
                  type: 'CLOSE_SUBMIT_MODAL',
                })
              }
            >
              Close
            </IonButton>
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
              {
                props.state.coords?.relevance !== 1 && ( // <IonItem>
                  <IonNote>
                    You can submit this address but it's location on the map
                    will be inaccurate.
                  </IonNote>
                ) // </IonItem>
              }
            </IonList>
            <IonList className="ion-padding">
              <IonItem lines="none">
                Send to Write List
                <IonToggle
                  color={'success'}
                  slot="end"
                  checked={props.state.sendToLetterList}
                  onIonChange={(e) => {
                    props.dispatch({
                      type: 'SET_LETTER_LIST',
                      payload: e.detail.checked,
                    });
                  }}
                ></IonToggle>
              </IonItem>
            </IonList>
            <IonButton
              className="ion-padding"
              expand="block"
              onClick={() => {
                // TODO add error handling in case writeFirebaseDoc fails
                writeFirebaseDoc({
                  path: firestoreDocumentPaths.not_at_homes,
                  data: writeAddressToFirestore,
                });
                props.dispatch({
                  type: 'ON_SUBMIT',
                });
              }}
            >
              Submit
            </IonButton>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { listOutline } from 'ionicons/icons';
import { LoadingSpinner } from '@ui-ion';
import { Suspense, lazy } from 'react';
const AddAddress = lazy(() => import('./add-address/AddAddress'));

import { Reducer, useReducer } from 'react';
import History from './history/History';

const initialState = { historyModal: false, loading: true };

type State = typeof initialState;

type Action =
  | { type: 'SET_HISTORY_MODAL'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_HISTORY_MODAL':
      return {
        ...state,
        historyModal: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const Record = () => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Record</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                dispatch({ type: 'SET_HISTORY_MODAL', payload: true })
              }
            >
              <IonIcon color="primary" icon={listOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>

          <AddAddress></AddAddress>

          <IonModal isOpen={state.historyModal}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>History</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    onClick={() =>
                      dispatch({ type: 'SET_HISTORY_MODAL', payload: false })
                    }
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <History></History>
            </IonContent>
          </IonModal>
          
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Record;

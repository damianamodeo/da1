import { Suspense, lazy } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';

const Map = lazy(() => import('./map/Map'));

export const Return = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Home"></IonBackButton>
          </IonButtons>
          <IonTitle>Return</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <Map></Map>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Return;

import {
  NotAtHomeDocument,
  StreetOption,
  SuburbOption,
  firestoreDocumentPaths,
  useFirestoreData1,
} from '@data-firebase';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';
import AddDoctor from './AddDoctor';

export const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <AddDoctor></AddDoctor>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Home;

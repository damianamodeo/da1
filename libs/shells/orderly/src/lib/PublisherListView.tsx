import { PublishersList } from '@feature';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';

export const PublisherListView = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton> <IonIcon  icon={add}></IonIcon></IonButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <PublishersList></PublishersList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherListView;

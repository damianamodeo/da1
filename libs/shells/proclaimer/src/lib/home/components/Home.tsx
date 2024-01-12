import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';
import { path } from '../../AppShell';

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
          <IonCard routerLink={path.Record}>
            <IonCardHeader>
              <IonCardTitle>Record</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Form to submit addresses for not-at-homes. The list will be shared
              with others for others to.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink={path.Return}>
            <IonCardHeader>
              <IonCardTitle>Return</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Map of addresses where residents were not-at-home, requiring the
              need for a follow-up visit.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink={path.Write}>
            <IonCardHeader>
              <IonCardTitle>Write</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              List of addresses where residents were not-at-home multiple times,
              requiring a letter to be sent.
            </IonCardContent>
          </IonCard>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Home;

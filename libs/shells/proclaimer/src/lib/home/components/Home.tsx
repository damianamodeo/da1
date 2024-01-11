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
  // TODO Reword descriptions in Card Content
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
              Input addresses for unanswered calls. The list will be shared with
              others for thorough and efficient follow-ups.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink={path.Return}>
            <IonCardHeader>
              <IonCardTitle>Return</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Find addresses of homes to call on where no one was found at home.
            </IonCardContent>
          </IonCard>
          <IonCard routerLink={path.Write}>
            <IonCardHeader>
              <IonCardTitle>Write</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Find addresses of people that have not been found at home to send
              your letters.
            </IonCardContent>
          </IonCard>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Home;

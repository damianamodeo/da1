import { EditPublisher, usePublisherByID } from '@feature';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const EditPublisherView = ({ match }: UserDetailPageProps) => {
  const publisher: any = usePublisherByID(match.params.id);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={'Cancel'}></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              routerLink={'/home/publisher/details/' + match.params.id}
              routerDirection="back"
              onClick={() => console.log('yes')}
            >
              Done
            </IonButton>
          </IonButtons>
          <IonTitle>
            {' '}
            Edit
            {publisher?.displayName
              ? publisher?.displayName
              : publisher?.firstName}{' '}
            {publisher?.lastName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <EditPublisher></EditPublisher>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default EditPublisherView;

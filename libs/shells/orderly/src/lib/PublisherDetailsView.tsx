import { PublisherDetails, usePublisher, usePublisherByID } from '@feature';
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
import { Suspense, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const PublisherDetailsView = ({ match }: UserDetailPageProps) => {
  const publisher: any = usePublisherByID(match.params.id);
  const setPublisher = usePublisher.use.setPublisher();

  useEffect(() => {
    setPublisher({
      firstName: publisher?.firstName || '',
      lastName: publisher?.lastName || '',
      displayName: publisher?.displayName || '',
      middleName: publisher?.middleName || '',
    });
  }, [publisher]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton routerLink={'/home/publisher/edit/' + match.params.id}>
              Edit
            </IonButton>
          </IonButtons>
          <IonTitle>
            {publisher?.displayName
              ? publisher?.displayName
              : publisher?.firstName}{' '}
            {publisher?.lastName}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <PublisherDetails></PublisherDetails>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherDetailsView;

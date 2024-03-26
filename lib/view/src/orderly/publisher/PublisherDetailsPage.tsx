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
import { Suspense, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { path } from '../Orderly';
import EditPublisherModal from './EditPublisherModal';

interface UserDetailPageProps
  extends RouteComponentProps<{
    id: string;
  }> {}

export const PublisherDetailsPage = ({ match }: UserDetailPageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const publisher: any = usePublisherByID(match.params.id);
  const setPublisher = usePublisher.use.setPublisher();

  useEffect(() => {
    setPublisher({
      firstName: publisher?.firstName || '',
      lastName: publisher?.lastName || '',
      displayName: publisher?.displayName || '',
      middleName: publisher?.middleName || '',
      id: publisher?.id || '',
    });
  }, [publisher]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={"Publishers"}></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(true)}>
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
          <EditPublisherModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          ></EditPublisherModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default PublisherDetailsPage;

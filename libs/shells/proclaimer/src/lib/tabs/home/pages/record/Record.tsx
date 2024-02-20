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
import { listOutline } from 'ionicons/icons';
import { LoadingSpinner } from '@ui-ion';
import { Suspense, lazy, useState } from 'react';

const AddAddress = lazy(() => import('./add-address/AddAddress'));
const HistoryModal = lazy(() => import('./history-modal/HistoryModal'));

export const Record = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Record</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon color="primary" icon={listOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <AddAddress></AddAddress>
          <HistoryModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          ></HistoryModal>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Record;

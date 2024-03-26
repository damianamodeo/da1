import { useOrderlyDB } from '@data';
import { PublisherForm, usePublisher } from '@feature';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';

export const AddPublisherModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const publisher = usePublisher.use.publisher();
  const db = useOrderlyDB.use.db();

  console.log(db);
  const handleAdd = async () => {
    
    // await db.publishers.insert({
    //   id: crypto.randomUUID(),
    //   displayName: publisher.displayName,
    //   firstName: publisher.firstName,
    //   lastName: publisher.lastName,
    //   middleName: publisher.middleName,
    // });
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>AddPublisherModal</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Cancel</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={handleAdd}>
              <strong>Add</strong>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <PublisherForm></PublisherForm>
      </IonContent>
    </IonModal>
  );
};

export default AddPublisherModal;

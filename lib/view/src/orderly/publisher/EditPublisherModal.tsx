import {  PublisherForm, useDocumentByID, usePublisher } from '@feature';
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

export const EditPublisherModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const publisher: any = usePublisher.use.publisher();
  const doc = useDocumentByID(publisher.id);

  const update = async () => {
    await doc.update({
      $set: {
        firstName: publisher?.firstName,
        lastName: publisher?.lastName,
        middleName: publisher?.middleName,
        displayName: publisher?.displayName,
      },
    });
    setIsOpen(false);
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>EditPublisherModal</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={update}>
              <strong>Done</strong>
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

export default EditPublisherModal;
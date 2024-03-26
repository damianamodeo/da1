import { useOrderlyDB } from '@data-zustand';
import { PublisherForm, usePublisher } from '@feature-public-talks';
import { IonButton } from '@ionic/react';

export const AddPublisher = () => {
  const publisher = usePublisher.use.publisher();
  const db = useOrderlyDB.use.db();

  const handleClick = async () => {
    await db.publishers.insert({
      id: crypto.randomUUID(),
      displayName: publisher.displayName,
      firstName: publisher.firstName,
      lastName: publisher.lastName,
      middleName: publisher.middleName,
    });
  };
  return (
    <div>
      <PublisherForm></PublisherForm>

      <IonButton expand="block" className="ion-padding" onClick={handleClick}>
        Submit
      </IonButton>
    </div>
  );
};

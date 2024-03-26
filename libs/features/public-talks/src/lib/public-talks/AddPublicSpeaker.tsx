import { IonButton, IonList } from '@ionic/react';
import { PublicSpeakerForm } from './PublicSpeakerForm';
import { useOrderlyDB, usePublicSpeaker } from '@data-zustand';

export const AddPublicSpeaker = () => {
  const brother = usePublicSpeaker.use.brother();
  const db = useOrderlyDB.use.db();

  const handleClick =async () => {
    await db.publishers.insert({
      passportId: crypto.randomUUID(),
      firstName: brother.firstName,
      lastName: brother.lastName,
      age: 1,
    });
  };

  return (
    <div>
      <IonList>
        <PublicSpeakerForm></PublicSpeakerForm>
      </IonList>
      <IonButton expand="block" className="ion-padding" onClick={handleClick}>
        Submit
      </IonButton>
    </div>
  );
};

export default AddPublicSpeaker;

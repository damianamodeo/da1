import { usePublicSpeaker } from '@data-zustand';
import { IonInput, IonItem } from '@ionic/react';

export const PublicSpeakerForm = () => {
  const brother = usePublicSpeaker.use.brother();
  const setFirstName = usePublicSpeaker.use.setFirstName();
  const setLastName = usePublicSpeaker.use.setLastName();
  const setDisplayName = usePublicSpeaker.use.setDisplayName();
  const setCongregation = usePublicSpeaker.use.setCongregation();
  const setEmail = usePublicSpeaker.use.setEmail();
  const setPhone = usePublicSpeaker.use.setPhone();

  return (
    <>
      <IonItem>
        <IonInput
          label="First Name"
          onIonInput={(e) => setFirstName(e.target.value as string)}
          value={brother.firstName}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Last Name"
          onIonInput={(e) => setLastName(e.target.value as string)}
          value={brother.lastName}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Display Name"
          onIonInput={(e) => setDisplayName(e.target.value as string)}
          value={brother.displayName}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Email"
          onIonInput={(e) => setEmail(e.target.value as string)}
          value={brother.email}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Phone"
          onIonInput={(e) => setPhone(e.target.value as string)}
          value={brother.phone}
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          label="Congregation"
          onIonInput={(e) => setCongregation(e.target.value as string)}
          value={brother.congregation}
        ></IonInput>
      </IonItem>
    </>
  );
};

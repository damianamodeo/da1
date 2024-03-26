import { IonInput, IonItem } from '@ionic/react';
import { usePublisher } from '@feature';

export const PublisherForm = () => {
  const publisher = usePublisher.use.publisher();
  const setPublisherProperty = usePublisher.use.setPublisherProperty();

  return (
    <>
      <IonItem>
        <IonInput
          label="Display Name"
          onIonInput={(e) =>
            setPublisherProperty(e.target.name, e.target.value as string)
          }
          value={publisher.displayName}
          name="displayName"
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="First Name"
          onIonInput={(e) =>
            setPublisherProperty(e.target.name, e.target.value as string)
          }
          value={publisher.firstName}
          name="firstName"
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Middle Name"
          onIonInput={(e) =>
            setPublisherProperty(e.target.name, e.target.value as string)
          }
          value={publisher.middleName}
          name="middleName"
        ></IonInput>
      </IonItem>

      <IonItem>
        <IonInput
          label="Last Name"
          onIonInput={(e) =>
            setPublisherProperty(e.target.name, e.target.value as string)
          }
          value={publisher.lastName}
          name="lastName"
        ></IonInput>
      </IonItem>
    </>
  );
};

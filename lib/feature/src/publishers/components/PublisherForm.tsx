import { IonInput, IonItem, IonList } from '@ionic/react';
import { usePublisher } from '@feature';

export const PublisherForm = () => {
  const publisher = usePublisher.use.publisher();
  const setPublisherProperty = usePublisher.use.setPublisherProperty();

  return (
    <IonList inset>
      <IonItem>
        <IonInput
          label="Display Name"
          onIonInput={(e) =>
            setPublisherProperty(e.target.name, e.target.value as string)
          }
          value={publisher.displayName}
          name="displayName"
          clearInput={true}
          className='ion-text-end'
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
          clearInput={true}
          className='ion-text-end'
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
          clearInput={true}
          className='ion-text-end'
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
          clearInput={true}
          className='ion-text-end'
        ></IonInput>
      </IonItem>
    </IonList>
  );
};

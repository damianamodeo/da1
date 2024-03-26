import { usePublishersCollection } from '@feature';
import { IonItem, IonLabel, IonList } from '@ionic/react';

export const PublishersList = () => {
  const { result: publishers, isFetching } = usePublishersCollection();

  if (isFetching) {
    return 'loading characters...';
  }

  return (
    <IonList>
      {publishers.map((publisher: any) => (
        <IonItem
          key={publisher.id}
          button={true}
          routerLink={'/home/publisher/details/' + publisher.id}
        >
          <IonLabel>{publisher.firstName}</IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

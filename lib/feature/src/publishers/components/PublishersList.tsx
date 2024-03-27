import { useRxAllDocuments } from '@data';
import { IonItem, IonLabel, IonList } from '@ionic/react';

export const PublishersList = () => {
  const { result: publishers, isFetching } = useRxAllDocuments('publishers');

  if (isFetching) {
    return 'loading characters...';
  }

  return (
    <IonList inset>
      {publishers
        .sort((a: any, b: any) => {
          if (a.lastName !== b.lastName) {
            return a.lastName.localeCompare(b.lastName);
          }
          if (a.displayName !== b.displayName) {
            return a.displayName.localeCompare(b.displayName);
          }
          return a.firstName.localeCompare(b.firstName);
        })
        .map((publisher: any) => (
          <IonItem
            key={publisher.id}
            button={true}
            routerLink={'/home/publisher/details/' + publisher.id}
          >
            <IonLabel>
              {publisher.lastName},{' '}
              {publisher.displayName
                ? publisher.displayName
                : publisher.firstName}
            </IonLabel>
          </IonItem>
        ))}
    </IonList>
  );
};

import { IonList, IonItem, IonLabel, IonInput } from '@ionic/react';

export const List = () => {
  return (
    <IonList>
      <IonItem>
        {/* <IonLabel>First Name</IonLabel> */}
        <IonInput></IonInput>
      </IonItem>
      <IonItem>
        {/* <IonLabel>Last Name</IonLabel> */}
        <IonInput></IonInput>
      </IonItem>
    </IonList>
  );
};

export default List;

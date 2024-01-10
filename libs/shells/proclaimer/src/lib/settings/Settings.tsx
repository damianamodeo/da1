import { AppVersion } from '@ui-ion';
import { IonButton, IonItem, IonList } from '@ionic/react';
import { path } from '../content';

// TODO add dark mode
export const Settings = () => {
  return (
    <>
      <IonList>
        <IonItem>
          <AppVersion></AppVersion>
        </IonItem>
      </IonList>
    </>
  );
};

export default Settings;

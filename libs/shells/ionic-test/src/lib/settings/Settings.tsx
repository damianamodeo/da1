import { AppVersion } from '@ui-ion';
import { IonButton, IonItem, IonList } from '@ionic/react';
import { path } from '../content';

export const Settings = () => {
  return (
    <>
      <IonList>
        <IonItem>
          <AppVersion></AppVersion>
        </IonItem>

        <IonButton expand="block" routerLink={path.Appearance}>
          Appearance
        </IonButton>
      </IonList>
    </>
  );
};

export default Settings;

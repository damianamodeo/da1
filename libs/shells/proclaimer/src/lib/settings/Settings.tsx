import { AppVersion } from '@ui-ion';
import { IonItem, IonList } from '@ionic/react';

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

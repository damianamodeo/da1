import { IonItem, IonText } from '@ionic/react';
import { timeToNow } from '@util';

import now from '~build/time';

export const AppVersion = () => {
  const buildTime = now.getTime();

  const formattedBuildTime = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(buildTime);

  const timeDifference = timeToNow(buildTime);

  return (
    <IonItem detail={false}>
        <strong>App Build Time</strong>
        <br />
        <IonText>{formattedBuildTime}</IonText>
        <IonText>
          <div>updated {timeDifference}</div>
        </IonText>
    </IonItem>
  );
};

export default AppVersion;

import { IonItem, IonLabel, IonText } from '@ionic/react';
import { timeToNow } from '@util';

// FIXME build time not working
// import now from '~build/time';

export const AppVersion = () => {
  // const buildTime = now.getTime();
  const buildTime = new Date().getTime();

  const formattedBuildTime = new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(buildTime);

  const timeDifference = timeToNow(buildTime);

  return (
    <IonItem detail={false}>
      <IonLabel>
        <strong>App Build Time</strong>
        <br />
        <IonText>{formattedBuildTime}</IonText>
        <IonText>
          <div>updated {timeDifference}</div>
        </IonText>
      </IonLabel>
    </IonItem>
  );
};

export default AppVersion;

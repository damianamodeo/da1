import { IonSpinner } from '@ionic/react';

export const LoadingPage = () => {
  return (
    <div className="full centered">
      <IonSpinner style={{ width: '15%', height: '15%' }}></IonSpinner>
    </div>
  );
};

export default LoadingPage;

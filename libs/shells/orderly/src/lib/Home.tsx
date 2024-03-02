import {
  NotAtHomeDocument,
  StreetOption,
  SuburbOption,
  firestoreDocumentPaths,
  useFirestoreData1,
} from '@data-firebase';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';

function SuburbOptionsList() {
  const data = useFirestoreData1(firestoreDocumentPaths.not_at_homes);


  const suburbOptions =
    data?.suburb_options.map((s: SuburbOption) => s.name) || [];

  return (
    <IonList>
      {suburbOptions.map((s) => {
        return <IonItem key={s}>{s}</IonItem>;
      })}
    </IonList>
  );
}

function StreetOptionsList() {
  const data = useFirestoreData1(firestoreDocumentPaths.not_at_homes);

  const suburbOptions =
    data?.street_options.map((s: StreetOption) => s.name) || [];
  console.log('🚀 ~ suburbOptions:', suburbOptions);

  return (
    <IonList>
      {suburbOptions.map((s) => {
        return <IonItem key={s}>{s}</IonItem>;
      })}
    </IonList>
  );
}

export const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <SuburbOptionsList></SuburbOptionsList>
          <StreetOptionsList></StreetOptionsList>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Home;

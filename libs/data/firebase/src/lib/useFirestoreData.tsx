import { GLOBAL_VARIABLES } from '@config';
import { FireStoreDocuments, FirestorePaths, fdb } from '@data-firebase';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const collection =
  localStorage.getItem('congregation') || GLOBAL_VARIABLES.CONGREGATION;

export const useFirestoreData = ({
  path,
}: {
  path: FirestorePaths;
}) => {
  const [data, setData] = useState<FireStoreDocuments>();

  useEffect(() => {
    const unsub = onSnapshot(doc(fdb, collection + '/' + path), (doc) => {
      if (!doc.data()) {
        // return new Error();
      }
      setData(doc.data() as FireStoreDocuments);
    });
    return () => {
      unsub();
    };
  }, []);
  return data;
};

export default useFirestoreData;

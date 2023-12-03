import { FirestorePaths, fdb } from '@data-firebase';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useFirestoreData = ({ path }: { path: FirestorePaths }) => {
  const [data, setData] = useState({} as DocumentData | undefined);

  useEffect(() => {
    const unsub = onSnapshot(doc(fdb, path), (doc) => {
      if (!doc.data()) {
        // return new Error();
      }
      setData(doc.data());
    });
    return () => {
      unsub();
    };
  }, []);
  return data;
};

export default useFirestoreData;

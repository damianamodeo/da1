import { GLOBAL_VARIABLES } from '@config';
import { FirestorePaths, fdb } from '@data-firebase';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const collection =
  localStorage.getItem('congregation') || GLOBAL_VARIABLES.CONGREGATION;

export const useFirestoreData = ({
  path,
  componentName = 'anon-component',
}: {
  path: FirestorePaths;
  componentName?: string;
}) => {
  const [data, setData] = useState({} as DocumentData | undefined);

  useEffect(() => {
    const unsub = onSnapshot(doc(fdb, collection + '/' + path), (doc) => {
      if (!doc.data()) {
        // return new Error();
      }
      console.count(`Read Firestore : ${path} : ${componentName} `);

      setData(doc.data());
    });
    return () => {
      unsub();
    };
  }, []);
  return data;
};

export default useFirestoreData;

import { GLOBAL_VARIABLES } from '@config';
import {
  FireStoreDocuments,
  FirestoreDocumentPaths,
  fdb,
} from '@data-firebase';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const collection =
  localStorage.getItem('congregation') || GLOBAL_VARIABLES.CONGREGATION;

/**
 * Retrieves data from Firestore and returns it.
 *
 * @param {FirestoreDocumentPaths} path - the path to the Firestore data
 * @return {FireStoreDocuments} the retrieved data from Firestore
 */
export const useFirestoreData1 = (
  path: FirestoreDocumentPaths
): FireStoreDocuments => {
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

export default useFirestoreData1;

import { DocumentData, doc, runTransaction } from 'firebase/firestore';
import { FirestoreDocumentPaths, fdb } from '@data-firebase';
import { GLOBAL_VARIABLES } from '@config';

type Arguments = {
  path: FirestoreDocumentPaths;
  data: ({
    existingData,
    documentExists,
  }: {
    existingData: DocumentData | undefined;
    documentExists: boolean;
  }) => DocumentData | undefined;
};

export const writeFirebaseDoc = async ({ path, data }: Arguments) => {
  const collection = localStorage.getItem('congregation') || GLOBAL_VARIABLES.CONGREGATION;
  const documentRef = doc(fdb, collection + '/' + path);
  try {
    const writtenData: any = await runTransaction(fdb, async (transaction) => {
      const document = await transaction.get(documentRef);

      const newData = data({
        existingData: document.data(),
        documentExists: document.exists(),
      });

      transaction.set(documentRef, newData);
      return newData;
    });
    return writtenData;
  } catch (e: any) {
    console.error(e.message);
    return e;
  }
};

export default writeFirebaseDoc;

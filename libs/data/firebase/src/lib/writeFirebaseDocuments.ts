import { DocumentData, doc, runTransaction } from 'firebase/firestore';
import { FirestorePaths, fdb } from '@data-firebase';

type Arguments = {
  path: FirestorePaths;
  data: ({
    existingData,
    documentExists,
  }: {
    existingData: DocumentData | undefined;
    documentExists: boolean;
  }) => DocumentData | undefined;
};

export const writeFirebaseDoc = async ({ path, data }: Arguments) => {
  const documentRef = doc(fdb, path);
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

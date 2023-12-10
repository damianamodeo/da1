import sizeof from 'firestore-size';

export const getFirestoreDocumentSize = (doc: any) => {
  let bytes = sizeof(doc);
  if (bytes < 1024) {
    console.log(`Document size: ${bytes} bytes`);
    return;
  }
  bytes = bytes / 1024;
  if (bytes < 1024) {
    console.log(`Document size: ${bytes} KB`);
    return;
  }
  bytes = bytes / 1024;
  if (bytes < 1024) {
    console.log(`Document size: ${bytes} MB`);
    return;
  }

  return bytes;
};

export default getFirestoreDocumentSize;

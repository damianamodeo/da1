import { useRxCollection, useRxData } from '@data';

export const useDocumentByID = (id: string) => {
  const data: any = useRxData('publishers', (collection) =>
    collection.findOne(id)
  );
  return data.result[0]
};

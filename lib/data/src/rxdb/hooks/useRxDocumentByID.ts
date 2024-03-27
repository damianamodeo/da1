import { useRxData } from '@data';

export const useRxDocumentByID = (id: string) => {
  const data: any = useRxData('publishers', (collection) =>
    collection.findOne(id)
  );
  return { doc: data.result[0], data: data };
};

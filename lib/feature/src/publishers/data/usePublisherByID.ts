import { useRxData } from '@data';

export const usePublisherByID = (id: string) => {
  const data: any = useRxData('publishers', (collection) =>
    collection.findOne(id)
  );
  return data.result[0];
};

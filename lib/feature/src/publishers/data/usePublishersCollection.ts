import { useRxData } from '@data';

export const usePublishersCollection = () => {
  return useRxData(
    // the collection to be queried
    'publishers',
    // a function returning the query to be applied
    (collection) => collection.find()
  );
};

import { useRxData } from '@data';
import { useOrderlyDB } from '@data-zustand';
import { usePublishersCollection } from '@feature';

export const PublishersList = () => {
  const { result: publishers, isFetching } = usePublishersCollection();

  console.log('publishers', publishers);

  if (isFetching) {
    return 'loading characters...';
  }

  return (
    <ul>
      {publishers.map((publisher: any, idx) => (
        <li key={idx}>{publisher.firstName}</li>
      ))}
    </ul>
  );
};

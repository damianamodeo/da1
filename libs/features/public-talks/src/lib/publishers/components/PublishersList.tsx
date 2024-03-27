import { useRxAllDocuments } from '@data';

export const PublishersList = () => {
  const { result: publishers, isFetching } = useRxAllDocuments("publishers");

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

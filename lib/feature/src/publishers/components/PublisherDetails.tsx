import { usePublisher } from '@feature';

export const PublisherDetails = () => {
  const publisher = usePublisher.use.publisher();

  return <div>{publisher.displayName} {publisher.firstName}  {publisher.middleName} {publisher.lastName}</div>;
};

export default PublisherDetails

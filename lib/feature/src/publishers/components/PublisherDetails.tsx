import { useRxDocumentByID } from '@data';
import { usePublisher } from '@feature';

export const PublisherDetails = () => {
  const { id } = usePublisher.use.publisher();
  const { doc: publisher } = useRxDocumentByID(id);

  if (!publisher) {
    return null;
  }

  return (
    <div className="centered">
      {publisher.firstName} {publisher.middleName} {publisher.lastName}
    </div>
  );
};

export default PublisherDetails;

import { NotAtHomeAddress } from '@data-firebase';
import { IonActionSheet } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import { addressLabel } from '../../../../../../util/addressLabel';
import editAddress from '../../../../../../util/editAddress';

const DeleteActionSheet = ({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  address: NotAtHomeAddress;
}) => {
  const handleDelete = () => {
    editAddress({
      action: address.return ? 'delete_from_return' : 'delete_from_write',
      timestamp: address.timestamp,
    });
    setIsOpen(false);
  };

  return (
    <IonActionSheet
      isOpen={isOpen}
      header="Delete Address"
      subHeader={addressLabel(address)}
      buttons={[
        {
          text: 'Delete',
          role: 'destructive',
          handler: handleDelete,
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            setIsOpen(false);
          },
        },
      ]}
    ></IonActionSheet>
  );
};
export default DeleteActionSheet;

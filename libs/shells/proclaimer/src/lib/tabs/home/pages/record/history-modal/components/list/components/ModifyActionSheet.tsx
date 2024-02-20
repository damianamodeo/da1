import { NotAtHomeAddress } from '@data-firebase';
import { IonActionSheet } from '@ionic/react';
import { Dispatch, SetStateAction } from 'react';
import editAddress from '../../../../../../util/editAddress';
import { addressLabel } from '../../../../../../util/addressLabel';

const ModifyActionSheet = ({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  address: NotAtHomeAddress & { return?: boolean };
}) => {
  const handleMove = () => {
    editAddress({
      action: address.return ? 'move_to_write' : 'move_to_return',
      timestamp: address.timestamp,
    });
    setIsOpen(false);
  };

  return (
    <IonActionSheet
      isOpen={isOpen}
      header="Change Address"
      subHeader={addressLabel(address)}
      buttons={[
        {
          text: `Move to ${address.return ? 'Write' : 'Return'} List`,
          handler: handleMove,
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
export default ModifyActionSheet;

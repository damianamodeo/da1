import { NotAtHomeAddress } from '@data-firebase';
import { IonIcon, IonItem } from '@ionic/react';
import {
  removeCircle,
  mailOpenOutline,
  arrowUndoOutline,
} from 'ionicons/icons';
import { addressLabel } from '../../../../../../util/addressLabel';

export const ListItem = ({
  address,
  handleModify,
  handleDelete,
}: {
  address: NotAtHomeAddress & { return?: boolean };
  handleModify: (address: NotAtHomeAddress) => void;
  handleDelete: (address: NotAtHomeAddress) => void;
}) => {
  return (
    <IonItem>
      <IonIcon
        icon={removeCircle}
        color="danger"
        slot="start"
        onClick={() => handleDelete(address)}
      />

      {addressLabel(address)}

      <IonIcon
        color="primary"
        icon={address.return ? arrowUndoOutline : mailOpenOutline}
        slot="end"
        onClick={() => handleModify(address)}
      />
    </IonItem>
  );
};

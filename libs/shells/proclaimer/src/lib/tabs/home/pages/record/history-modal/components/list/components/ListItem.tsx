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
    <IonItem className="ion-padding-bottom" lines="none">
      <IonIcon
        icon={removeCircle}
        color="danger"
        slot="start"
        onClick={() => handleDelete(address)}
      />

      {`${address.unitNumber && `${address.unitNumber}/`}
      ${address.houseNumber} ${address.street}`}
      <br />
      {`${address.suburb}`}

      <IonIcon
        color="primary"
        icon={address.return ? arrowUndoOutline : mailOpenOutline}
        slot="end"
        onClick={() => handleModify(address)}
      />
    </IonItem>
  );
};

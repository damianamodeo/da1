import { IonActionSheet } from '@ionic/react';
import { State, Action } from '../Map';
import editAddress from '../../../../logic/editAddress';

export const ConfirmHouseDelete = ({
  state,
  dispatch,
}: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) => {
  if (!state.addresses[0]) {
    return null;
  }
  const handleConfirm = async (
    action: 'delete_from_return' | 'move_to_write'
  ) => {
    await editAddress({
      action: action,
      timestamp: state.addresses[0].timestamp,
    }),
      dispatch({ type: 'SET_MODAL', payload: false });
  };

  const { houseNumber, street, suburb } = state.addresses[0];

  return (
    <IonActionSheet
      isOpen={state.modal && !state.isUnits}
      header="Delete Address"
      subHeader={`${houseNumber} ${street} ${suburb}`}
      buttons={[
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => handleConfirm('move_to_write'),
        },
        {
          text: 'Send to Write List',
          handler: () => handleConfirm('move_to_write'),
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            dispatch({ type: 'SET_MODAL', payload: false });
          },
        },
      ]}
    ></IonActionSheet>
  );
};

export default ConfirmHouseDelete;

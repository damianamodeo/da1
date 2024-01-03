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
  const handleDelete = async () => {
    await editAddress({
      action: 'delete_from_return',
      timestamp: state.addresses[0].timestamp,
    }),
      dispatch({ type: 'SET_MODAL', payload: false });
  };

  return (
    <IonActionSheet
      isOpen={state.modal && !state.isUnits}
      header="Delete Address"
      subHeader={'state.addresses'}
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
            dispatch({ type: 'SET_MODAL', payload: false });
          },
        },
      ]}
    ></IonActionSheet>
  );
};

export default ConfirmHouseDelete;

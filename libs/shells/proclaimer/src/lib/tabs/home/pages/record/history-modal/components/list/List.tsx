import {
  AddressList,
  NotAtHomeAddress,
  firestoreDocumentPaths,
  useFirestoreData,
} from '@data-firebase';
import { IonList } from '@ionic/react';
import { useState } from 'react';
import DeleteActionSheet from './components/DeleteActionSheet';
import { ListItem } from './components/ListItem';
import ModifyActionSheet from './components/ModifyActionSheet';

const List = () => {
  const [isDeleteActionSheetOpen, setIsDeleteActionSheetOpen] = useState(false);
  const [isModifyActionSheetOpen, setModifyActionSheetOpen] = useState(false);
  const [address, setAddress] = useState({} as NotAtHomeAddress);

  const data: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  if (!data) return null;

  const returnList = (data.return_list || []).map((obj: AddressList) => ({
    ...obj,
    return: true,
  }));

  const addresses: AddressList = [...returnList, ...(data.write_list || [])]
    .filter(
      (address: NotAtHomeAddress) =>
        address.user === localStorage.getItem('user')
    )
    .sort((a: any, b: any) => b.timestamp - a.timestamp);

  const handleModify = (address: NotAtHomeAddress) => {
    setAddress(address);
    setModifyActionSheetOpen(true);
  };

  const handleDelete = (address: NotAtHomeAddress) => {
    setAddress(address);
    setIsDeleteActionSheetOpen(true);
  };

  return (
    <>
      <IonList>
        {addresses?.map((address: any) => {
          return (
            <ListItem
              key={address.timestamp}
              address={address}
              handleModify={handleModify}
              handleDelete={handleDelete}
            ></ListItem>
          );
        })}
      </IonList>

      <DeleteActionSheet
        isOpen={isDeleteActionSheetOpen}
        setIsOpen={setIsDeleteActionSheetOpen}
        address={address}
      ></DeleteActionSheet>

      <ModifyActionSheet
        isOpen={isModifyActionSheetOpen}
        setIsOpen={setModifyActionSheetOpen}
        address={address}
      ></ModifyActionSheet>
    </>
  );
};

export default List;

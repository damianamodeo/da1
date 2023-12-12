// IMPORTS
import {
  AddressList,
  firestoreDocumentPaths,
  useFirestoreData,
} from '@data-firebase';
import { IonActionSheet, IonIcon, IonItem, IonList } from '@ionic/react';
import { removeCircle, mailOpen, arrowUndo } from 'ionicons/icons';
import { useMemo, useState } from 'react';

export const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  // TODO get this data from AddAddress so it doesnt run twice
  const data: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const addresses: AddressList | any[] = useMemo(() => {
    // TODO add return to each address
    const returnList = (data?.return_list || []).map((obj: AddressList) => ({
      ...obj,
      return: true,
    }));
    const writeList = data?.write_list || [];
    const mergedList = [...returnList, ...writeList];
    const sortedList = mergedList.sort(
      (a: any, b: any) => b.timestamp - a.timestamp
    );
    return sortedList.filter(
      (address: any) => address.user === localStorage.getItem('user')
    );
  }, [data]);

  return (
    <div className="">
      <IonList>
        {addresses?.map((address: any, index: number) => {
          return (
            <IonItem key={`${address.id} ${index} `}>
              {address.unitNumber && `${address.unitNumber}/`}
              {address.houseNumber} {address.street}, {address.suburb}
              <IonIcon
                icon={removeCircle}
                color="danger"
                slot="start"
                onClick={() => {
                  setIsOpen(true);
                }}
              ></IonIcon>
              {/* TODO add icon button to end to indicate return or write list which opens option to change */}
              {!address.return && (
                <IonIcon
                  icon={mailOpen}
                  color="secondary"
                  slot="end"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                ></IonIcon>
              )}
              {address.return && (
                <IonIcon
                  icon={arrowUndo}
                  color="tertiary"
                  slot="end"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                ></IonIcon>
              )}
            </IonItem>
          );
        })}
      </IonList>

      <IonActionSheet
        isOpen={isOpen}
        header="Example header"
        subHeader="Example subheader"
        buttons={[
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {
              console.log('deleted');
              setIsOpen(false);
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('cancelled');
              setIsOpen(false);
            },
          },
        ]}
      ></IonActionSheet>
    </div>
  );
};

export default History;

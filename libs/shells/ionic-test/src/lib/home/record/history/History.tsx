import {
  AddressList,
  firestoreDocumentPaths,
  useFirestoreData,
} from '@data-firebase';
import { IonActionSheet, IonIcon, IonItem, IonList } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useMemo, useState } from 'react';

export const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const addresses: AddressList | any[] = useMemo(() => {
    const returnList = data?.return_list || [];
    const writeList = data?.write_list || [];
    const mergedList = [...returnList, ...writeList];
    const sortedList = mergedList.sort(
      (a: any, b: any) => a.timestamp - b.timestamp
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
                icon={trashOutline}
                color="danger"
                slot="end"
                onClick={() => {
                  setIsOpen(true);
                }}
              ></IonIcon>
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

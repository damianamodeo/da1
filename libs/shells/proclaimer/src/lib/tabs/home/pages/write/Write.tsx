import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonAccordion,
  IonAccordionGroup,
  IonActionSheet,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
import { LoadingSpinner } from '@ui-ion';
import { Suspense } from 'react';
import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';
import { groupBy } from 'lodash';
import { arrowUndoOutline, trash } from 'ionicons/icons';
import { useState } from 'react';
import editAddress from '../../util/editAddress';

export const Write = () => {
  // TODO sort house numbers 
  const [confirmMoveActionSheet, setConfirmMoveActionSheet] = useState(false);
  const [confirmDeleteActionSheet, setConfirmDeleteActionSheet] =
    useState(false);
  const [timestamp, setTimestamp] = useState(0);
  const [subheader, setSubheader] = useState('');
  const addresses = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  if (!addresses?.write_list) {
    return null;
  }

  const sortedAddresses = addresses?.write_list.sort(
    (
      a: {
        unitNumber: string;
        houseNumber: string;
        street: string;
        suburb: string;
      },
      b: {
        unitNumber: string;
        houseNumber: string;
        street: string;
        suburb: string;
      }
    ) => {
      const aUnitNumber = parseInt(a.unitNumber.match(/\d+/)?.[0] || '', 10);
      const bUnitNumber = parseInt(b.unitNumber.match(/\d+/)?.[0] || '', 10);
      const aHouseNumber = parseInt(a.houseNumber.match(/\d+/)?.[0] || '', 10);
      const bHouseNumber = parseInt(b.houseNumber.match(/\d+/)?.[0] || '', 10);
      if (aUnitNumber !== bUnitNumber) {
        return aUnitNumber - bUnitNumber;
      }
      if (aHouseNumber !== bHouseNumber) {
        return aHouseNumber - bHouseNumber;
      }
      if (a.street !== b.street) {
        return a.street.localeCompare(b.street);
      }
      return a.suburb.localeCompare(b.suburb);
    }
  );

  const groupedBySuburb = groupBy(sortedAddresses, 'suburb');

  const handleConfirm = async (
    action: 'delete_from_write' | 'move_to_return'
  ) => {
    await editAddress({
      action: action,
      timestamp: timestamp,
    });
    setConfirmMoveActionSheet(false);
    setConfirmDeleteActionSheet(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Write</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Suspense fallback={<LoadingSpinner></LoadingSpinner>}>
          <IonAccordionGroup multiple>
            {Object.keys(groupedBySuburb)
              .sort()
              .map((suburb) => {
                const groupedByStreet = groupBy(
                  groupedBySuburb[suburb],
                  'street'
                );

                return (
                  <IonAccordion key={suburb}>
                    <IonItem slot="header" color="light">
                      {/* TODO add total addresses in suburb */}
                      <IonLabel>{suburb}</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      <IonAccordionGroup multiple key={suburb}>
                        {Object.keys(groupedByStreet).map((street) => {
                          return (
                            <IonAccordion key={street}>
                              <IonItem slot="header" color="medium">
                                {/* TODO add total addresses in street */}
                                <IonLabel>{street}</IonLabel>
                              </IonItem>
                              <IonList
                                className="ion-padding-bottom"
                                slot="content"
                              >
                                {groupedBySuburb[suburb]
                                  .filter((item) => item.street === street)
                                  .map((address) => {
                                    const header = `${
                                      address.unitNumber &&
                                      `${address.unitNumber}/`
                                    }${address.houseNumber} 
                             ${address.street}${address.suburb}`;
                                    return (
                                      <IonItem key={address.timestamp}>
                                        {`${address.unitNumber && 'Unit '}`}
                                        {address.unitNumber}
                                        {`${address.unitNumber && ' of '}`}
                                        {address.houseNumber}
                                        <IonIcon
                                          className="ion-padding-start"
                                          color="primary"
                                          icon={arrowUndoOutline}
                                          slot="end"
                                          onClick={() => {
                                            setTimestamp(
                                              address.timestamp
                                            );
                                            setConfirmMoveActionSheet(true);
                                            setSubheader(header);
                                          }}
                                        ></IonIcon>
                                        <IonIcon
                                          className="ion-padding-start"
                                          icon={trash}
                                          color="danger"
                                          slot="end"
                                          onClick={() => {
                                            setTimestamp(
                                              address.timestamp
                                            );
                                            setConfirmDeleteActionSheet(true);
                                            setSubheader(header);
                                          }}
                                        ></IonIcon>
                                      </IonItem>
                                    );
                                  })}
                              </IonList>
                            </IonAccordion>
                          );
                        })}
                      </IonAccordionGroup>
                    </div>
                  </IonAccordion>
                );
              })}
          </IonAccordionGroup>
          <IonActionSheet
            isOpen={confirmMoveActionSheet}
            header="Delete Address"
            subHeader={subheader}
            buttons={[
              {
                text: 'Send to Return List',
                handler: () => handleConfirm('move_to_return'),
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  setConfirmMoveActionSheet(false);
                },
              },
            ]}
          ></IonActionSheet>

          <IonActionSheet
            isOpen={confirmDeleteActionSheet}
            header="Delete Address"
            subHeader={subheader}
            buttons={[
              {
                text: 'Delete',
                role: 'destructive',
                handler: () => handleConfirm('delete_from_write'),
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  setConfirmDeleteActionSheet(false);
                },
              },
            ]}
          ></IonActionSheet>
        </Suspense>
      </IonContent>
    </IonPage>
  );
};

export default Write;

// create a react component
import React, { useState } from 'react';

import {
  IonContent,
  IonHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { StreetOption, firestoreDocumentPaths } from '@data-firebase';

export const AddStreet = ({ state, options, onCancel, onInputChange }: any) => {
  return (
    <IonModal isOpen={state.street === 'Add New Street'}>
      <Autocomplete
        title="Add Street"
        items={options}
        onCancel={onCancel}
        onInputChange={(v: string) => {
          onInputChange(v);
        }}
        // onSelect={(data: any) => {
        //   setSearchString('');
        //   dispatch({ type: 'SET_STREET', payload: data.text });
        //   writeFirebaseDoc({
        //     path: firestoreDocumentPaths.not_at_homes,
        //     data: ({
        //       existingData,
        //       documentExists,
        //     }: {
        //       existingData: DocumentData | undefined;
        //       documentExists: boolean;
        //     }): DocumentData | undefined => {
        //       const newStreetOption = {
        //         suburb: state.suburb,
        //         name: data.text,
        //         lat: data.value.center[0],
        //         lng: data.value.center[1],
        //       };

        //       const { street_options, ...rest } = existingData as {
        //         street_options: StreetOption[];
        //       };

        //       const updatedStreetOptions = [
        //         ...(street_options || []),
        //         newStreetOption,
        //       ].sort((a, b) => a.name.localeCompare(b.name));

        //       return { street_options: updatedStreetOptions, ...rest };
        //     },
        //   });
        // }}
      ></Autocomplete>
    </IonModal>
  );
};

import {
  StreetOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { useSearchStreet } from '@data-mapbox';
import { IonModal } from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';

export const AddNewStreetModal = (props: any) => {
  const newStreetData = useSearchStreet(props.state.searchString || '');
  const newStreetOptions: any = newStreetData.map((data) => {
    return { text: data.text, value: data };
  });

  const onNewStreetSelect = (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
    props.dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    props.dispatch({ type: 'SET_STREET', payload: data.text });
    writeFirebaseDoc({
      path: firestoreDocumentPaths.not_at_homes,
      data: ({
        existingData,
      }: {
        existingData: DocumentData | undefined;
        documentExists: boolean;
      }): DocumentData | undefined => {
        const newStreetOption = {
          suburb: props.state.suburb,
          name: data.text,
          lat: data.value.center[0],
          lng: data.value.center[1],
        };

        const { street_options, ...rest } = existingData as {
          street_options: StreetOption[];
        };

        const updatedStreetOptions = (street_options || [])
          .reduce(
            (uniqueStreets: StreetOption[], streetOption: StreetOption) => {
              if (
                !uniqueStreets.some(
                  (s) =>
                    s.name === streetOption.name &&
                    s.suburb === props.state.suburb
                )
              ) {
                uniqueStreets.push(streetOption);
              }
              return uniqueStreets;
            },
            [newStreetOption]
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        return { street_options: updatedStreetOptions, ...rest };
      },
    });
  };
  return (
    <IonModal isOpen={props.state.street === 'Add New Street'}>
      <Autocomplete
        title="Add Street"
        items={newStreetOptions}
        onCancel={() =>
          props.dispatch({
            type: 'SET_STREET',
            payload: '',
          })
        }
        onInputChange={(v: string) => {
          props.dispatch({
            type: 'SET_SEARCH_STRING',
            payload: v,
          });
        }}
        onSelect={(data: any) => {
          onNewStreetSelect(data);
        }}
      >
        {/* TODO add instructions in modal to type and hide once typing has begun
         */}
        {/* TODO add a confirm button to submit new street
         */}
      </Autocomplete>
    </IonModal>
  );
};

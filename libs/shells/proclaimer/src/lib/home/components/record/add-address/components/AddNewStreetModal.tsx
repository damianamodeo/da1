import {
  StreetOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { useSearchStreet } from '@data-mapbox';
import { IonModal } from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { Action, State } from '../AddAddress';
import { Dispatch } from 'react';

export const AddNewStreetModal = (props: {
  state: State;
  dispatch: Dispatch<Action>;
}) => {
  const newStreetData = useSearchStreet({
    streetQuery: props.state.searchString || '',
    suburb: props.state.suburb,
    bbox: props.state.bbox,
  });
  const newStreetOptions: any = newStreetData.map((data) => {
    return { text: data.text, value: data };
  });

  const onNewStreetSelect = (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
    // TODO add warning if option has relevance below 0.9
    // TODO add returned suburb name instead of suburb name stored in state
    props.dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    props.dispatch({
      type: 'SET_STREET',
      payload: {
        street: data.text,
        streetCoords: [data.value.center[0], data.value.center[1]],
      },
    });
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
          lng: data.value.center[0],
          lat: data.value.center[1],
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
            payload: {
              street: '',
              streetCoords: props.state.streetCoords as [number, number],
            },
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

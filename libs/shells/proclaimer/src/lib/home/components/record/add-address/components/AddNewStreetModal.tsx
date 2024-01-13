import {
  StreetOption,
  SuburbOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { searchForStreet } from '@data-mapbox';
import { IonModal } from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { Action, State } from '../AddAddress';
import { Dispatch, useState } from 'react';

export const AddNewStreetModal = (props: {
  state: State;
  dispatch: Dispatch<Action>;
}) => {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (value: string) => {
    props.dispatch({
      type: 'SET_SEARCH_STRING',
      payload: value,
    });
    const newStreetData = await searchForStreet({
      streetQuery: value,
      suburb: props.state.suburb,
      bbox: props.state.bbox,
    });

    const newStreetOptions: any = newStreetData.map(
      (data: { [key: string]: any }) => {
        return { text: data.text, value: data };
      }
    );

    setOptions(newStreetOptions);
  };

  const onNewStreetSelect = async (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
    // TODO add warning if option has relevance below 0.9

    let newSuburb = props.state.suburb;

    await writeFirebaseDoc({
      path: firestoreDocumentPaths.not_at_homes,
      data: ({
        existingData,
      }: {
        existingData: DocumentData | undefined;
        documentExists: boolean;
      }): DocumentData | undefined => {
        const { street_options, suburb_options, ...rest } = existingData as {
          street_options: StreetOption[];
          suburb_options: SuburbOption[];
        };

        newSuburb = suburb_options.some(
          (obj) => obj.name === data.value.context[1].text
        )
          ? data.value.context[1].text
          : newSuburb;

        const newStreetOption = {
          suburb: newSuburb,
          name: data.text,
          lng: data.value.center[0],
          lat: data.value.center[1],
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
        return {
          street_options: updatedStreetOptions,
          suburb_options,
          ...rest,
        };
      },
    });

    props.dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    props.dispatch({
      type: 'SET_STREET',
      payload: {
        street: data.text,
        streetCoords: [data.value.center[0], data.value.center[1]],
        suburb: newSuburb,
      },
    });
    setOptions([]);
  };

  return (
    <IonModal isOpen={props.state.street === 'Add New Street'}>
      <Autocomplete
        title="Add Street"
        items={options}
        onCancel={() => {
          props.dispatch({
            type: 'SET_STREET',
            payload: {
              street: '',
              streetCoords: props.state.streetCoords as [number, number],
              suburb: props.state.suburb,
            },
          });
        }}
        onInputChange={handleInputChange}
        onSelect={(data: any) => {
          onNewStreetSelect(data);
        }}
      >
        {/* TODO add a confirm button to submit new street
         */}
      </Autocomplete>
    </IonModal>
  );
};

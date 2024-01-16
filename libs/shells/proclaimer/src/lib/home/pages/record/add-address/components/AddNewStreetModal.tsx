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

  const handleCancel = () => {
    props.dispatch({
      type: 'SET_MODAL',
      payload: '',
    });
  };

  const handleInputChange = async (value: string) => {
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

  const handleSelect = async (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
    // TODO add warning if option has relevance below 0.9

    let newSuburb = { name: props.state.suburb, bbox: props.state.bbox };

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

        newSuburb =
          suburb_options.find(
            (obj) => obj.name === data.value.context[1].text
          ) || newSuburb;

        const newStreetOption = {
          suburb: newSuburb.name,
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
                    s.name === streetOption.suburb &&
                    s.lng === streetOption.lng &&
                    s.lat === streetOption.lat
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

    props.dispatch({
      type: 'SET_STREET',
      payload: {
        street: data.text,
        streetCoords: [data.value.center[0], data.value.center[1]],
        suburb: newSuburb.name,
        bbox: newSuburb.bbox,
      },
    });

    props.dispatch({
      type: 'SET_MODAL',
      payload: '',
    });

    setOptions([]);
  };

  return (
    <IonModal isOpen={props.state.modal === 'add-street'}>
      <Autocomplete
        title="Add Street"
        items={options}
        onCancel={handleCancel}
        onInputChange={handleInputChange}
        onSelect={handleSelect}
      >
        {/* TODO add a confirm button to submit new street
         */}
      </Autocomplete>
    </IonModal>
  );
};

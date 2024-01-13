import {
  SuburbOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { searchForSuburb } from '@data-mapbox';
import { IonModal } from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';

export const AddNewSuburbModal = (props: any) => {
  const [options, setOptions] = useState([]);

  const handleInputChange = async (value: string) => {
    {
      props.dispatch({
        type: 'SET_SEARCH_STRING',
        payload: value,
      });
    }
    const newSuburbData = await searchForSuburb(value);
    const newSuburbOptions = newSuburbData.map(
      (data: { [key: string]: any }) => {
        return { text: data.text, value: data };
      }
    );
    setOptions(newSuburbOptions);
  };
  const onNewSuburbSelect = (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
    props.dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    props.dispatch({
      type: 'SET_SUBURB',
      payload: { suburb: data.text, bbox: data.value.bbox },
    });
    writeFirebaseDoc({
      path: firestoreDocumentPaths.not_at_homes,
      data: ({
        existingData,
        documentExists,
      }: {
        existingData: DocumentData | undefined;
        documentExists: boolean;
      }): DocumentData | undefined => {
        const newSuburbOption = {
          name: data.text,
          bbox: data.value.bbox,
        };

        if (!documentExists) {
          return { suburb_options: [newSuburbOption] };
        }

        const { suburb_options, ...rest } = existingData as {
          suburb_options: SuburbOption[];
        };

        const mergedSuburbOptions = [
          ...(suburb_options || []),
          newSuburbOption,
        ].reduce((acc: SuburbOption[], option) => {
          if (!acc.some((opt) => opt.name === option.name)) {
            acc.push(option);
          }
          return acc;
        }, []);

        const sortedSuburbOptions = mergedSuburbOptions.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        return { suburb_options: sortedSuburbOptions, ...rest };
      },
    });
  };
  return (
    <IonModal isOpen={props.state.suburb === 'Add New Suburb'}>
      <Autocomplete
        title="Add Suburb"
        items={options}
        onCancel={() =>
          props.dispatch({
            type: 'SET_SUBURB',
            payload: {
              suburb: '',
              bbox: [0, 0, 0, 0],
            },
          })
        }
        onInputChange={handleInputChange}
        onSelect={(data: any) => {
          onNewSuburbSelect(data);
        }}
      >
        {/* TODO add a confirm button to submit new suburb
         */}
      </Autocomplete>
    </IonModal>
  );
};

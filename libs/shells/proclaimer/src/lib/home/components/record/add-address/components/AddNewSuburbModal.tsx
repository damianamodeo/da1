import {
  SuburbOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { useSearchSuburb } from '@data-mapbox';
import { IonModal } from '@ionic/react';
import { Autocomplete } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';

export const AddNewSuburbModal = (props: any) => {
  const newSuburbData = useSearchSuburb(props.state.searchString || '');
  const newSuburbOptions = newSuburbData.map((data) => {
    return { text: data.text, value: data };
  });
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
        items={newSuburbOptions}
        onCancel={() =>
          props.dispatch({
            type: 'SET_SUBURB',
            payload: {
              suburb: '',
              bbox: [0, 0, 0, 0],
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
          onNewSuburbSelect(data);
        }}
      >
        {/* TODO add instructions in modal to type and hide once typing has begun
         */}
        {/* TODO add a confirm button to submit new suburb
         */}
      </Autocomplete>
    </IonModal>
  );
};

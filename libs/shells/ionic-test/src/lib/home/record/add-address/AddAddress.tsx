// IMPORTS
import {
  AddressList,
  StreetOption,
  SuburbOption,
  firestoreDocumentPaths,
  getFirestoreDocumentSize,
  useFirestoreData,
  writeFirebaseDoc,
} from '@data-firebase';
import {
  Bbox,
  searchAddress,
  useSearchStreet,
  useSearchSuburb,
} from '@data-mapbox';
import {
  IonInput,
  IonItem,
  IonList,
  IonButton,
  IonModal,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Autocomplete, LoadingSpinner, Picker } from '@ui-ion';
import { useToggle } from '@util';
import { DocumentData } from 'firebase/firestore';
import { Reducer, useReducer, useState } from 'react';
import sizeof from 'firestore-size';

// TYPES
type Suburb = {
  name: string;
  bbox: Bbox;
};

type Coords = {
  lat: number;
  lng: number;
  relevance: number;
};

type State = {
  suburb: string;
  street: string;
  houseNumber: string;
  unitNumber: string;
  bbox?: Bbox;
  coords?: Coords;
  modal?: boolean;
  loading?: boolean;
  searchString?: string;
};

type Action =
  | { type: 'SET_SUBURB'; payload: { suburb: string; bbox: Bbox } }
  | { type: 'SET_STREET'; payload: string }
  | { type: 'SET_HOUSE_NUMBER'; payload: string }
  | { type: 'SET_UNIT_NUMBER'; payload: string }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | {
      type: 'SET_COORDS';
      payload: Coords;
    }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SEARCH_STRING'; payload: string }
  | { type: 'ON_SUBMIT'; payload: Coords };

// REDUCER
const initialState: State = {
  suburb: localStorage.getItem('not-at-home-suburb') || '',
  street: localStorage.getItem('not-at-home-street') || '',
  houseNumber: localStorage.getItem('not-at-home-houseNumber') || '',
  unitNumber: localStorage.getItem('not-at-home-unitNumber') || '',
  coords: {
    lat: 0,
    lng: 0,
    relevance: 0,
  },
  modal: false,
  loading: false,
  searchString: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SUBURB':
      localStorage.setItem('not-at-home-suburb', action.payload.suburb);
      localStorage.removeItem('not-at-home-street');
      localStorage.removeItem('not-at-home-houseNumber');
      localStorage.removeItem('not-at-home-unitNumber');
      return {
        ...state,
        suburb: action.payload.suburb,
        street: '',
        houseNumber: '',
        unitNumber: '',
        bbox: action.payload.bbox,
      };
    case 'SET_STREET':
      localStorage.setItem('not-at-home-street', action.payload);
      localStorage.removeItem('not-at-home-houseNumber');
      localStorage.removeItem('not-at-home-unitNumber');
      return {
        ...state,
        street: action.payload,
        houseNumber: '',
        unitNumber: '',
      };
    case 'SET_HOUSE_NUMBER':
      localStorage.setItem('not-at-home-houseNumber', action.payload);
      localStorage.removeItem('not-at-home-unitNumber');
      return {
        ...state,
        houseNumber: action.payload,
        unitNumber: '',
      };
    case 'SET_UNIT_NUMBER':
      localStorage.setItem('not-at-home-unitNumber', action.payload);
      return { ...state, unitNumber: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, modal: false };
    case 'OPEN_MODAL':
      return { ...state, modal: true };
    case 'ON_SUBMIT':
      return { ...state, loading: false, coords: action.payload };
    case 'SET_SEARCH_STRING':
      return { ...state, searchString: action.payload };

    default:
      return state;
  }
};

// COMPONENT
export const AddAddress = (): JSX.Element => {
  // STATE
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState);

  // DATA
  const options: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const suburbOptions = [
    ...(options?.suburb_options?.map((suburb: Suburb) => {
      return { text: suburb.name, value: suburb.bbox };
    }) || []),
    { text: 'Add New Suburb', value: 'add-suburb' },
  ];

  const streetOptions = [
    ...(state.suburb.length > 0 && options?.street_options
      ? options?.street_options
          .filter((street: any) => street.suburb === state.suburb)
          .map((street: any) => {
            return { text: street.name, value: street };
          })
      : []),
    { text: 'Add New Street', value: 'add-street' },
  ];

  const newSuburbData = useSearchSuburb(state.searchString || '');
  const newSuburbOptions = newSuburbData.map((data) => {
    return { text: data.text, value: data };
  });

  const newStreetData = useSearchStreet(state.searchString || '');
  const newStreetOptions: any = newStreetData.map((data) => {
    return { text: data.text, value: data };
  });

  // HANDLERS
  const handleSubmit = async () => {
    dispatch({ type: 'OPEN_MODAL' });
    try {
      const coords = await searchAddress({
        houseNumber: state.houseNumber,
        street: state.street,
        suburb: state.suburb,
        bbox: state.bbox,
      });
      dispatch({ type: 'ON_SUBMIT', payload: coords });
    } catch (error) {
      console.error('Error getting address coordinates:', error);
    }
  };

  const submitToFirestore = ({
    existingData,
    documentExists,
  }: {
    existingData: DocumentData | undefined;
    documentExists: boolean;
  }): DocumentData | undefined => {
    const { write_list, ...rest } = existingData as {
      write_list: AddressList;
    };

    const timestamp = new Date().getTime();
    const newAddress = {
      suburb: state.suburb,
      street: state.street,
      houseNumber: state.houseNumber,
      unitNumber: state.unitNumber,
      relevance: state.coords ? state.coords.relevance : 0,
      lat: state.coords ? state.coords.lat : 0,
      lng: state.coords ? state.coords.lng : 0,
      user: localStorage.getItem('user') || 'no_user',
      timestamp,
    };

    if (write_list) {
      write_list.push(newAddress);
      write_list.sort((a, b) => a.timestamp - b.timestamp);

      if (write_list.length > 10000) {
        write_list.splice(0, write_list.length - 10000);
      }
      return { write_list, ...rest };
    }

    return { write_list: [newAddress], ...rest };
  };

  const onNewSuburbSelect = (data: any) => {
    dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    dispatch({
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

  const onNewStreetSelect = (data: any) => {
    dispatch({ type: 'SET_SEARCH_STRING', payload: '' });
    dispatch({ type: 'SET_STREET', payload: data.text });
    writeFirebaseDoc({
      path: firestoreDocumentPaths.not_at_homes,
      data: ({
        existingData,
        documentExists,
      }: {
        existingData: DocumentData | undefined;
        documentExists: boolean;
      }): DocumentData | undefined => {
        const newStreetOption = {
          suburb: state.suburb,
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
                    s.name === streetOption.name && s.suburb === state.suburb
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

  // RENDER
  return (
    <div className="ion-padding">
      {/* SUBMIT ADDRESS FORM */}
      <IonList inset>
        <Picker
          value={state.suburb}
          label="Suburb"
          options={suburbOptions}
          onSelect={({ text, value }) => {
            dispatch({
              type: 'SET_SUBURB',
              payload: { suburb: text, bbox: value.bbox },
            });
          }}
        ></Picker>

        <Picker
          value={state.street}
          disabled={state.suburb.length === 0}
          label="Street"
          options={streetOptions}
          onSelect={({ text }) => {
            dispatch({ type: 'SET_STREET', payload: text });
          }}
        ></Picker>

        <IonItem disabled={state.street.length === 0}>
          <IonInput
            value={state.houseNumber}
            label="House"
            clearInput={true}
            onIonInput={(e) =>
              dispatch({
                type: 'SET_HOUSE_NUMBER',
                payload: e.target.value as string,
              })
            }
          ></IonInput>
        </IonItem>

        <IonItem disabled={state.houseNumber.length === 0}>
          <IonInput
            value={state.unitNumber}
            label="Unit"
            clearInput={true}
            onIonInput={(e) =>
              dispatch({
                type: 'SET_UNIT_NUMBER',
                payload: e.target.value as string,
              })
            }
          ></IonInput>
        </IonItem>
      </IonList>
      <IonButton
        style={{ marginTop: '2rem' }}
        disabled={state.houseNumber.length === 0}
        expand="block"
        onClick={handleSubmit}
      >
        Submit
      </IonButton>

      {/* SUBMIT ADDRESS MODAL */}
      <IonModal isOpen={state.modal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Confirm</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="full centered">
            {state.loading ? <LoadingSpinner></LoadingSpinner> : 'LOADED'}
            <br />
            lat: {state.coords?.lat}
            <br />
            lng: {state.coords?.lng}
            <br />
            relevance: {state.coords?.relevance}
            <br />
            {`${state.unitNumber && `${state.unitNumber}/`}` +
              `${state.houseNumber} ` +
              `${state.street}, ` +
              `${state.suburb}`}
            <IonButton
              expand="block"
              onClick={() => {
                writeFirebaseDoc({
                  path: firestoreDocumentPaths.not_at_homes,
                  data: submitToFirestore,
                });
              }}
            >
              Submit
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      {/* ADD NEW SUBURB MODAL */}

      {/* TODO:  */}

      <IonModal isOpen={state.suburb === 'Add New Suburb'}>
        <Autocomplete
          title="Add Suburb"
          items={newSuburbOptions}
          onCancel={() =>
            dispatch({
              type: 'SET_SUBURB',
              payload: { suburb: '', bbox: [0, 0, 0, 0] },
            })
          }
          onInputChange={(v: string) => {
            dispatch({ type: 'SET_SEARCH_STRING', payload: v });
          }}
          onSelect={(data: any) => {
            onNewSuburbSelect(data);
          }}
        ></Autocomplete>
      </IonModal>

      {/* ADD NEW STREET MODAL */}
      <IonModal isOpen={state.street === 'Add New Street'}>
        <Autocomplete
          title="Add Street"
          items={newStreetOptions}
          onCancel={() => dispatch({ type: 'SET_STREET', payload: '' })}
          onInputChange={(v: string) => {
            dispatch({ type: 'SET_SEARCH_STRING', payload: v });
          }}
          onSelect={(data: any) => {
            onNewStreetSelect(data);
          }}
        ></Autocomplete>
      </IonModal>
    </div>
  );
};

export default AddAddress;

// IMPORTS
import {
  AddressList,
  StreetOption,
  SuburbOption,
  firestoreDocumentPaths,
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
  IonLabel,
  IonToggle,
  IonListHeader,
  IonText,
  IonNote,
} from '@ionic/react';
import { Autocomplete, LoadingSpinner, Picker } from '@ui-ion';
import { DocumentData } from 'firebase/firestore';
import { Reducer, useReducer } from 'react';

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
  sendToLetterList?: boolean;
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
  | { type: 'ON_SUBMIT'; payload: Coords }
  | { type: 'SET_LETTER_LIST'; payload: boolean };

// REDUCER
const initialState = (): State => {
  return {
    suburb: localStorage.getItem('not-at-home-suburb') || '',
    street: localStorage.getItem('not-at-home-street') || '',
    houseNumber: localStorage.getItem('not-at-home-house') || '',
    unitNumber: localStorage.getItem('not-at-home-unit') || '',
    coords: {
      lat: 0,
      lng: 0,
      relevance: 0,
    },
    modal: false,
    loading: false,
    searchString: '',
    sendToLetterList: false,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SUBURB':
      localStorage.setItem('not-at-home-suburb', action.payload.suburb);
      localStorage.removeItem('not-at-home-street');
      localStorage.removeItem('not-at-home-house');
      localStorage.removeItem('not-at-home-unit');
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
      localStorage.removeItem('not-at-home-house');
      localStorage.removeItem('not-at-home-unit');
      return {
        ...state,
        street: action.payload,
        houseNumber: '',
        unitNumber: '',
      };
    case 'SET_HOUSE_NUMBER':
      localStorage.setItem('not-at-home-house', action.payload);
      localStorage.removeItem('not-at-home-unit');
      return {
        ...state,
        houseNumber: action.payload,
        unitNumber: '',
      };
    case 'SET_UNIT_NUMBER':
      localStorage.setItem('not-at-home-unit', action.payload);
      return { ...state, unitNumber: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, modal: false, sendToLetterList: false, loading: true };
    case 'OPEN_MODAL':
      return { ...state, modal: true };
    case 'ON_SUBMIT':
      return {
        ...state,
        loading: false,
        coords: action.payload,
        sendToLetterList: false,
      };
    case 'SET_SEARCH_STRING':
      return { ...state, searchString: action.payload };
    case 'SET_LETTER_LIST':
      return { ...state, sendToLetterList: action.payload };

    default:
      return state;
  }
};

// COMPONENT
export const AddAddress = (): JSX.Element => {
  // STATE
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState());

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

  const writeAddressToFirestore = ({
    existingData,
    documentExists,
  }: {
    existingData: DocumentData | undefined;
    documentExists: boolean;
  }): DocumentData | undefined => {
    const { return_list, write_list, ...rest } = existingData as {
      [string: string]: AddressList;
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

    const list = state.sendToLetterList ? write_list : return_list;
    const untouchedList = !state.sendToLetterList ? write_list : return_list;

    if (list) {
      list.push(newAddress);

      list.sort((a, b) => a.timestamp - b.timestamp);

      if (list.length > 10000) {
        list.splice(0, list.length - 10000);
      }
      return {
        [state.sendToLetterList ? 'write_list' : 'return_list']: list,
        [state.sendToLetterList ? 'return_list' : 'write_list']:
          untouchedList || [],
        ...rest,
      };
    }

    return {
      [state.sendToLetterList ? 'write_list' : 'return_list']: [newAddress],
      [state.sendToLetterList ? 'return_list' : 'write_list']:
        untouchedList || [],
      ...rest,
    };
  };

  const onNewSuburbSelect = (data: any) => {
    // TODO add error handling in case writeFirebaseDoc fails
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
    // TODO add error handling in case writeFirebaseDoc fails
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
      {/* prettier-ignore */}
      {/* SUBMIT ADDRESS FORM */}
      <IonList inset>
        <IonListHeader>
          <IonLabel>Address</IonLabel>
        </IonListHeader>
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
        {/* TODO right justify input values
         */}
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
        className="ion-padding"
        style={{ marginTop: '2rem' }}
        disabled={state.houseNumber.length === 0}
        expand="block"
        onClick={handleSubmit}
      >
        Search
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
          {/* TODO add warning if relevance is less 1
           */}
          {/* TODO add notification if address submitted successfully or not */}
          {state.loading ? (
            <div className="full centered">
              <LoadingSpinner></LoadingSpinner>
            </div>
          ) : (
            <>
              <IonList inset className="ion-padding">
                <IonListHeader>
                  <IonLabel>
                    {state.coords?.relevance === 1 ? (
                      <IonText color="success">Match Found</IonText>
                    ) : (
                      <>
                        <IonText color="warning">No Match Found</IonText>
                      </>
                    )}

                    <IonNote>
                      <br></br>
                      {`${state.unitNumber && `${state.unitNumber}/`}` +
                        `${state.houseNumber} ` +
                        `${state.street}, ` +
                        `${state.suburb}`}
                    </IonNote>
                  </IonLabel>
                </IonListHeader>
                {state.coords?.relevance !== 1 && (
                  // <IonItem>
                  <IonNote>
                    You can submit this address but it's location on the map
                    will be inaccurate.
                  </IonNote>
                  // </IonItem>
                )}
              </IonList>
              <IonList className="ion-padding">
                <IonItem lines="none">
                  Send to Write List
                  <IonToggle
                    color={'success'}
                    slot="end"
                    checked={state.sendToLetterList}
                    onIonChange={(e) => {
                      dispatch({
                        type: 'SET_LETTER_LIST',
                        payload: e.detail.checked,
                      });
                    }}
                  ></IonToggle>
                </IonItem>
              </IonList>
              <IonButton
                className="ion-padding"
                expand="block"
                onClick={() => {
                  // TODO add error handling in case writeFirebaseDoc fails
                  // TODO set houseNumber and unitNumber to "" if writeFirebaseDoc is successful
                  // TODO close modal on click
                  writeFirebaseDoc({
                    path: firestoreDocumentPaths.not_at_homes,
                    data: writeAddressToFirestore,
                  });
                  dispatch({ type: 'CLOSE_MODAL' });
                }}
              >
                Submit
              </IonButton>
            </>
          )}
        </IonContent>
      </IonModal>

      {/* ADD NEW SUBURB MODAL */}

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
        >
          {/* TODO add instructions in modal to type and hide once typing has begun
           */}
          {/* TODO add a confirm button to submit new suburb
           */}
        </Autocomplete>
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
        >
          {/* TODO add instructions in modal to type and hide once typing has begun
           */}
          {/* TODO add a confirm button to submit new street
           */}
        </Autocomplete>
      </IonModal>
    </div>
  );
};

export default AddAddress;

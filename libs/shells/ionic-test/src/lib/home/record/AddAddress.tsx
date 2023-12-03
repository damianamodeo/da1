import { useFirestoreData } from '@data-firebase';
import { getAddressCoordinates } from '@data-mapbox';
import { IonInput, IonItem, IonList, IonButton, IonAlert } from '@ionic/react';
import { Picker } from '@ui-ion';
import { useReducer, useState } from 'react';

type BboxType = [number, number, number, number];

type Suburb = {
  name: string;
  bbox: BboxType;
};

type State = {
  suburb: string;
  street: string;
  houseNumber: string;
  unitNumber: string;
};

type Action =
  | { type: 'SET_SUBURB'; payload: string }
  | { type: 'SET_STREET'; payload: string }
  | { type: 'SET_HOUSE_NUMBER'; payload: string }
  | { type: 'SET_UNIT_NUMBER'; payload: string };

/**
 * A reducer function that updates the state based on the given action.
 *
 * @param {State} state - The current state object.
 * @param {Action} action - The action object that contains the type and payload.
 * @return {State} The updated state object.
 */

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SUBURB':
      localStorage.setItem('not-at-home-suburb', action.payload);
      localStorage.removeItem('not-at-home-street');
      localStorage.removeItem('not-at-home-houseNumber');
      localStorage.removeItem('not-at-home-unitNumber');
      return {
        ...state,
        suburb: action.payload,
        street: '',
        houseNumber: '',
        unitNumber: '',
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
    default:
      return state;
  }
};

/**
 * Generates the AddAddress component.
 *
 * @return {JSX.Element} The rendered AddAddress component.
 */

export const AddAddress = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    suburb: localStorage.getItem('not-at-home-suburb') || '',
    street: localStorage.getItem('not-at-home-street') || '',
    houseNumber: localStorage.getItem('not-at-home-houseNumber') || '',
    unitNumber: localStorage.getItem('not-at-home-unitNumber') || '',
  });

  // write a useState hook for bbox variable
  const [bbox, setBbox] = useState<BboxType>([0, 0, 0, 0]);

  const [showDialog, setShowDialog] = useState(false);

  const suburbs: any = useFirestoreData({
    path: 'australia_nsw_maitland/maps',
  });

  const suburbOptions =
    suburbs?.mapDetails?.[0]?.suburbs?.map((suburb: Suburb) => {
      return { text: suburb.name, value: suburb.bbox };
    }) || [];

  const streetOptions =
    state.suburb.length > 0
      ? (
          suburbs?.mapDetails?.[0]?.suburbs?.find(
            (sub: Suburb) => sub.name === state.suburb
          )?.streets || []
        ).map((street: any) => {
          return { text: street.name, value: street.name };
        })
      : [];

 const handleSubmit = async () => {
   try {
     const coords = await getAddressCoordinates({
       houseNumber: state.houseNumber,
       street: state.street,
       suburb: state.suburb,
       bbox,
     });
     console.log("🚀 ~ file: AddAddress.tsx:121 ~ handleSubmit ~ coords:", coords);
     setShowDialog(true);
   } catch (error) {
     console.error('Error getting address coordinates:', error);
     // Handle the error here, e.g. display an error message to the user
   }
 };

  return (
    <>
      <IonList inset>
        <Picker
          value={state.suburb}
          label="Suburb"
          options={suburbOptions}
          onSelect={({ text, value }) => {
            console.log(
              '🚀 ~ file: AddAddress.tsx:125 ~ AddAddress ~ value:',
              value
            );
            dispatch({ type: 'SET_SUBURB', payload: text });
            setBbox(value);
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
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          left: '1rem',
        }}
        disabled={state.houseNumber.length === 0}
        expand="block"
        onClick={handleSubmit}
      >
        Submit
      </IonButton>

      <IonAlert
        header="Match Found!"
        isOpen={showDialog}
        onDidDismiss={() => setShowDialog(false)}
        subHeader={
          `${state.unitNumber && `${state.unitNumber}/`}` +
          `${state.houseNumber} ` +
          `${state.street}, ` +
          `${state.suburb}`
        }
        message={
          // `A match was found for\n` +
          // `${state.unitNumber && `${state.unitNumber}/`}` +
          // `${state.houseNumber} ` +
          // `${state.street}, ` +
          // `${state.suburb}\r` +
          `Choose the list where you want to add this address`
        }
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Write List',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
            },
          },
          {
            text: 'Return List',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed');
            },
          },
        ]}
      ></IonAlert>
    </>
  );
};

export default AddAddress;

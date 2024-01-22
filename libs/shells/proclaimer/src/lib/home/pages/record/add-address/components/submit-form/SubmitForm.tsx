import { getAddressCoords } from '@data-mapbox';
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
} from '@ionic/react';
import { Picker } from '@ui-ion';
import { Action, State, Suburb } from '../../AddAddress';
import { firestoreDocumentPaths, useFirestoreData } from '@data-firebase';
import { ConfirmSubmitModal } from './ConfirmSubmitModal';

export const SubmitForm = (props: {
  state: State;
  dispatch: React.Dispatch<Action>;
}) => {
  const options: any = useFirestoreData({
    path: firestoreDocumentPaths.not_at_homes,
  });

  const suburbOptions = [
    ...(options?.suburb_options?.map((suburb: Suburb) => {
      return { text: suburb.name, value: suburb.bbox };
    }) || []),
    { text: 'ADD NEW SUBURB', value: 'new' },
  ];

  const streetOptions = [
    ...(!!props.state.suburb && options?.street_options
      ? options?.street_options
          .filter((street: any) => street.suburb === props.state.suburb)
          .map((street: any) => {
            return { text: street.name, value: street };
          })
      : []),
    { text: 'ADD NEW STREET', value: 'new' },
  ];

  const handleSuburbSelect = ({ text, value }: any) => {
    if (value === 'new') {
      props.dispatch({ type: 'SET_MODAL', payload: 'add-suburb' });
      return;
    }

    props.dispatch({
      type: 'SET_SUBURB',
      payload: {
        suburb: text,
        bbox: value,
      },
    });
  };

  const handleStreetSelect = ({ value }: any) => {
    if (value === 'new') {
      props.dispatch({ type: 'SET_MODAL', payload: 'add-street' });
      return;
    }

    props.dispatch({
      type: 'SET_STREET',
      payload: {
        street: value.name,
        streetCoords: [value.lng, value.lat],
        suburb: props.state.suburb,
        bbox: props.state.bbox,
      },
    });
  };

  const handleHouseNumberInput = (e: any) =>
    props.dispatch({
      type: 'SET_HOUSE_NUMBER',
      payload: e.target.value as string,
    });

  const handleUnitNumberInput = (e: any) =>
    props.dispatch({
      type: 'SET_UNIT_NUMBER',
      payload: e.target.value as string,
    });

  const handleSearch = async () => {
    props.dispatch({ type: 'SET_MODAL', payload: 'submit' });

    try {
      const coords = await getAddressCoords({
        houseNumber: props.state.houseNumber,
        street: props.state.street,
        suburb: props.state.suburb,
        bbox: props.state.bbox as [number, number, number, number],
        proximity: props.state.streetCoords as [number, number],
      });

      props.dispatch({ type: 'SET_COORDS', payload: coords });
    } catch (error) {
      console.error('Error getting address coordinates:', error);
    }
  };

  return (
    <>
      <IonList inset>
        <IonListHeader>
          <IonLabel>Address</IonLabel>
        </IonListHeader>

        <Picker
          value={props.state.suburb}
          label="Suburb"
          options={suburbOptions}
          onSelect={handleSuburbSelect}
        ></Picker>

        <Picker
          value={props.state.street}
          disabled={props.state.suburb.length === 0}
          label="Street"
          options={streetOptions}
          onSelect={handleStreetSelect}
        ></Picker>

        {/* TODO right justify input values
         */}
        <IonItem disabled={props.state.street.length === 0}>
          <IonInput
            value={props.state.houseNumber}
            label="House"
            clearInput={true}
            onIonInput={handleHouseNumberInput}
          ></IonInput>
        </IonItem>

        <IonItem disabled={props.state.houseNumber.length === 0}>
          <IonInput
            value={props.state.unitNumber}
            label="Unit"
            clearInput={true}
            onIonInput={handleUnitNumberInput}
          ></IonInput>
        </IonItem>
      </IonList>

      <IonButton
        className="ion-padding"
        style={{
          marginTop: '2rem',
        }}
        disabled={props.state.houseNumber.length === 0}
        expand="block"
        onClick={handleSearch}
      >
        Search
      </IonButton>
      <ConfirmSubmitModal state={props.state} dispatch={props.dispatch} />
    </>
  );
};

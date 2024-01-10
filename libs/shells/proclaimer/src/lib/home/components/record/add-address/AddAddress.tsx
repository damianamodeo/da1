import {
  StreetOption,
  firestoreDocumentPaths,
  writeFirebaseDoc,
} from '@data-firebase';
import { Bbox, useSearchStreet } from '@data-mapbox';
import { DocumentData } from 'firebase/firestore';
import { Reducer, useReducer } from 'react';
import { SubmitForm } from './components/SubmitForm';
import { ConfirmSubmitModal } from './components/ConfirmSubmitModal';
import { AddNewSuburbModal } from './components/AddNewSuburbModal';
import { AddNewStreetModal } from './components/AddNewStreetModal';

// TYPES
export type Suburb = {
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

export const AddAddress = (): JSX.Element => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, initialState());

  return (
    <div className="ion-padding">
      <SubmitForm state={state} dispatch={dispatch} />
      <ConfirmSubmitModal state={state} dispatch={dispatch} />
      <AddNewSuburbModal
        suburb={state.suburb}
        state={state}
        dispatch={dispatch}
      />
      <AddNewStreetModal state={state} dispatch={dispatch} />
    </div>
  );
};

export default AddAddress;

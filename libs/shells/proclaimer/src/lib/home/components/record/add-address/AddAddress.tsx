import { Reducer, useReducer } from 'react';
import { SubmitForm } from './components/SubmitForm';
import { ConfirmSubmitModal } from './components/ConfirmSubmitModal';
import { AddNewSuburbModal } from './components/AddNewSuburbModal';
import { AddNewStreetModal } from './components/AddNewStreetModal';

export type Suburb = {
  name: string;
  bbox: [number, number, number, number];
};

type Coords = {
  lat: number;
  lng: number;
  relevance: number;
};

export type Action =
  | {
      type: 'SET_SUBURB';
      payload: { suburb: string; bbox: [number, number, number, number] };
    }
  | {
      type: 'SET_STREET';
      payload: {
        street: string;
        streetCoords: [number, number];
        suburb: string;
      };
    }
  | { type: 'SET_HOUSE_NUMBER'; payload: string }
  | { type: 'SET_UNIT_NUMBER'; payload: string }
  | { type: 'SET_SEARCH_STRING'; payload: string }
  | { type: 'ON_SEARCH'; payload: Coords }
  | { type: 'OPEN_SUBMIT_MODAL' }
  | { type: 'ON_SUBMIT' }
  | { type: 'CLOSE_SUBMIT_MODAL' }
  | { type: 'SET_LETTER_LIST'; payload: boolean };

const initialState = {
  suburb: '',
  bbox: [0, 0, 0, 0] as [number, number, number, number],
  street: '',
  streetCoords: [0, 0],
  houseNumber: '',
  unitNumber: '',
  coords: {
    lat: 0,
    lng: 0,
    relevance: 0,
  },
  submitModal: false,
  loading: false,
  searchString: '',
  sendToLetterList: false,
};
const stateInitialiser = () => {
  return localStorage.getItem('not-at-home-state')
    ? JSON.parse(localStorage.getItem('not-at-home-state') || '')
    : initialState;
};

export type State = typeof initialState;

const reducer = (state: State, action: Action): State => {
  let newState: State = state;
  switch (action.type) {
    case 'SET_SUBURB':
      newState = {
        ...state,
        suburb: action.payload.suburb,
        street: '',
        houseNumber: '',
        unitNumber: '',
        bbox: action.payload.bbox,
      };
      break;
    case 'SET_STREET':
      newState = {
        ...state,
        suburb: action.payload.suburb,
        street: action.payload.street,
        streetCoords: action.payload.streetCoords,
        houseNumber: '',
        unitNumber: '',
      };
      break;
    case 'SET_HOUSE_NUMBER':
      newState = {
        ...state,
        houseNumber: action.payload,
        unitNumber: '',
      };
      break;
    case 'SET_UNIT_NUMBER':
      newState = { ...state, unitNumber: action.payload };
      break;
    case 'OPEN_SUBMIT_MODAL':
      newState = { ...state, submitModal: true };
      break;
    case 'ON_SEARCH':
      newState = {
        ...state,
        loading: false,
        coords: action.payload,
        sendToLetterList: false,
      };
      break;
    case 'CLOSE_SUBMIT_MODAL':
      newState = {
        ...state,
        submitModal: false,
        loading: false,
        sendToLetterList: false,
      };
      break;
    case 'ON_SUBMIT':
      newState = {
        ...state,
        submitModal: false,
        loading: false,
        sendToLetterList: false,
        ...(state.unitNumber ? { unitNumber: '' } : { houseNumber: '' }),
      };
      break;
    case 'SET_SEARCH_STRING':
      newState = { ...state, searchString: action.payload };
      break;
    case 'SET_LETTER_LIST':
      newState = { ...state, sendToLetterList: action.payload };
      break;
  }
  localStorage.setItem('not-at-home-state', JSON.stringify(newState));
  return newState;
};

export const AddAddress = (): JSX.Element => {
  const [state, dispatch]: [State, React.Dispatch<Action>] = useReducer<
    Reducer<State, Action>
  >(reducer, stateInitialiser());
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

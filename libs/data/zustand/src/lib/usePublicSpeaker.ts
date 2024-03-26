import { create } from 'zustand';
import { createSelectors } from '@util';
import { persist, createJSONStorage } from 'zustand/middleware';

type PublicSpeakerState = {
  brother: {
    firstName: string;
    lastName: string;
    displayName: string;
    congregation: string;
    email: string;
    phone: string;
  };
};

type PublicSpeakerActions = {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setDisplayName: (value: string) => void;
  setCongregation: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
};

const usePublicSpeakerBase = create<
  PublicSpeakerState & PublicSpeakerActions
>()(
  persist(
    (set) => ({
      brother: {
        firstName: '',
        lastName: '',
        displayName: '',
        congregation: '',
        email: '',
        phone: '',
      },
      setFirstName: (firstName: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, firstName },
        })),
      setLastName: (lastName: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, lastName },
        })),
      setDisplayName: (displayName: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, displayName },
        })),
      setCongregation: (congregation: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, congregation },
        })),
      setEmail: (email: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, email },
        })),
      setPhone: (phone: string) =>
        set((state: PublicSpeakerState) => ({
          brother: { ...state.brother, phone },
        })),
    }),
    {
      name: 'public-speaker', // name of the item in the storage (must be unique)
    }
  )
);

export const usePublicSpeaker = createSelectors(usePublicSpeakerBase);

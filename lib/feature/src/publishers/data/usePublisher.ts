import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '@util';

type PublisherState = {
  publisher: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    displayName: string;
  };
};

type PublisherActions = {
  setPublisher: (publisher: any) => void;
  setPublisherProperty: (property: string, value: string) => void;
};

const usePublisherBase = create<PublisherState & PublisherActions>()(
  persist(
    (set) => ({
      publisher: {
        id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        displayName: '',
      },

      setPublisher: ({
        id,
        displayName,
        firstName,
        middleName,
        lastName,
      }: any) =>
        set(() => ({
          publisher: { id, displayName, firstName, middleName, lastName },
        })),

      setPublisherProperty: (property: string, value: string) =>
        set((state: PublisherState) => ({
          publisher: { ...state.publisher, [property]: value },
        })),
    }),
    {
      name: 'publisher', // name of the item in the storage (must be unique)
    }
  )
);

export const usePublisher = createSelectors(usePublisherBase);

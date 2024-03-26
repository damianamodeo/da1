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
  setPublisher: (property: string, value: string) => void;
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
      setPublisher: (property: string, firstName: string) =>
        set((state: PublisherState) => ({
          publisher: { ...state.publisher, [property]: firstName },
        })),
    }),
    {
      name: 'Publisher', // name of the item in the storage (must be unique)
    }
  )
);

export const usePublisher = createSelectors(usePublisherBase);

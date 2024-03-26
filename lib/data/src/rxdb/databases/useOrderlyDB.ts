import { create } from 'zustand';
import { createSelectors, initOrderlyDB } from '@data';

type OrderlyDBState = {
  db: any;
};

type OrderlyDBActions = {
  init: () => void;
};

const useOrderlyDBBase = create<OrderlyDBState & OrderlyDBActions>((set) => ({
  db: null,
  init: async () => {
    const database = await initOrderlyDB();

    set({ db: database });
  },
}));

export const useOrderlyDB = createSelectors(useOrderlyDBBase);

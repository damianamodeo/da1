import { create, StoreApi, UseBoundStore } from 'zustand';

const useBrotherStore = create((set) => ({
  firstName: '',
  lastName: '',
  displayName: '',
  congregation: '',
  email: '',
  phone: '',
  setFirstName: (firstName: string) => set({ firstName }),
  setLastName: (lastName: string) => set({ lastName }),
  setDisplayName: (displayName: string) => set({ displayName }),
  setCongregation: (congregation: string) => set({ congregation }),
  setEmail: (email: string) => set({ email }),
  setPhone: (phone: string) => set({ phone }),
}));



import { create } from "zustand";

interface AuthStore {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isSignInModalOpen: false,
  isSignUpModalOpen: false,
  openSignInModal: () => set({ isSignInModalOpen: true, isSignUpModalOpen: false }),
  closeSignInModal: () => set({ isSignInModalOpen: false }),
  openSignUpModal: () => set({ isSignUpModalOpen: true, isSignInModalOpen: false }),
  closeSignUpModal: () => set({ isSignUpModalOpen: false }),
}));

import { create } from "zustand";

export enum LayoutModal {
  UpsertBookmark = "isUpsertBookmarkModalOpen",
}

type LayoutModalState = Record<LayoutModal, boolean>;

interface LayoutModalActions {
  toggleModal: (modal: LayoutModal) => void;
}

const initialLayoutModalState: LayoutModalState = Object.values(
  LayoutModal
).reduce((acc, modal) => {
  acc[modal] = false;
  return acc;
}, {} as LayoutModalState);

const useModalStore = create<LayoutModalState & LayoutModalActions>()(
  (set) => ({
    ...initialLayoutModalState,
    toggleModal: (modal) =>
      set((state) => ({
        ...state,
        [modal]: !state[modal],
      })),
  })
);

export default useModalStore;

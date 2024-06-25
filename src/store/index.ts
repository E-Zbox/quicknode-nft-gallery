import { create } from "zustand";
// api/interface
import { INFTCollectionDetail, INFTDetail } from "@/api/interface";

interface ISearchStore {
  inCenterPosition: boolean;
  toggleInCenterPosition: () => void;
  loading: boolean;
  setLoading: (newState: boolean) => void;
  previousSearch: string[];
  updatePreviousSearch: (updateState: string) => void;
  setPreviousSearch: (newState: string[]) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  inCenterPosition: true,
  toggleInCenterPosition: () =>
    set((store) => ({ inCenterPosition: !store.inCenterPosition })),
  loading: false,
  setLoading: (newState: boolean) => set({ loading: newState }),
  previousSearch: [],
  updatePreviousSearch: (updateState: string) =>
    set((store) => ({
      previousSearch: Array.from(
        new Set([updateState, ...store.previousSearch])
      ),
    })),
  setPreviousSearch: (newState: string[]) => set({ previousSearch: newState }),
}));

interface INFTCollectionDetailRecord {
  [name: string]: INFTCollectionDetail;
}

interface INFTDetailRecord {
  [name: string]: INFTDetail[];
}

interface INFTDetailStore {
  nftCollectionDetailState: INFTCollectionDetailRecord;
  updateNFTCollectionDetailState: (
    updateState: INFTCollectionDetailRecord
  ) => void;
  nftDetailState: INFTDetailRecord;
  updateNFTDetailState: (updateState: INFTDetailRecord) => void;
  selectedNFT: string;
  setSelectedNFT: (newState: string) => void;
}

export const useNFTDetailStore = create<INFTDetailStore>((set) => ({
  nftCollectionDetailState: {},
  updateNFTCollectionDetailState: (updateState: INFTCollectionDetailRecord) =>
    set((store) => ({
      nftCollectionDetailState: {
        ...store.nftCollectionDetailState,
        ...updateState,
      },
    })),
  nftDetailState: {},
  updateNFTDetailState: (updateState: INFTDetailRecord) =>
    set((store) => ({
      nftDetailState: { ...store.nftDetailState, ...updateState },
    })),
  selectedNFT: "",
  setSelectedNFT: (newState: string) => set({ selectedNFT: newState }),
}));

interface IErrorStore {
  errorMessage: string;
  setErrorMessage: (newState: string) => void;
}

export const useErrorStore = create<IErrorStore>((set) => ({
  errorMessage: "",
  setErrorMessage: (newState: string) => set({ errorMessage: newState }),
}));

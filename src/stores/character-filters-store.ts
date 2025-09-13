import type { CharacterStatus } from '@/api/character';
import { create } from 'zustand';

type FiltersState = {
  searchString: string;
  status: CharacterStatus | string;
  pageSize: number;
  setStatus: (status: string) => void;
  setPageSize: (pageSize: number) => void;
  setSearchString: (searchString: string) => void;
  getFiltersState: () => FiltersState;
  resetFilters: () => void;
};

const initFiltersState = {
  searchString: '',
  status: '',
  pageSize: 5,
};

export const useCharactersFiltersStore = create<FiltersState>()((set, get) => ({
  ...initFiltersState,
  getFiltersState: () => get(),
  setStatus: (status: string) => set((state) => ({ ...state, status })),
  setPageSize: (pageSize: number) => set((state) => ({ ...state, pageSize })),
  setSearchString: (searchString: string) =>
    set((state) => ({ ...state, searchString })),
  resetFilters: () => set((state) => ({ ...state, ...initFiltersState })),
}));

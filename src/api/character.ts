import { useQuery } from '@tanstack/react-query';

export type Info = { count: number; next: string; pages: number; prev: number };

export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterGender = 'Male' | 'Female' | 'Genderless' | 'unknown';

export type CharacterOrigin = {
  name: string;
  url: string;
};

export type CharacterLocation = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: CharacterOrigin;
  location: CharacterLocation;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type GetCharactersResponse = {
  info: Info;
  results: Character[];
};

const getCharacters = async (): Promise<GetCharactersResponse> => {
  const response = await fetch('https://rickandmortyapi.com/api/character');

  return response.json();
};

export const useGetCharactersQuery = () =>
  useQuery({
    queryKey: ['characters'],
    queryFn: getCharacters,
  });

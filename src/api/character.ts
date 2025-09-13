import { keepPreviousData, useQuery } from '@tanstack/react-query';

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
  error?: string;
};

export type GetCharactersRequest = {
  searchString?: string;
  status?: CharacterStatus | string;
};

const buildQueryParams = ({ searchString, status }: GetCharactersRequest) => {
  const params: string[] = [];

  if (searchString && searchString !== '') params.push(`name=${searchString}`);

  if (status) params.push(`status=${status}`);

  return params.join('&');
};

const getCharacters = async (
  charactersRequest: GetCharactersRequest,
): Promise<GetCharactersResponse> => {
  const params = buildQueryParams(charactersRequest);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character${
      params.length > 0 ? `?${params}` : ''
    }`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `No results found for: ${charactersRequest.searchString}`,
      );
    }

    throw new Error(`api/character request failed with ${response.status}`);
  }

  return response.json();
};

export const useGetCharactersQuery = (
  charactersRequest: GetCharactersRequest,
) =>
  useQuery({
    queryKey: ['characters', charactersRequest],
    queryFn: () => getCharacters(charactersRequest),
    placeholderData: keepPreviousData,
  });

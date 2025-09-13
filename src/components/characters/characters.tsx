import { useGetCharactersQuery } from '@/api/character';
import useUpdateSearch from '@/hooks/useUpdateSearch';
import { useCharactersFiltersStore } from '@/stores/character-filters-store';
import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';
import ActionBar from './action-bar';
import CharactersTable from './characters-table';
import useCharactersColumns from './columns';

const Characters = () => {
  const { getFiltersState, setSearchString, setStatus, setPageSize } =
    useCharactersFiltersStore((state) => state);

  const search = useSearch({ from: '/' });

  useEffect(() => {
    if (search.status) setStatus(search.status);
    if (search.pageSize) setPageSize(Number(search.pageSize));
    if (search.searchString)
      setSearchString(decodeURIComponent(search.searchString));
  }, [search.searchString, search.status, search.pageSize]);

  const { searchString, status, pageSize } = getFiltersState();

  useUpdateSearch({ searchString, status, pageSize });

  const { data, isFetching, refetch } = useGetCharactersQuery({
    searchString,
    status,
  });

  const columns = useCharactersColumns();

  return (
    <>
      <ActionBar isFetching={isFetching} refetch={refetch} />

      {data && data.results && (
        <CharactersTable columns={columns} data={data.results} />
      )}
    </>
  );
};

export default Characters;

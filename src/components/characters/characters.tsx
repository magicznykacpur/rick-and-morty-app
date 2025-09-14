import { useGetCharactersQuery } from '@/api/character';
import useSetFromSearch from '@/hooks/useSetFromSearch';
import useUpdateSearch from '@/hooks/useUpdateSearch';
import { useCharactersFiltersStore } from '@/stores/character-filters-store';
import ActionBar from './action-bar';
import CharactersTable from './characters-table';
import useCharactersColumns from './columns';

const Characters = () => {
  const { getFiltersState, setSearchString, setStatus, setPageSize } =
    useCharactersFiltersStore((state) => state);

  useSetFromSearch({ setSearchString, setStatus, setPageSize });

  const { searchString, status, pageSize } = getFiltersState();

  useUpdateSearch({ searchString, status, pageSize });

  const { data, isLoading, isFetching, refetch } = useGetCharactersQuery({
    searchString,
    status,
  });

  const columns = useCharactersColumns();

  return (
    <>
      <ActionBar isFetching={isFetching} refetch={refetch} />

      {!data && !isLoading && (
        <div className="flex flex-col my-8">
          <span className="text-2xl ">No results found for query:</span>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-1">
              <span>Searching for:</span>
              <strong>{searchString}</strong>
            </div>
            <span className="flex gap-1">
              <span>With status:</span>
              <strong>{status ? status : 'no status selected'}</strong>
            </span>
          </div>
        </div>
      )}

      {data && data.results && (
        <CharactersTable columns={columns} data={data.results} />
      )}
    </>
  );
};

export default Characters;

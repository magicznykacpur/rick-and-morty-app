import { useGetCharactersQuery } from '@/api/character';
import { Skeleton } from '@/components/ui/skeleton';
import CharactersTable from './characters-table';
import useCharactersColumns from './columns';
import ActionBar from './action-bar';
import { useCharactersFiltersStore } from '@/stores/character-filters-store';

const Characters = () => {
  const { getFiltersState } = useCharactersFiltersStore((state) => state);
  const { searchString, status, pageSize } = getFiltersState();

  const { data, isLoading, isFetching } = useGetCharactersQuery({
    searchString,
    status,
  });
  const columns = useCharactersColumns();

  return (
    <>
      {isLoading && (
        <Skeleton className="bg-black animate-pulse w-full h-screen" />
      )}

      <ActionBar isFetching={isFetching} />

      {data && data.results && (
        <CharactersTable columns={columns} data={data.results} pageSize={pageSize}/>
      )}
    </>
  );
};

export default Characters;

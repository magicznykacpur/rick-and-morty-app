import { useGetCharactersQuery } from '@/api/character';
import { Skeleton } from '@/components/ui/skeleton';
import CharactersTable from './characters-table';
import useCharactersColumns from './columns';

const Characters = () => {
  const { data, isLoading } = useGetCharactersQuery();
  const columns = useCharactersColumns();

  return (
    <>
      {isLoading && <Skeleton className="bg-black animate-pulse w-full h-screen" />}

      {data && data.results && (
        <CharactersTable columns={columns} data={data.results} />
      )}
    </>
  );
};

export default Characters;

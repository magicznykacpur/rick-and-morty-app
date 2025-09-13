import { useSearch } from '@tanstack/react-router';
import { useEffect } from 'react';

type SetFromSearch = {
  setStatus: (value: string) => void;
  setPageSize: (value: number) => void;
  setSearchString: (value: string) => void;
};

const useSetFromSearch = ({
  setStatus,
  setPageSize,
  setSearchString,
}: SetFromSearch) => {
  const search = useSearch({ from: '/' });

  useEffect(() => {
    if (search.status) setStatus(search.status);
    if (search.pageSize) setPageSize(Number(search.pageSize));
    if (search.searchString)
      setSearchString(decodeURIComponent(search.searchString));
  }, [search.searchString, search.status, search.pageSize]);
};

export default useSetFromSearch;

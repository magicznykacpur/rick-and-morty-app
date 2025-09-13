import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const useUpdateSearch = ({
  searchString,
  status,
  pageSize,
}: {
  searchString: string;
  status: string;
  pageSize: number;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      to: '/',
      search: {
        searchString: encodeURIComponent(searchString),
        status,
        pageSize,
      },
    });
  }, [searchString, status, pageSize]);
};

export default useUpdateSearch;

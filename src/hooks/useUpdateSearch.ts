import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

type UpdateSearch = {
  searchString: string;
  status: string;
  pageSize: number;
};

const useUpdateSearch = ({ searchString, status, pageSize }: UpdateSearch) => {
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

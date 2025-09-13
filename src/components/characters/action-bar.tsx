import { useCharactersFiltersStore } from '@/stores/character-filters-store';
import { SelectValue } from '@radix-ui/react-select';
import { Loader2 } from 'lucide-react';
import { type ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

type ActionBarProps = {
  isFetching: boolean;
  refetch: () => void
};

const ActionBar = ({ isFetching, refetch}: ActionBarProps) => {
  const { getFiltersState, setSearchString, setStatus, resetFilters } =
    useCharactersFiltersStore((state) => state);

  const { status, searchString } = getFiltersState();

  const onSearchChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchString(event.target.value);
    },
    500,
  );

  const onStatusChange = (status: string) => {
    setStatus(status);
  };

  return (
    <div className="relative flex gap-8 mb-8">
      <Input
        placeholder={searchString !== '' ? searchString : 'Search by name...'}
        className="w-64"
        onChange={onSearchChange}
        disabled={isFetching}
      />

      <Select onValueChange={onStatusChange} value={status}>
        <SelectTrigger className="w-32" disabled={isFetching}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="secondary" onClick={refetch} disabled={isFetching}>
        Refresh data
      </Button>

      <Button variant="secondary" onClick={resetFilters} disabled={isFetching}>
        Reset filters
      </Button>

      {isFetching && (
        <Loader2 size={32} className="absolute -right-16 animate-spin" />
      )}
    </div>
  );
};

export default ActionBar;

import { SelectValue } from '@radix-ui/react-select';
import { useState, type ChangeEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

const initFilters = {
  searchString: '',
  status: '',
  pageSize: 1,
};

const ActionBar = () => {
  const [filters, setFilters] = useState(() => initFilters);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchString: event.target.value });
  };

  const onStatusChange = (status: string) => {
    setFilters({ ...filters, status });
  };

  const onPageSizeChange = (pageSize: string) => {
    setFilters({ ...filters, pageSize: Number(pageSize) });
  };

  const resetFilters = () => setFilters(initFilters);

  return (
    <div className="flex gap-8 mb-8">
      <Input
        placeholder="Search by name..."
        onChange={onSearchChange}
        value={filters.searchString}
      />

      <Select onValueChange={onStatusChange} value={filters.status}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alive">Alive</SelectItem>
          <SelectItem value="dead">Dead</SelectItem>
          <SelectItem value="unknown">Unknown</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={onPageSizeChange} value={String(filters.pageSize)}>
        <SelectTrigger>
          <SelectValue placeholder="Page Size" />
        </SelectTrigger>
        <SelectContent className="max-h-[500px]">
          {[...Array(50)].map((_, index) => (
            <SelectItem key={index} value={`${index + 1}`}>
              {index + 1}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="secondary" onClick={resetFilters}>
        Reset filters
      </Button>
    </div>
  );
};

export default ActionBar;

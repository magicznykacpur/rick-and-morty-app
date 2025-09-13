import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PageSizeSelectProps = { value: number; onChange: (value: string) => void };

const PageSizeSelect = React.memo(
  ({ value, onChange }: PageSizeSelectProps) => (
    <Select onValueChange={onChange} value={String(value)}>
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
  ),
);

export default PageSizeSelect;

import type { Character } from '@/api/character';
import { Button } from '@/components/ui/button';
import { toShortDate } from '@/lib/date';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';

const useCharactersColumns = () => {
  const renderSortableColumn = (
    accessorKey: keyof Character,
    label: string,
    options: {
      className?: string;
      cell?: ({ row }: { row: Row<Character> }) => ReactNode;
    } = {className: 'min-w-[300px]'},
  ): ColumnDef<Character> => ({
    accessorKey,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className='pl-0!'
        onClick={() => {
            console.log('sortin')
            column.toggleSorting(column.getIsSorted() === 'asc')
        }}
      >
        {label}
        <ChevronsUpDown />
      </Button>
    ),
    enableSorting: true,
    ...(options.cell && { cell: options.cell }),
  });

  return useMemo(
    (): ColumnDef<Character>[] => [
      renderSortableColumn('name', 'Name'),
      renderSortableColumn('status', 'Status'),
      renderSortableColumn('species', 'Species'),
      renderSortableColumn('type', 'Type', {
        cell: ({ row }) => {
          const type = row.original.type;

          return type === '' ? <span>Unknown</span> : <span>{type}</span>;
        },
      }),
      renderSortableColumn('gender', 'Gender'),
      renderSortableColumn('origin', 'Origin', {
        cell: ({ row }) => <span>{row.original.origin.name}</span>,
      }),
      renderSortableColumn('location', 'Location', {
        cell: ({ row }) => <span>{row.original.location.name}</span>,
      }),
      renderSortableColumn('image', 'Image', {
        cell: ({ row }) => (
          <img className="rounded-md w-[62px]" src={row.original.image} />
        ),
      }),
      renderSortableColumn('url', 'URL', {
        cell: ({ row }) => (
          <a href={row.original.url} className="text-blue-400 cursor-pointer">
            {row.original.url}
          </a>
        ),
      }),
      renderSortableColumn('created', 'Created', {
        cell: ({ row }) => <span>{toShortDate(row.original.created)}</span>,
      }),
    ],
    [],
  );
};

export default useCharactersColumns;

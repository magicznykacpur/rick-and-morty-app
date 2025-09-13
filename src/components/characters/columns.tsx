import type { Character } from '@/api/character';
import { Button } from '@/components/ui/button';
import { toShortDate } from '@/lib/date';
import { Link } from '@tanstack/react-router';
import type { ColumnDef, Row } from '@tanstack/react-table';
import { ChevronsUpDown } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';

const useCharactersColumns = () => {
  const renderSortableColumn = (
    accessorKey: keyof Character,
    label: string,
    options: {
      cell?: ({ row }: { row: Row<Character> }) => ReactNode;
    } = {},
  ): ColumnDef<Character> => ({
    accessorKey,
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="pl-0!"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === 'asc');
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
      renderSortableColumn('name', 'Name', {
        cell: ({ row }) => {
          const name = row.original.name;

          return (
            <Link
              to="/character/$id"
              params={{ id: row.original.id }}
              className="cursor-pointer dark:text-white text-black"
            >
              {name}
            </Link>
          );
        },
      }),
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
          <img className="rounded-full w-[62px]" src={row.original.image} />
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

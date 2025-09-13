import { useGetCharacterQuery } from '@/api/character';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { toShortDate } from '@/lib/date';
import { cn } from '@/lib/utils';
import { useCanGoBack, useNavigate, useParams } from '@tanstack/react-router';
import { ChevronsUpDown, Loader2 } from 'lucide-react';

const Character = () => {
  const { id } = useParams({ from: '/character/$id' });

  const { data, isLoading } = useGetCharacterQuery(Number(id));

  const navigate = useNavigate();
  const canGoBack = useCanGoBack();

  const onGoBackClick = () => {
    if (canGoBack) navigate({ to: '/' });
  };

  return (
    <>
      <Button size="lg" className="mb-8" onClick={onGoBackClick}>
        Go back
      </Button>

      {isLoading && <Loader2 size={54} className="animate-spin my-24" />}

      {data && (
        <Card className="w-[400px] md:w-[600px]">
          <CardHeader className="mb-12">
            <CardTitle className="text-2xl">{data.name}</CardTitle>
            <CardDescription className="relative">
              <div className="flex flex-col text-base">
                <div className="flex gap-2">
                  <strong>From:</strong>
                  <span>{data.origin.name}</span>
                </div>
                <div className="flex gap-2">
                  <strong>Created:</strong>
                  <span>{toShortDate(data.created)}</span>
                </div>
              </div>
              <img
                src={data.image}
                className="absolute w-[132px] -top-9 rounded-full justify-self-end"
              />
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex gap-2">
              <strong>Status:</strong>
              <span>{data.status}</span>
            </div>
            <div className="flex gap-2">
              <strong>Species:</strong>
              <span>{data.species}</span>
            </div>
            <div className="flex gap-2">
              <strong>Gender:</strong>
              <span>{data.gender}</span>
            </div>
            <div className="flex gap-2 mb-2">
              <strong>Location:</strong>
              <span>{data.location.name}</span>
            </div>

            <Collapsible>
              <div className="flex items-center justify-between gap-4 border-2 p-4 rounded-md">
                <strong>Episodes</strong>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="cursor-pointer">
                    <ChevronsUpDown />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent
                className={cn(
                  'flex flex-col border-2 rounded-md gap-2 h-[300px] overflow-y-scroll first:pt-0',
                  '[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-300 [&::-webkit-scrollbar-thumb]:bg-gray-500',
                )}
              >
                {data.episode.map((value) => (
                  <a
                    href={value}
                    target="_blank"
                    className="py-4 px-3 hover:bg-accent font-semibold"
                  >
                    {value}
                  </a>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Character;

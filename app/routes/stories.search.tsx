import { Prisma } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import StoryCard from '~/components/StoryCard';
import { getStoriesBySearch } from '~/utils/stories.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');

  const stories = await getStoriesBySearch(decodeURIComponent(query as string));

  return json({ stories });
};

export default function SeatchStories() {
  const { stories = [] } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="md:text-2xl text-lg font-bold my-5">Поиск</h2>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {stories.map((story: Prisma.StoryUncheckedCreateInput) => (
          <Link key={story.id} to={`/stories/${story.id}`}>
            <StoryCard
              firstName={story.firstName}
              secondName={story.secondName}
              lastName={story.lastName as string}
              photo={story.photo as string}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

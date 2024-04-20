import { Prisma } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';
import StoryCard from '~/components/StoryCard';
import { getRecentStories, getStories } from '~/utils/stories.server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const sort = url.searchParams.get('sort') || 'lastName';

  const stories = await getStories(sort);
  const recentStories = await getRecentStories();

  return json({ stories, recentStories });
};

export default function Stories() {
  const { stories, recentStories, sort } = useLoaderData<typeof loader>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <h2 className="text-3xl font-bold my-5">Недавно добавленые</h2>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {recentStories.map((story: Prisma.StoryUncheckedCreateInput) => (
          <Link key={story.id} to={`/stories/${story.id}`}>
            <StoryCard
              id={story.id as string}
              firstName={story.firstName}
              secondName={story.secondName}
              lastName={story.lastName}
              photo={story.photo}
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold my-5">Все истории Бессмертного полка</h2>
        <select
          name="sort"
          id="sort"
          onChange={(e) => {
            setSearchParams({ sort: e.target.value });
          }}
          value={sort}
          className="p-2 rounded border border-slate-300">
          <option value="first">С начала</option>
          <option value="last">С конца</option>
          <option value="alphabet">По алфавиту</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        {stories.map((story: Prisma.StoryUncheckedCreateInput) => (
          <Link key={story.id} to={`/stories/${story.id}`}>
            <StoryCard
              id={story.id as string}
              firstName={story.firstName}
              secondName={story.secondName}
              lastName={story.lastName}
              photo={story.photo}
            />
          </Link>
        ))}
      </div>
    </>
  );
}

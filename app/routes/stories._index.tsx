import { Prisma } from '@prisma/client';
import { json, LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import StoryCard from '~/components/StoryCard';
import { getRecentStories, getStories } from '~/utils/stories.server';

export const loader: LoaderFunction = async () => {
  const stories = await getStories();
  const recentStories = await getRecentStories();

  return json({ stories, recentStories });
};

export default function Stories() {
  const { stories, recentStories } = useLoaderData<typeof loader>();

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

      <h2 className="text-2xl font-bold my-5">Все истории Бессмертного полка</h2>
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

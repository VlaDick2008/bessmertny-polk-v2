import { prisma } from './prisma.server';

export async function getStories() {
  const stories = await prisma.story.findMany({
    orderBy: {
      firstName: 'asc',
    },
  });
  return stories;
}

export async function getRecentStories() {
  const stories = await prisma.story.findMany({
    take: 4,
    orderBy: {
      createdAt: 'desc',
    },
  });
  return stories;
}

export async function getSingleStory(storyId: string) {
  const story = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
  });

  return story;
}

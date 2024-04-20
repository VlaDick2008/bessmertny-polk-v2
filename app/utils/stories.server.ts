import { Prisma } from '@prisma/client';
import { prisma } from './prisma.server';

export async function getStories(sort: string): Promise<Prisma.StoryUncheckedCreateInput[]> {
  let orderBy: Prisma.StoryOrderByWithRelationInput = {
    firstName: 'asc',
  };

  switch (sort) {
    case 'first':
      orderBy = { createdAt: 'asc' };
      break;
    case 'last':
      orderBy = { createdAt: 'desc' };
      break;
    case 'alphabet':
      orderBy = { firstName: 'asc' };
      break;
    default:
      break;
  }

  const stories = await prisma.story.findMany({
    orderBy,
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

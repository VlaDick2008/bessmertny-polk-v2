import { Prisma } from '@prisma/client';
import { prisma } from './prisma.server';
import { json } from '@remix-run/node';

export async function getStories(sort: string): Promise<Prisma.StoryUncheckedCreateInput[]> {
  try {
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
      where: {
        isVerified: true,
      },
      orderBy,
    });

    return stories;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getStoriesBySearch(query: string) {
  try {
    if (!query) {
      return json({ error: 'No query provided' });
    }
    const stories = await prisma.story.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            secondName: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    return stories;
  } catch (err) {
    console.log(err);
  }
}

export async function getRecentStories() {
  try {
    const stories = await prisma.story.findMany({
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return stories;
  } catch (err) {
    throw new Error(err as string);
  }
}

export async function getSingleStory(storyId: string) {
  try {
    if (!storyId) {
      return json({ error: 'No storyId provided' });
    }
    const story = await prisma.story.findUnique({
      where: {
        id: storyId,
      },
    });

    return story;
  } catch (err) {
    throw new Error(err as string);
  }
}

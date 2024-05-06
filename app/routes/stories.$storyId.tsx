import React from 'react';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import invariant from 'tiny-invariant';

import { getSingleStory } from '~/utils/stories.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Бессмертный полк' },
    {
      name: 'Влад, напиши тут описание, я не успеваю',
      content: 'Крутой сайт (вот ряльна)',
    },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.storyId, 'Missing contactId param');

  const story = await getSingleStory(params.storyId);

  return json({ story });
};

export default function Story() {
  const { story } = useLoaderData<typeof loader>();

  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-[367px] lg:h-[490px] w-[190px] h-[270px] rounded">
          <a href={story?.photo} target="_blank" rel="noreferrer">
            <img
              src={story?.photo as string}
              alt="mainPhoto"
              className="object-cover w-full h-full rounded"
            />
          </a>
        </div>
        <div>
          <div className="lg:text-5xl text-3xl">
            <p>{story?.firstName}</p>
            <p>{story?.secondName}</p>
            <p>{story?.lastName}</p>
          </div>
        </div>
      </div>
      {story?.aditionalPhotos.length ? (
        <div className="flex flex-wrap gap-2 mt-5 bg-stone-800 rounded p-2">
          {story?.aditionalPhotos.map((photo: string) => (
            <div key={photo} className="lg:w-[144px] lg:h-[200px] w-[100px] h-[160px] rounded">
              <a href={photo} target="_blank" rel="noreferrer">
                <img src={photo} className="object-cover w-full h-full rounded" alt="" />
              </a>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className="mt-5 text-xl"
        dangerouslySetInnerHTML={{ __html: story?.storyText as string }}></div>
      <footer key="footer" className="py-5 text-sm text-center text-gray-400">
        <p>История добавлена {new Date(story?.createdAt as string).toLocaleDateString('ru-RU')}</p>
      </footer>
    </div>
  );
}

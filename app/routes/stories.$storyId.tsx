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
      <div className=" flex gap-5">
        <div className="w-[367px] h-[490px]">
          <img src={story?.photo} alt="" className="object-cover w-full h-full" />
        </div>

        <div>
          <div className="text-5xl">
            <p>{story?.firstName}</p>
            <p>{story?.secondName}</p>
            <p>{story?.lastName}</p>
          </div>
        </div>
      </div>
      <div
        className="mt-5 text-xl"
        dangerouslySetInnerHTML={{ __html: story?.storyText as string }}></div>
    </div>
  );
}

import {
  ActionFunctionArgs,
  json,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import TextareaAutosize from 'react-textarea-autosize';

import Input from '~/components/UI/Input';
import { prisma } from '~/utils/prisma.server';
import { uploadImage } from '~/utils/cloudinary.server';
import React from 'react';

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    if (name !== 'photo') {
      return undefined;
    }
    const uploadedImage = await uploadImage(data);

    return uploadedImage.secure_url;
  }, unstable_createMemoryUploadHandler());

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const imgSource = formData.get('photo');
  const firstName = formData.get('firstName');
  const secondName = formData.get('secondName');
  const lastName = formData.get('lastName');
  const storyText = formData.get('storyText');

  const storyFormatedText = storyText?.toString().replaceAll('\n', '<br/>');
  const storyReadyText = storyFormatedText?.replaceAll('\r', '');

  if (!imgSource) {
    return json({
      error: 'Img source is not provided',
    });
  }

  await prisma.story.create({
    data: {
      firstName: firstName?.toString() as string,
      secondName: secondName?.toString() as string,
      lastName: lastName?.toString() as string,
      storyText: storyReadyText as string,
      photo: imgSource as string,
    },
  });

  return redirect('/stories');
};

export default function TellStory() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fetcher = useFetcher();

  React.useEffect(() => {
    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));

    return () => {
      URL.revokeObjectURL(previewUrl as string);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  console.log(fetcher.formData);

  return (
    <section className="pt-10 text-lg">
      <fetcher.Form
        method="post"
        className="flex flex-col gap-4 flex-1"
        encType="multipart/form-data">
        <div className="flex gap-3">
          <Input label="Имя" htmlFor="firstName" />
          <Input label="Фамилия" htmlFor="secondName" />
          <Input label="Отчество" htmlFor="lastName" />
        </div>

        <div className="w-full">
          <p>Ваша история</p>
          <TextareaAutosize
            className="w-full p-2 border outline-none border-slate-300 rounded focus:border-slate-400 resize-none"
            name="storyText"
          />
        </div>
        <p>Фото</p>
        <div className="flex items-end gap-5">
          {previewUrl && (
            <div className="w-[300px] h-[400px] border border-slate-300 p-3 rounded ">
              <img src={previewUrl} alt="preview" className="object-cover w-full h-full" />
            </div>
          )}
          <input
            type="file"
            name="photo"
            id="photo"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => setFile(e.target.files![0])}
            className="border border-slate-300 p-3 rounded file:p-3 file:w-40 file:outline-none file:mx-10 file:border file:border-red-700 file:bg-red-600 file:text-white file:text-xl file:rounded"
          />
        </div>

        <button
          type="submit"
          className="p-3 border border-red-700 bg-red-600 text-white text-xl rounded">
          {fetcher.formData ? 'Грузим...' : 'Отправить'}
        </button>
      </fetcher.Form>
    </section>
  );
}

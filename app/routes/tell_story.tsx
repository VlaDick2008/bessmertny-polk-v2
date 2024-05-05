import {
  ActionFunctionArgs,
  json,
  MetaFunction,
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

export const meta: MetaFunction = () => {
  return [
    { title: 'Бессмертный полк' },
    {
      name: 'Влад, напиши тут описание, я не успеваю',
      content: 'Крутой сайт (вот ряльна)',
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const uploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    // if (name !== 'photo') {
    //   return undefined;
    // }
    // const uploadedImage = await uploadImage(data);

    // return uploadedImage.secure_url;
    if (name === 'photo') {
      // Handle single image upload
      const result = await uploadImage(data);
      return result.secure_url; // Assuming 'secure_url' is part of the result from Cloudinary
    } else if (name === 'photos') {
      // Handle multiple image uploads
      const result = await uploadImage(data);
      return result.secure_url; // Assuming 'secure_url' is part of the result from Cloudinary
    }
  }, unstable_createMemoryUploadHandler());

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const imgSource = formData.get('photo');
  const multipleImages = formData.getAll('photos');
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
      aditionalPhotos: multipleImages as string[],
    },
  });

  return redirect('/stories');
};

export default function TellStory() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [aditionalPhotosPreview, setAditionalPhotosPreview] = React.useState<string[] | null>(null);
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

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const imageUrls = [];

    if (!files) {
      return;
    }

    // Create a URL for each selected file
    for (let i = 0; i < files.length; i++) {
      imageUrls.push(URL.createObjectURL(files[i]));
    }

    // Update state with new URLs to display them as preview
    setAditionalPhotosPreview(imageUrls);
  };

  return (
    <section className="pt-10 text-lg">
      <fetcher.Form
        method="post"
        className="flex flex-col gap-4 flex-1"
        encType="multipart/form-data">
        <div className="flex lg:flex-row flex-col gap-3">
          <Input label="Фамилия" htmlFor="firstName" />
          <Input label="Имя" htmlFor="secondName" />
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

        <p>Дополнительные фото</p>
        <div className="flex flex-col-reverse gap-5">
          <div className="flex flex-wrap gap-2 w-full h-full">
            {aditionalPhotosPreview?.map((imageUrl, index) => (
              <div key={index} className="w-[145px] h-[200px] border border-slate-300 p-1 rounded ">
                <img className="object-cover w-full h-full" src={imageUrl} alt="Preview" />
              </div>
            ))}
          </div>
          <input
            multiple
            type="file"
            name="photos"
            id="photos"
            accept="image/jpeg,image/png,image/gif"
            onChange={(e) => handleFilesChange(e)}
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

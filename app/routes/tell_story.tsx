import { ActionFunctionArgs, json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import TextareaAutosize from 'react-textarea-autosize';

import Input from '~/components/UI/Input';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const text = updates.story_text.toString().replaceAll('\n', '<br/>');

  return json({
    story_text: text,
  });
};

export default function TellStory() {
  return (
    <section className="pt-10 text-lg">
      <Form method="post" className="flex flex-col gap-4 flex-1">
        <div className="flex gap-3">
          <Input label="Имя" htmlFor="first_name" />
          <Input label="Фамилия" htmlFor="second_name" />
          <Input label="Отчество" htmlFor="last_name" />
        </div>

        <div className="w-full">
          <p>Ваша история</p>
          <TextareaAutosize
            className="w-full p-2 border outline-none border-slate-300 rounded focus:border-slate-400 resize-none"
            name="story_text"
          />
        </div>

        <div>Воооот сюда вьебать загрузку картинок</div>
        <button
          type="submit"
          className="p-2 border border-red-700 bg-red-600 text-white text-xl rounded">
          Отправить
        </button>
      </Form>
    </section>
  );
}

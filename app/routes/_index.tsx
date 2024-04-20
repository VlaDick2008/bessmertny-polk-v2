import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Бессмертный полк' },
    {
      name: 'Влад, напиши тут описание, я не успеваю',
      content: 'Крутой сайт (вот ряльна)',
    },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <img width={560} height={248} src="/logo.svg" alt="logo" className="mt-2" />
      <div className="w-full max-w-xl text-gray-800 border-gray-800 border-y">
        <Link
          className="flex flex-col gap-3 justify-center items-center p-2 text-2xl transition hover:text-gray-600"
          to="/stories">
          <span className="font-bold text-[56px] pt-3">78</span>
          <br />
          имён в летописи
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        <p>
          Мы чтим и бережно храним память о подвиге наших дедов и прадедов, бабушек и прабабушек.
          Расскажите о своем герое и примите участие в шествии Бессмертного полка средней школы № 2
          онлайн.
        </p>
        <p>
          Вы можете отправить свои материалы для размещения на сайте Бессмертного полка школы через
          специальную форму. Что бы перейти на неё, нажмите на &quot;Рассказать историю&quot; в
          шапке страницы.
        </p>
      </div>
    </div>
  );
}

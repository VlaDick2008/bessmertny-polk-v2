import { Link } from '@remix-run/react';

export default function Header() {
  return (
    <header className="flex gap-5 justify-center items-center py-1 w-full border-2 bg-slate-100 border-b-gray-200">
      <Link to="/">
        <img width={135} height={60} src="/logo.svg" alt="logo" />
      </Link>
      <Link className="text-xl" to="/stories">
        Истории
      </Link>
      <Link className="text-xl" to="/tell_story">
        Рассказать историю
      </Link>
      <div className="flex relative items-center">
        <input
          className="p-2 rounded-t border border-transparent border-b-black"
          type="text"
          placeholder="Найти историю..."
        />
        <img className="absolute right-3" src="/search_icon.svg" alt="search" />
      </div>
    </header>
  );
}

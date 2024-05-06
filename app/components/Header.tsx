import React from 'react';
import { Link } from '@remix-run/react';

import SearchInput from './UI/SearchInput';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="relative flex gap-5 lg:justify-center items-center lg:py-1 py-2 w-full border-2 bg-slate-100 border-b-gray-200">
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <Link to="/">
          <img width={135} height={60} src="/logo.svg" alt="logo" />
        </Link>
        <Link className="text-xl" to="/stories">
          Истории
        </Link>
        <Link className="text-xl" to="/tell_story">
          Рассказать историю
        </Link>
        <SearchInput />
      </div>

      <div className="flex lg:hidden justify-between w-full mx-5">
        <button
          className="flex flex-col justify-between w-8 h-6 my-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="block w-full h-1 bg-slate-800"></span>
          <span className="block w-full h-1 bg-slate-800"></span>
          <span className="block w-full h-1 bg-slate-800"></span>
        </button>
        <SearchInput />
      </div>
      <div
        className={`${
          isMenuOpen ? 'flex flex-col' : 'hidden'
        } absolute bg-slate-200 border-b-2 border-slate-400 top-14 w-full p-3 gap-2`}>
        <button onClick={() => setIsMenuOpen(false)}>
          <Link className="text-xl" to="/stories">
            Истории
          </Link>
        </button>
        <button onClick={() => setIsMenuOpen(false)}>
          <Link className="text-xl" to="/tell_story">
            Рассказать историю
          </Link>
        </button>
      </div>
    </header>
  );
}

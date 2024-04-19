import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import type { LinksFunction } from '@remix-run/node';
import stylesheet from '~/tailwind.css?url';
import Header from './components/Header';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap',
  },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="notranslate" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <main key="main">
      <section className="m-auto max-w-3xl">
        <Outlet />
      </section>

      <footer key="footer" className="py-5 text-sm text-center text-gray-400">
        <p>© МБОУ СШ №2 г. Вязьмы Смоленской обл., 2020-2024</p>
      </footer>
    </main>
  );
}

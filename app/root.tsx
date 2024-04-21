import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react';
import type { ActionFunction, LinksFunction } from '@remix-run/node';
import { register } from 'swiper/element/bundle';

import stylesheet from '~/tailwind.css?url';

import Header from './components/Header';

register();

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const query = formData.get('q');
  const convertedQuery = encodeURIComponent(query!.toString());

  return redirect(`/stories/search/?q=${convertedQuery}`);
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="notranslate" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          src="https://upload-widget.cloudinary.com/global/all.js"
          type="text/javascript"></script>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const navigation = useNavigation();
  return (
    <main key="main">
      <Header />
      <section
        className={`md:m-auto md:max-w-3xl mx-10 max-w-full ${
          navigation.state === 'loading' ? 'opacity-25 transition-opacity' : ''
        }`}>
        <Outlet />
      </section>

      <footer key="footer" className="py-5 text-sm text-center text-gray-400">
        <p>© МБОУ СШ №2 г. Вязьмы Смоленской обл., 2020-2024</p>
      </footer>
    </main>
  );
}

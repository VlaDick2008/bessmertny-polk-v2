import { Form } from '@remix-run/react';

import Input from './Input';
import React from 'react';

export default function SearchInput() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = React.useState('');

  return (
    <Form method="post" className="flex relative items-center">
      <Input
        onChange={(e) => {
          setSearchParams(e.target.value);
        }}
        htmlFor="q"
        value={searchParams}
        placeholder="Найти историю..."
        style="p-2 rounded-t border border-transparent border-b-black bg-transparent"
      />
      <button type="submit">
        <img className="absolute right-3 top-3" src="/search_icon.svg" alt="search" />
      </button>
    </Form>
  );
}

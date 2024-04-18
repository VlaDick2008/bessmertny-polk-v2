import { Form } from '@remix-run/react';
import Input from '~/components/UI/Input';

export default function TellStory() {
  return (
    <section>
      <Form>
        <div className="flex gap-3">
          <Input label="Имя" htmlFor="firstName" />
          <Input label="Фамилия" htmlFor="secondName" />
          <Input label="Отчество" htmlFor="lastName" />
        </div>
      </Form>
    </section>
  );
}

'use client';

import { Button } from '@/components';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Ой, щось пішло не так :(</h2>
        <Button onClick={() => reset()}>Спробувати ще раз</Button>
      </body>
    </html>
  );
}

import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <h1>404</h1>
      <p>Ой! Сторінку не знайдено</p>
      <p>Сторінку яку ви шукаєте не знайдено, або виникла інша помилка</p>
      <Link href={'/'}>Повернутись на головну</Link>
    </main>
  );
}

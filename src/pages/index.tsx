import Head from 'next/head';
import MainHeader from '../components/MainHeader';

export default function Home() {
  return (
    <>
      <Head>
        <title>Wordle</title>
        <meta name='description' content='Wordle clone' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <MainHeader />
      </main>
    </>
  );
}

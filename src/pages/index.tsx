import Head from 'next/head';
import GameBoard from '../components/GameBoard';
import Grid from '../components/grid/Grid';
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
      <main className='absolute w-full h-full top-0 left-0'>
        <div className='relative h-full'>
          <MainHeader />
          <GameBoard />
        </div>
      </main>
    </>
  );
}

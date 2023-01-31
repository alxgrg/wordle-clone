import Head from 'next/head';
import GameBoard from '../components/GameBoard';
import MainHeader from '../components/MainHeader';
import { StatisticsProvider } from '../context/StatisticsContext';
import { ModalProvider } from '../context/ModalContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Wordle</title>
        <meta name='description' content='Wordle clone' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='absolute w-full h-full top-0 left-0 min-[500px]:overflow-y-hidden'>
        <div className='relative h-full'>
          <SettingsProvider>
            <StatisticsProvider>
              <ModalProvider>
                <MainHeader />
                <GameBoard />
              </ModalProvider>
            </StatisticsProvider>
          </SettingsProvider>
        </div>
      </main>
    </>
  );
}

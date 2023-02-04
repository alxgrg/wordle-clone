import Head from 'next/head';
import GameBoard from '../components/GameBoard';
import MainHeader from '../components/MainHeader';
import { StatisticsProvider } from '../context/StatisticsContext';
import { ModalProvider } from '../context/ModalContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showOrientationWarning, setShowOrientationWarning] = useState(false);

  useEffect(() => {
    setMounted(true);
    let portrait = window.matchMedia('(orientation: portrait)');

    portrait.addEventListener('change', function (e) {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!e.matches && isMobile) {
        setShowOrientationWarning(true);
      } else {
        // Landscape
        setShowOrientationWarning(false);
      }
    });
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
      <main
        id='application'
        className='absolute top-0 left-0 h-full w-full min-[500px]:overflow-y-hidden'
      >
        <div className='relative h-full'>
          <SettingsProvider>
            <StatisticsProvider>
              {showOrientationWarning && (
                <div className='fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-white pt-14 text-center dark:bg-black'>
                  <p>Oh no! We can&apos;t fit everything on your screen.</p>
                  <br />
                  <p className='font-bold'>Please rotate your device.</p>
                </div>
              )}
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

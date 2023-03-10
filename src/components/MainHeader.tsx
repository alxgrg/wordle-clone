import {
  Bars3Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import GithubLogo from './GithubLogo';

const MainHeader = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <>
      <header className='flex h-[40px] w-full items-center justify-between border-b border-gray-300 px-5 dark:border-zinc-700 min-[415px]:h-[66px]'>
        <div className='flex justify-start pr-4 md:w-[120px]'>
          <a aria-label='Github' href='https://github.com/alxgrg/wordle-clone'>
            {/* <Image
              alt='github'
              src='/github-mark.svg'
              width={30}
              height={30}
              className='fill-white'
            /> */}
            <GithubLogo />
          </a>
        </div>
        <div className='grow basis-1/2 text-left md:text-center'>
          <h1 className='inline-block font-serif text-2xl font-extrabold leading-6 min-[415px]:block'>
            Wordle
          </h1>
        </div>

        <div className='flex justify-end md:w-[120px]'>
          <button className='px-1' onClick={() => modalCtx?.open('help')}>
            <QuestionMarkCircleIcon className='h-6 w-6 text-black dark:text-white md:h-7 md:w-7' />
          </button>
          <button className='px-1' onClick={() => modalCtx?.open('statistics')}>
            <ChartBarIcon className='h-6 w-6 text-black dark:text-white md:h-7 md:w-7' />
          </button>
          <button className='px-1' onClick={() => modalCtx?.open('settings')}>
            <Cog6ToothIcon className='h-6 w-6 text-black dark:text-white md:h-7 md:w-7' />
          </button>
        </div>
      </header>
    </>
  );
};

export default MainHeader;

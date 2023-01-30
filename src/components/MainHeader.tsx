import {
  Bars3Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';

const MainHeader = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <>
      <header className='w-full px-5 min-[415px]:h-[66px] h-[40px] flex justify-between items-center border-b border-zinc-700'>
        <div className='flex justify-start pr-4 md:w-[120px]'>
          <Bars3Icon className='h-6 w-6 dark:text-white text-black' />
        </div>
        <div className='grow basis-1/2 md:text-center text-left'>
          <h1 className='font-serif font-extrabold text-2xl'>Wordle</h1>
        </div>

        <div className='flex justify-end md:w-[120px]'>
          <button onClick={() => modalCtx?.open('help')}>
            <QuestionMarkCircleIcon className='h-6 w-6 dark:text-white text-black' />
          </button>
          <button onClick={() => modalCtx?.open('statistics')}>
            <ChartBarIcon className='h-6 w-6 dark:text-white text-black' />
          </button>
          <button onClick={() => modalCtx?.open('settings')}>
            <Cog6ToothIcon className='h-6 w-6 dark:text-white text-black' />
          </button>
        </div>
      </header>
    </>
  );
};

export default MainHeader;

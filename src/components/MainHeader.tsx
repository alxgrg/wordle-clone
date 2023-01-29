import {
  Bars3Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useContext } from 'react';
import { ModalContext } from '../context/ModalContext';
import Statistics from './menu/Statistics';
import Modal from './ui/Modal';

const MainHeader = () => {
  const modalCtx = useContext(ModalContext);

  return (
    <>
      <header className='w-full px-5 min-[415px]:h-[66px] h-[40px] flex justify-between items-center border-b border-zinc-700'>
        <div className='basis-1/4'>
          <Bars3Icon className='h-6 w-6 dark:text-white text-black' />
        </div>
        <div className='grow basis-1/2 text-center'>
          <h1 className='font-serif font-extrabold text-3xl'>Wordle</h1>
        </div>

        <div className='flex basis-1/4 justify-end'>
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

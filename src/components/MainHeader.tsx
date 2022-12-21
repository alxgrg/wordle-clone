import {
  Bars3Icon,
  ChartBarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

const MainHeader = () => {
  return (
    <header className='w-full px-5 h-16 flex justify-between items-center border-b border-zinc-700'>
      <div>
        <Bars3Icon className='h-6 w-6 text-white' />
      </div>
      <h1 className='font-serif font-extrabold text-3xl'>Wordle</h1>
      <div className='flex'>
        <button>
          <QuestionMarkCircleIcon className='h-6 w-6 text-white' />
        </button>
        <button>
          <ChartBarIcon className='h-6 w-6 text-white' />
        </button>
        <button>
          <Cog6ToothIcon className='h-6 w-6 text-white' />
        </button>
      </div>
    </header>
  );
};

export default MainHeader;

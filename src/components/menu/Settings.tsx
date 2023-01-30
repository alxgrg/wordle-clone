import { useSettings } from '../../context/SettingsContext';

const Settings = ({
  gameState,
  currentRowIndex,
}: {
  gameState: string;
  currentRowIndex: number;
}) => {
  const { toggleHardMode, toggleDarkTheme, settings } = useSettings();
  const { darkTheme, hardMode } = settings;
  return (
    <div className='flex flex-col p-4'>
      <h1 className='font-bold mb-4 text-center'>SETTINGS</h1>
      <div>
        <section>
          <div className='flex justify-between items-center border-b py-4'>
            <div className='pr-2'>
              <div className='text-lg'>Hard Mode</div>
              <div className='text-xs text-gray-400'>
                Any revealed hints must be used in subsequent guesses
              </div>
            </div>
            <div className='flex justify-between'>
              <button
                onClick={() => toggleHardMode(gameState, currentRowIndex)}
                className={`h-5 w-8  rounded-full border-none relative ${
                  !hardMode ? 'bg-custom-gray' : 'bg-custom-green'
                }`}
              >
                <span
                  className={`block absolute left-[2px] top-[2px] h-[calc(100%-4px)] w-1/2 rounded-lg bg-white transition-transform duration-300 ${
                    !hardMode ? 'translate-x-0' : 'translate-x-[calc(100%-4px)]'
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div className='flex justify-between items-center border-b py-4'>
            <div className='pr-2'>
              <div className='text-lg'>Dark Theme</div>
            </div>
            <div className='flex justify-between'>
              <button
                onClick={() => toggleDarkTheme()}
                className={`h-5 w-8  rounded-full border-none relative ${
                  !darkTheme ? 'bg-custom-gray' : 'bg-custom-green'
                }`}
              >
                <span
                  className={`block absolute left-[2px] top-[2px] h-[calc(100%-4px)] w-1/2 rounded-lg bg-white translate-x-0 transition-transform duration-300 ${
                    !darkTheme
                      ? 'translate-x-0'
                      : 'translate-x-[calc(100%-4px)]'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;

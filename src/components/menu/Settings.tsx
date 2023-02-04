import { useSettings } from '../../context/SettingsContext';

const Settings = ({
  gameState,
  currentRowIndex,
}: {
  gameState: string;
  currentRowIndex: number;
}) => {
  const { toggleHardMode, toggleDarkTheme, toggleHighContrast, settings } =
    useSettings();
  const { darkTheme, hardMode, highContrast } = settings;

  let highlightClass = 'bg-custom-green';

  if (highContrast) {
    highlightClass = 'bg-custom-orange';
  }
  return (
    <div className='flex flex-col p-4'>
      <h1 className='mb-4 text-center font-bold'>SETTINGS</h1>
      <div>
        <section>
          <div className='flex items-center justify-between border-b border-custom-gray py-4'>
            <div className='pr-2'>
              <div className='text-lg'>Hard Mode</div>
              <div className='text-xs text-gray-400'>
                Any revealed hints must be used in subsequent guesses
              </div>
            </div>
            <div className='flex justify-between'>
              <button
                aria-checked={hardMode}
                role='switch'
                type='button'
                aria-label='hardMode'
                onClick={() => toggleHardMode(gameState, currentRowIndex)}
                className={`relative h-5  w-8 rounded-full border-none ${
                  !hardMode ? 'bg-custom-gray' : highlightClass
                }`}
              >
                <span
                  className={`absolute left-[2px] top-[2px] block h-[calc(100%-4px)] w-1/2 rounded-lg bg-white transition-transform duration-300 ${
                    !hardMode ? 'translate-x-0' : 'translate-x-[calc(100%-4px)]'
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between border-b border-custom-gray py-4'>
            <div className='pr-2'>
              <div className='text-lg'>Dark Theme</div>
            </div>
            <div className='flex justify-between'>
              <button
                aria-checked={darkTheme}
                role='switch'
                type='button'
                aria-label='darkTheme'
                onClick={() => toggleDarkTheme()}
                className={`relative h-5  w-8 rounded-full border-none ${
                  !darkTheme ? 'bg-custom-gray' : highlightClass
                }`}
              >
                <span
                  className={`absolute left-[2px] top-[2px] block h-[calc(100%-4px)] w-1/2 translate-x-0 rounded-lg bg-white transition-transform duration-300 ${
                    !darkTheme
                      ? 'translate-x-0'
                      : 'translate-x-[calc(100%-4px)]'
                  }`}
                ></span>
              </button>
            </div>
          </div>
          <div className='flex items-center justify-between py-4'>
            <div className='pr-2'>
              <div className='text-lg'>Color Blind Mode</div>
              <div className='text-xs text-gray-400'>High contrast colors</div>
            </div>
            <div className='flex justify-between'>
              <button
                aria-checked={highContrast}
                role='switch'
                type='button'
                aria-label='colorBlindMode'
                onClick={() => toggleHighContrast()}
                className={`relative h-5  w-8 rounded-full border-none ${
                  !highContrast ? 'bg-custom-gray' : highlightClass
                }`}
              >
                <span
                  className={`absolute left-[2px] top-[2px] block h-[calc(100%-4px)] w-1/2 rounded-lg bg-white transition-transform duration-300 ${
                    !highContrast
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

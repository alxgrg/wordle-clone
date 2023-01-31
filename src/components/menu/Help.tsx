import { useSettings } from '../../context/SettingsContext';

const Help = () => {
  const { settings } = useSettings();
  const { highContrast } = settings;

  let correct = 'correct';
  let present = 'present';
  if (highContrast) {
    correct = 'correct-colorblind';
    present = 'present-colorblind';
  }

  return (
    <div className='flex flex-col p-8 justify-center items-start'>
      <h1 className='font-bold text-3xl text-left mt-7 mb-1'>How To Play</h1>
      <h2 className='font-medium text-xl'>Guess the Wordle in 6 tries.</h2>
      <section className='w-full m-auto'>
        <div>
          <ul className='list-disc pl-5 my-4'>
            <li className='mb-1'>Each guess must be a valid 5-letter word.</li>
            <li className='mb-1'>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>
          <div className='border-b border-custom-gray'>
            <p>
              <strong>Examples</strong>
            </p>
            <div className='mt-2 mb-5'>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center dark:text-white text-black ${correct}`}
                >
                  W
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  E
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  A
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  R
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  Y
                </div>
              </div>
              <p>
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>
            <div className='mt-2 mb-5'>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  P
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center ${present}`}
                >
                  I
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  L
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  L
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  S
                </div>
              </div>
              <p>
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>
            <div className='mt-2 mb-5'>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  V
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  A
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  G
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center absent`}
                >
                  U
                </div>
              </div>
              <div className='w-8 h-8 mr-1 inline-block'>
                <div
                  className={`before:pb-[100%] before:inline-block inline-flex w-full box-border border-2 border-zinc-700 text-[1.6rem] align-middle justify-center leading-4 uppercase font-bold items-center`}
                >
                  E
                </div>
              </div>
              <p>
                <strong>U</strong> is not in the word in any spot.
              </p>
            </div>
          </div>
        </div>

        <div className='my-3'>
          <p>
            <strong>A new WORDLE will be available each day!</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Help;

import { useSettings } from '../../context/SettingsContext';
import GithubLogo from '../GithubLogo';

const Help = () => {
  const { settings } = useSettings();
  const { highContrast, darkTheme } = settings;

  let correct = 'correct';
  let present = 'present';
  let absent = 'absent';
  if (highContrast) {
    correct = 'correct-colorblind';
    present = 'present-colorblind';
    absent = 'absent-colorblind';
  }
  if (darkTheme) {
    correct = correct.concat('-dark');
    present = present.concat('-dark');
    absent = absent.concat('-dark');
  }

  return (
    <div className='flex flex-col items-start justify-center p-8'>
      <h1 className='mt-7 mb-1 text-left text-3xl font-bold'>How To Play</h1>
      <h2 className='text-xl font-medium'>Guess the Wordle in 6 tries.</h2>
      <section className='m-auto w-full'>
        <div>
          <ul className='my-4 list-disc pl-5'>
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
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 text-black before:inline-block before:pb-[100%] dark:text-white ${correct}`}
                >
                  W
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  E
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  A
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  R
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  Y
                </div>
              </div>
              <p>
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>
            <div className='mt-2 mb-5'>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  P
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%] ${present}`}
                >
                  I
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  L
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  L
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  S
                </div>
              </div>
              <p>
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>
            <div className='mt-2 mb-5'>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  V
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  A
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  G
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  style={{
                    animation: `FlipIn 300ms ease-in 300ms forwards, FlipOut 300ms ease-in 300ms forwards`,
                  }}
                  className={`${absent} box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
                >
                  U
                </div>
              </div>
              <div className='mr-1 inline-block h-8 w-8'>
                <div
                  className={`box-border inline-flex w-full items-center justify-center border-2 border-zinc-700 align-middle text-[1.6rem] font-bold uppercase leading-4 before:inline-block before:pb-[100%]`}
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

        <div className='my-3 border-b border-custom-gray'>
          <p className='mb-3'>
            <strong>A new WORDLE will be available each day!</strong>
          </p>
        </div>
        <div className='my-3'>
          <p>
            <i>
              This is an open source clone of the game Wordle. See the code on
              Github:
            </i>
          </p>
          <div className='mt-2'>
            <a href='https://github.com/alxgrg/wordle-clone'>
              <GithubLogo />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;

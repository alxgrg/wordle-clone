// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { ReactNode } from 'react';
// import { createPortal } from 'react-dom';

// const modalElement = document.getElementById('modal') as HTMLElement;

// type Props = {
//   children: ReactNode;
//   onClose: boolean;
// };

// const Modal = ({ children }: { children: ReactNode }) => {
//   return createPortal(
//     <div className='flex fixed top-0 left-0 w-full h-full bg-white opacity-5'>
//       <div className='flex flex-row justify-end'>
//         {' '}
//         <button>
//           <XMarkIcon className='w-6 h-6' />
//         </button>
//       </div>
//       {children}
//     </div>,
//     modalElement
//   );
// };

// export default Modal;

import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/ModalContext';

type Props = {
  children: ReactNode;
  onClose: boolean;
};

const Modal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.getElementById('modal') as HTMLElement;
  const modalCtx = useContext(ModalContext);

  return createPortal(
    <div className='flex fixed top-0 left-0 w-full h-full bg-gray-300/25 justify-center'>
      <div className='relative bg-black rounded w-[90%] max-w-lg h-6'>
        <div className='flex flex-row justify-end'>
          {' '}
          <button onClick={() => modalCtx?.close()}>
            <XMarkIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      test
      {children}
    </div>,
    modalElement
  );
};

export default Modal;

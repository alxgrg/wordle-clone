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
    <div className='flex fixed w-full h-full top-0 left-0 p-0 justify-center items-center bg-slate-900/50'>
      <div className='relative bg-black rounded w-[90%] max-w-lg max-h-full'>
        <button onClick={modalCtx?.close} className='absolute top-4 right-4'>
          <XMarkIcon className='h-6 w-6' />
        </button>

        {children}
      </div>
    </div>,
    modalElement
  );
};

export default Modal;

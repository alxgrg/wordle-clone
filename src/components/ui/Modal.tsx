import { XMarkIcon } from '@heroicons/react/24/outline';
import { ReactNode, useContext, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/ModalContext';
import { CSSTransition } from 'react-transition-group';

type Props = {
  children: ReactNode;
  onClose: boolean;
};

const Modal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.getElementById('modal') as HTMLElement;
  const modalCtx = useContext(ModalContext);

  const [exitClass, setExitClass] = useState('');

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setExitClass('animate-slideOut');
    setTimeout(() => modalCtx?.close(), 200);
  };

  return createPortal(
    <div
      onClick={() => handleClose()}
      className='fixed top-0 left-0 z-40 flex h-full w-full items-end justify-center bg-black/50 p-0 min-[500px]:items-center'
    >
      <CSSTransition
        nodeRef={nodeRef}
        in={modalCtx?.modalState.isOpen}
        timeout={200}
        classNames='modal'
        appear
      >
        <div
          onClick={(e) => e.stopPropagation()}
          ref={nodeRef}
          className={`relative max-h-full w-full max-w-lg rounded bg-gray-200 dark:bg-custom-black max-[500px]:min-h-[75%] min-[500px]:w-[90%] ${exitClass}`}
        >
          <button onClick={handleClose} className='absolute top-4 right-4'>
            <XMarkIcon className='h-6 w-6' />
          </button>

          {children}
        </div>
      </CSSTransition>
    </div>,
    modalElement
  );
};

export default Modal;

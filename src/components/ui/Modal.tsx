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
    <div className='flex fixed w-full h-full top-0 left-0 p-0 justify-center items-end min-[500px]:items-center bg-black/50'>
      <CSSTransition
        nodeRef={nodeRef}
        in={modalCtx?.modalState.isOpen}
        timeout={200}
        classNames='modal'
        appear
      >
        <div
          ref={nodeRef}
          className={`relative dark:bg-black bg-gray-200 rounded min-[500px]:w-[90%] max-[500px]:min-h-[75%] w-full max-w-lg max-h-full ${exitClass}`}
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

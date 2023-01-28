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
      ref={nodeRef}
      className={`flex fixed w-full h-full top-0 left-0 p-0 justify-center items-center bg-slate-900/50 ${exitClass}`}
    >
      <CSSTransition
        nodeRef={nodeRef}
        in={modalCtx?.modalState.isOpen}
        timeout={200}
        classNames='modal'
        appear
      >
        <div className='relative bg-black rounded w-[90%] max-w-lg max-h-full'>
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

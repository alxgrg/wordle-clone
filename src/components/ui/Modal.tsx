import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { ModalContext } from '../../context/ModalContext';
import { CSSTransition } from 'react-transition-group';
import FocusTrap from 'focus-trap-react';

type Props = {
  children: ReactNode;
  onClose: boolean;
};

const Modal = ({ children }: { children: ReactNode }) => {
  const modalElement = document.getElementById('modal') as HTMLElement;
  const modalCtx = useContext(ModalContext);

  const [exitClass, setExitClass] = useState('');

  const nodeRef = useRef<HTMLDivElement | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);

  const handleClose = useCallback(() => {
    setExitClass('animate-slideOut');
    setTimeout(() => modalCtx?.close(), 200);
  }, [modalCtx]);

  useEffect(() => {
    const onClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onClose);
    return () => window.removeEventListener('keydown', onClose);
  }, [handleClose]);

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
        <FocusTrap>
          <div
            onClick={(e) => e.stopPropagation()}
            ref={nodeRef}
            role='dialog'
            aria-modal={modalCtx?.modalState.isOpen}
            aria-label={modalCtx?.modalState.content}
            className={`relative max-h-full w-full max-w-lg rounded bg-gray-200 dark:bg-custom-black max-[500px]:min-h-[75%] min-[500px]:w-[90%] ${exitClass}`}
          >
            <button
              ref={closeButtonRef}
              type='button'
              aria-label='close'
              onClick={handleClose}
              className='absolute top-4 right-4'
            >
              <XMarkIcon className='h-6 w-6' />
            </button>

            {children}
          </div>
        </FocusTrap>
      </CSSTransition>
    </div>,
    modalElement
  );
};

export default Modal;

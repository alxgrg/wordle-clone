import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

type Modal = {
  modalState: { isOpen: boolean; content: string };
  open: (content: string) => void;
  close: () => void;
};

const ModalContext = createContext<Modal | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, content: '' });
  const close = useCallback(() => {
    setModalState({ isOpen: false, content: '' });
    const app = document.getElementById('application');
    app?.setAttribute('aria-hidden', 'false');
  }, []);
  const open = useCallback((content: string) => {
    setModalState({ isOpen: true, content });
    const app = document.getElementById('application');
    app?.setAttribute('aria-hidden', 'true');
  }, []);

  const contextValue = useMemo(
    () => ({ modalState, open, close }),
    [close, modalState, open]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

export const useModal = () => {
  const modalCtx = useContext(ModalContext);
  if (!modalCtx) {
    throw new Error('Statistics context does not exist');
  }
  const { modalState, open, close } = modalCtx;

  return { modalState, open, close };
};

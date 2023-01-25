import { createContext, ReactNode, useState } from 'react';

type Modal = {
  modalState: { isOpen: boolean; content: string };
  open: (content: string) => void;
  close: () => void;
};

const ModalContext = createContext<Modal | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, content: '' });
  const close = () => {
    setModalState({ isOpen: false, content: '' });
  };
  const open = (content: string) => {
    console.log('modal context');

    setModalState({ isOpen: true, content });
  };
  return (
    <ModalContext.Provider value={{ modalState, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

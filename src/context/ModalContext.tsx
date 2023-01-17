import { createContext, ReactNode, useState } from 'react';

type Modal = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const ModalContext = createContext<Modal | null>(null);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => {
    setIsOpen(false);
  };
  const open = () => {
    console.log('modal context');

    setIsOpen(true);
  };
  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

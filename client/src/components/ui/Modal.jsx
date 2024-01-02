import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '../../hooks/useOutsideclick.js';

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-50 transition-all">
      <div
        ref={ref}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-300 rounded-lg py-12 px-14 transition-all"
      >
        <button
          onClick={close}
          className="text-3xl bg-none border-none p-2 rounded-full translate-x-3 transition-all absolute top-1 right-4"
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

"use client";
import { useEffect, ReactNode, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose, className }: ModalProps) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    //check create portal just run in browser
    const rootElement = typeof document !== "undefined" ? document.body : null;
    setPortalRoot(rootElement);
  }, []);

  return portalRoot ? (
    createPortal(
      <div
        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className={`rounded-2xl bg-white flex flex-col px-6 py-4 relative ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      portalRoot
    )
  ) : (
    <></>
  );
};

export default Modal;

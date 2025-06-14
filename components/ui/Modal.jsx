import { Dialog, DialogPanel } from "@headlessui/react";

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed bg-black/40 inset-0 z-40 flex-center">
        <DialogPanel
          transition
          className="w-full max-w-xl rounded-lg bg-white dark:bg-neutral-800 shadow-lg p-8 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

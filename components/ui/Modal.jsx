import { Dialog, DialogPanel } from "@headlessui/react";

export default function Modal({ isOpen, setIsOpen, children }) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="flex-center fixed inset-0 z-40 bg-black/40">
        <DialogPanel
          transition
          className="bg-primary-100 dark:bg-primary-200 w-full max-w-xl rounded-lg p-8 shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

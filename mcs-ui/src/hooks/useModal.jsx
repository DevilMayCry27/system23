import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const showModal = () => setOpen(true);

  return {
    open,
    showModal,
    closeModal,
  };
};

export default useModal;

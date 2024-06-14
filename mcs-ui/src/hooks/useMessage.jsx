import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

const useMessage = () => {
  const message = useContext(MessageContext);

  return { message };
};

export default useMessage;

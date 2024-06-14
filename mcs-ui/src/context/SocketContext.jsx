/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { getItem } from "../utils/storage";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [authUser, setAuthUser] = useState(getItem("hcp-app") || null);

  useEffect(() => {
    if (authUser) {
      const socket = io(process.env.REACT_APP_API_BASE_URL, {
        query: {
          userId: authUser?.user?.id,
        },
      });

      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
    // eslint-disable-next-line
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

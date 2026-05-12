"use client";

import { createContext, useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import URL from "../services/URLS";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const SOCKET_URL = URL?.SOCKET_URL;

  const socket = useMemo(() => {
    if (!SOCKET_URL) return null;

    return io(SOCKET_URL, {
      autoConnect: true,
      transports: ["websocket"],
    });
  }, [SOCKET_URL]);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";

export default function SocketInitializer() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!socket) return;

    const customerId = localStorage.getItem("userId");
    if (customerId) {
      console.log("customerId:", customerId);
      socket.emit("customersocket", { customerId }, () => {
        console.log("Customer socket connected");
      });
    }

    return () => {
      socket.off("customersocket");
    };
  }, [socket]);

  return null; // nothing to render
}

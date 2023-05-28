import React, { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import IndexVozac from "./IndexVozac";
import Cookies from "js-cookie";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const Index = () => {
  const { ready, user } = useContext(UserContext);
  const token = `Bearer ${Cookies.get("Token")}`;

  useEffect(() => {
    let connection;
    if (ready && user) {
      connection = new HubConnectionBuilder()
        .withUrl(
          `http://localhost:5026/notificationHub?username=${user.korisnickoIme}`,
          {
            accessTokenFactory: () => token,
          }
        )
        .build();

      connection
        .start()
        .then(() => {
          console.log("SignalR connection established.");

          // Register a client-side method to receive messages
          connection.on("ReceiveMessage", (message) => {
            toast(message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // Handle the received message as needed
          });
        })
        .catch((error) => {
          console.error("SignalR connection error:", error);
        });
    }
    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection stopped.");
      }
    };
    // Cleanup: Stop the SignalR connection when the component unmounts
  }, [ready]);

  return (
    <div>
      <p>Index</p>
      <ToastContainer />
    </div>
  );
};

export default Index;

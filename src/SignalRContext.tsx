import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

// Define SignalR Context
const SignalRContext = createContext<signalR.HubConnection | null>(null);

export const useSignalRConnection = () => useContext(SignalRContext);

export const SignalRProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7033/gamehub") // Replace with your server URL
            .withAutomaticReconnect()
            .build();

        hubConnection
            .start()
            .then(() => console.log("SignalR Connected"))
            .catch(err => console.error("SignalR Connection Error:", err));

        setConnection(hubConnection);

        return () => {
            hubConnection.stop();
        };
    }, []);

    return (
        <SignalRContext.Provider value={connection}>
            {children}
        </SignalRContext.Provider>
    );
};


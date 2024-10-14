import { io } from "socket.io-client";
import { getToken } from "@/config/axios.config"; // Ensure the path is correct

const baseURL = "https://api-docs.almasaalswda.com";
const socket = io(baseURL, {
    autoConnect: false,
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionDelay: 500,
});

// Function to connect to the socket
async function connectSocket() {
    const token = await getToken();
    console.log("Token from connectSocket:", token);

    if (token) {
        socket.auth = {
            token,
        };
        socket.connect();  // Move this inside the if statement
    } else {
        console.error("No token found, cannot connect to socket.");
    }
}

socket.on("connect", () => {
    console.log("Connected to the server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});

// Error handling
socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
    if (error.message === "Unauthorized") {
        redirectToLogin();
    }
});

// Redirect to login
async function redirectToLogin() {
    const path = "/auth/login";
    if (typeof window !== 'undefined') {
        window.location.href = path;
    }

    const redirect = (await import('next/navigation')).redirect;
    redirect(path);
}

// Export the socket and connect function
export { socket, connectSocket };

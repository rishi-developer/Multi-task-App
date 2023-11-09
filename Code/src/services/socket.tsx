import { io } from "socket.io-client";
const socket = io("https://devapi.geminisolutions.com");
socket.on("connect", () => {});
export default socket;

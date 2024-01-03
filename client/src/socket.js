import io from 'socket.io-client';

const apiUrl = process.env.REACT_APP_BACKEND_API_URL;

const socket = io.connect(apiUrl);

export default socket;

import {io} from 'socket.io-client'

const token = localStorage.getItem('accessToken')

export const socket = io("http://localhost:8000", {
    auth: { token }
});





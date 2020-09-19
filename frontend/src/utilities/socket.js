import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let stompClient = null;
const newMessages = [];

export function connect() {
  const socket = new SockJS('/message');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, (frame) => {
    console.log(`пора работать: ${frame}`);
    stompClient.subscribe('/topic/messages', (message) => {
      newMessages.forEach((handler) => handler(JSON.parse(message.body)));
    });
  });
}

export function addHandler(message) {
  newMessages.push(message);
}

export function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
}

export function sendMessage(message) {
  stompClient.send('/app/message', {}, JSON.stringify(message));
}

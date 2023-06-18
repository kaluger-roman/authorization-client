import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { SocketResponse } from "./types";
import { createStore, createEvent } from "effector";

const pendingRequests: Record<string, (response: SocketResponse<any>) => void> =
  {};

export const socket = io(
  `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`,
  {
    transports: ["websocket"],
  }
);

socket.onAny((_, response: SocketResponse) => {
  if (response.id && pendingRequests[response.id]) {
    pendingRequests[response.id](response);
    Reflect.deleteProperty(pendingRequests, response.id);
  }
});

export const emitWithAnswer = <T, V>(
  actions: string,
  payload: T
): Promise<V> => {
  const id = nanoid();
  socket.emit(actions, { ...payload, id });

  return new Promise((resolve, reject) => {
    pendingRequests[id] = (response: SocketResponse<V>) => {
      Reflect.deleteProperty(response, id);
      response.error ? reject(response.error) : resolve(response.payload);
    };
  });
};

export const $isSocketConnected = createStore(false);

const socketConnected = createEvent();

$isSocketConnected.on(socketConnected, () => true);

socket.on("connect", socketConnected);

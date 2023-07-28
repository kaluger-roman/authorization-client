import { createEffect } from "effector";
import { ACTIONS } from "./actions";
import { socket } from "@master_kufa/client-tools";
import { AuthPayload, RegisterPayload } from "../shared/types";

export const connectSocketFx = createEffect(() =>
  socket.connect(`${process.env.REACT_APP_SERVER_HOST}`)
);

export const authFx = createEffect<AuthPayload, string, string>((payload) =>
  socket.emitWithAnswer<AuthPayload, string>(ACTIONS.AUTH, payload)
);

export const registerFx = createEffect<RegisterPayload, string, string>(
  (payload) =>
    socket.emitWithAnswer<RegisterPayload, string>(ACTIONS.REGISTER, payload)
);

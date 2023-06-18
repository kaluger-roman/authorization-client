import { createEffect } from "effector";
import { ACTIONS } from "./actions";
import { emitWithAnswer } from "./socket";
import { AuthPayload, RegisterPayload } from "../shared/types";

export const authFx = createEffect<AuthPayload, string, string>((payload) =>
  emitWithAnswer<AuthPayload, string>(ACTIONS.AUTH, payload)
);

export const registerFx = createEffect<RegisterPayload, string, string>(
  (payload) =>
    emitWithAnswer<RegisterPayload, string>(ACTIONS.REGISTER, payload)
);

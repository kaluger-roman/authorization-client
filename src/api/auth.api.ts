import { createEffect } from "effector";
import { ACTIONS } from "./actions";
import { emitWithAnswer } from "./socket";
import { AuthPayload } from "../shared/types";

export const authFx = createEffect<AuthPayload, string, string>((payload) =>
  emitWithAnswer<AuthPayload, string>(ACTIONS.AUTH, payload)
);

export const registerFx = createEffect<AuthPayload, string, string>((payload) =>
  emitWithAnswer<AuthPayload, string>(ACTIONS.REGISTER, payload)
);

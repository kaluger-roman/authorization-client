import { combine, createEffect, createEvent, restore, sample } from "effector";
import { authApi } from "../../api";
import { createGate } from "effector-react";
import { Notification } from "@master_kufa/client-tools";

export const loginTextChanged = createEvent<string>();
export const passwordTextChanged = createEvent<string>();
export const authClicked = createEvent();

export const $loginText = restore(loginTextChanged, "");
export const $passwordText = restore(passwordTextChanged, "");

export const $isEmptyFields = combine(
  $loginText,
  $passwordText,
  (loginText, passwordText) => !(loginText && passwordText)
);

export const $authPending = authApi.authFx.pending;

export const PageGate = createGate();

export const saveTokenFx = createEffect<string, void>(
  (token) => void (localStorage.authToken = token)
);

sample({
  clock: authClicked,
  source: [$loginText, $passwordText],
  fn: ([login, password]) => ({ password, login }),
  target: authApi.authFx,
});

sample({
  clock: authApi.authFx.doneData,
  target: saveTokenFx,
});

sample({
  clock: authApi.authFx.failData,
  fn: (message: string): Notification.PayloadType => ({
    type: "error",
    message,
  }),
  target: Notification.add,
});

$loginText.reset([PageGate.close, authApi.authFx.done]);
$passwordText.reset([PageGate.close, authApi.authFx.done]);

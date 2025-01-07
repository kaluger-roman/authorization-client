import {
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from "effector";
import { authApi } from "../../api";
import { Paths } from "../../shared/types";
import { validatePassword } from "./register.helpers";
import { LOGIN_EMPTY_ERROR } from "../../shared/constants";
import { createGate } from "effector-react";
import { navigation } from "shared/navigate";
import { Notification } from "@master_kufa/client-tools";

export const loginTextChanged = createEvent<string>();
export const passwordTextChanged = createEvent<string>();
export const passwordConfirmTextChanged = createEvent<string>();

export const registerClicked = createEvent();

export const $loginText = restore(loginTextChanged, "");
export const $passwordText = restore(passwordTextChanged, "");
export const $passwordConfirmText = restore(passwordConfirmTextChanged, "");

export const $loginTextError = createStore("");
export const $passwordTextError = createStore("");
export const $passwordConfirmTextError = createStore("");

export const $registerPending = authApi.registerFx.pending;

export const PageGate = createGate();

export const redirectToAuthFx = createEffect(() =>
  navigation.navigate(Paths.applications)
);

sample({
  clock: registerClicked,
  source: $loginText,
  fn: (login) => (login ? "" : LOGIN_EMPTY_ERROR),
  target: $loginTextError,
});

sample({
  clock: registerClicked,
  source: $passwordText,
  fn: (password) =>
    validatePassword(password)
      ? ""
      : "Password must contain more than 6 symbols including upper/lower case letters and digits",
  target: $passwordTextError,
});

sample({
  clock: registerClicked,
  source: [$passwordText, $passwordConfirmText],
  fn: ([password, confirmation]) =>
    password === confirmation ? "" : "Confirmation doesn't match password",
  target: $passwordConfirmTextError,
});

sample({
  clock: registerClicked,
  source: {
    login: $loginText,
    password: $passwordText,
    loginTextError: $loginTextError,
    passwordTextError: $passwordTextError,
    passwordConfirmTextError: $passwordConfirmTextError,
  },
  filter: ({ loginTextError, passwordTextError, passwordConfirmTextError }) =>
    !loginTextError && !passwordTextError && !passwordConfirmTextError,
  fn: ({ login, password }) => ({ login, password }),
  target: authApi.registerFx,
});

sample({
  clock: authApi.registerFx.doneData,
  target: redirectToAuthFx,
});

sample({
  clock: authApi.registerFx.done,
  fn: (): Notification.PayloadType => ({
    type: "success",
    message: "User was successfully created",
  }),
  target: Notification.add,
});

sample({
  clock: authApi.registerFx.failData,
  fn: (message: string): Notification.PayloadType => ({
    type: "error",
    message,
  }),
  target: Notification.add,
});

$loginText.reset(PageGate.close);
$passwordText.reset(PageGate.close);
$passwordConfirmText.reset(PageGate.close);
$loginTextError.reset(PageGate.close);
$passwordTextError.reset(PageGate.close);
$passwordConfirmTextError.reset(PageGate.close);

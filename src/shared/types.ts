export type AuthPayload = { login: string; password: string };
export type RegisterPayload = AuthPayload;

export enum Paths {
  auth = "/auth",
  register = "/register",
}

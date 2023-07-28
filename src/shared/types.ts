export type AuthPayload = { login: string; password: string };
export type RegisterPayload = AuthPayload;

export enum Paths {
  root = "/authorization-client",
  auth = "/authorization-client/auth",
  register = "/authorization-client/register",
}

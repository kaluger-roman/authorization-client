export type AuthPayload = { login: string; password: string };
export type RegisterPayload = AuthPayload;

export enum Paths {
  root = "/",
  auth = "/domain-auth/auth",
  register = "/domain-auth/register",
}

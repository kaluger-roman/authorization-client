export type AuthPayload = { login: string; password: string };
export type RegisterPayload = { email: string; password: string };

export enum Paths {
  auth = "/auth",
  register = "/register",
}

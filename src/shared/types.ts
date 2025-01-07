export type AuthPayload = {
  login: string;
  password: string;
  application: Apps;
};
export type RegisterPayload = {
  login: string;
  password: string;
};

export enum Paths {
  root = "/",
  auth = "/auth",
  register = "/register",
  applications = "/applications",
}

export enum Apps {
  polyglot = "polyglot",
  farmland = "farmland",
  hometress = "hometress",
}

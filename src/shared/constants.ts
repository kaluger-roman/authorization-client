import { Apps } from "./types";

export const LOGIN_EMPTY_ERROR = "Login can't be empty";

export const APPLICATION_NAMES: Record<Apps, string> = {
  [Apps.farmland]: "Farmland",
  [Apps.hometress]: "Hometress",
  [Apps.polyglot]: "Polyglot",
};

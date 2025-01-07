import { Apps } from "shared/types";
import { createEvent, createStore, sample } from "effector";

export const $application = createStore<Apps | null>(
  ((window.location.hash || "").slice(1) || null) as Apps | null
);

export const selectApplication = createEvent<Apps>();

sample({
  clock: selectApplication,
  target: $application,
});

import { createEvent, createStore, sample } from "effector";
import { NotificationPayload, NotificationType } from "./types";
import { nanoid } from "nanoid";

export const $notificationQueue = createStore<Array<NotificationType>>([]);
export const $currentNotification = createStore<NotificationType | null>(null);

export const addNotification = createEvent<NotificationPayload>();
export const deleteNotification = createEvent<string>();
export const showNotification = createEvent();

$notificationQueue.on(addNotification, (state, note) => [
  ...state,
  { ...note, id: nanoid() },
]);
$notificationQueue.on(deleteNotification, (state, id) =>
  state.filter((item) => item.id !== id)
);
$currentNotification.on(deleteNotification, (state, id) =>
  state && state.id === id ? null : state
);

sample({
  clock: [addNotification, deleteNotification],
  target: showNotification,
});

sample({
  clock: showNotification,
  source: { current: $currentNotification, queue: $notificationQueue },
  filter: ({ current, queue }) => Boolean(!current && queue.length),
  fn: ({ queue }) => queue[0],
  target: $currentNotification,
});

export type SocketResponse<T = unknown> = {
  id?: string;
  error?: string;
  payload: T;
};

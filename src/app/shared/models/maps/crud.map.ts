const Actions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
} as const;

type ValuesOf<T> = T[keyof T];

export type Actions = ValuesOf<typeof Actions>;

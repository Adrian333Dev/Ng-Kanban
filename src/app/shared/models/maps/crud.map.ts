const Actions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
} as const;

type ValuesOf<T> = T[keyof T];

export type Actions = ValuesOf<typeof Actions>;

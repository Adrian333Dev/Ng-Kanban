import { ValuesOf } from "../helpers";

const Actions = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
} as const;

export type Actions = ValuesOf<typeof Actions>;

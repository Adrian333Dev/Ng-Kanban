import { ValuesOf } from '../helpers';

const PromptModalMode = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
} as const;

export type PromptModalMode = ValuesOf<typeof PromptModalMode>;

const TaskModalMode = {
  CREATE: 'create',
  UPDATE: 'update',
  VIEW: 'view',
} as const;

export type TaskModalMode = ValuesOf<typeof TaskModalMode>;

const CategoryModalMode = {
  UPDATE: 'update',
  VIEW: 'view',
} as const;

export type CategoryModalMode = ValuesOf<typeof CategoryModalMode>;

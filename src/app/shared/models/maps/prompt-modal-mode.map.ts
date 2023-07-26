import { ValuesOf } from '../helpers';

const PromptModalMode = {
  ALERT: 'alert',
  CONFIRM: 'confirm',
} as const;

export type PromptModalMode = ValuesOf<typeof PromptModalMode>;

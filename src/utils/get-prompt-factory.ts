import type { GptPrompts } from './types';

export const getPromptFactory = <TPrompts extends GptPrompts>(
  gptPrompts: TPrompts,
) => {
  return (promptName: keyof TPrompts) => {
    return gptPrompts[promptName];
  };
};

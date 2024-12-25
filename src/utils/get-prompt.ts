import { rootObject } from './constants';

export const getPrompt = (promptName: string) => {
  return rootObject.gptPrompts[promptName];
};

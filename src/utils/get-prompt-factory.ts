import type { GptPrompts } from '../types';

export const getPromptFactory = <TPrompts extends GptPrompts>(
  gptPrompts: TPrompts,
) => {
  return <TPromptName extends string & keyof TPrompts>(
    promptName: TPromptName,
    variableValues: Record<TPrompts[TPromptName]['variables'][number], string>,
  ) => {
    const gptPrompt = gptPrompts[promptName];
    if (!gptPrompt) {
      throw new Error(`Prompt ${promptName} not found`);
    }
    const { prompt: promptTemplate, variables } = gptPrompt;

    const promptWithVariables = variables.reduce((acc, variable) => {
      // @ts-expect-error
      return acc.replace(`{{${variable}}}`, variableValues[variable]);
    }, promptTemplate);

    return promptWithVariables;
  };
};

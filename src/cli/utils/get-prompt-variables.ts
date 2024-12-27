export const getPromptVariables = (prompt: string) => {
  const reVariables = /({{\s*[a-zA-Z0-9_]+\s*}})/;
  const splitPrompt = prompt.split(reVariables);
  const allVariables = splitPrompt
    .filter((s) => s.startsWith('{{') && s.endsWith('}}'))
    .map((s) => s.replace(/^{{/, '').replace(/}}$/, ''));
  const uniqueVariables = [...new Set(allVariables)];
  return uniqueVariables;
};

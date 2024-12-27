export interface GptPrompts
  extends Record<string, { prompt: string; variables: string[] }> {}

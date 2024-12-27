import * as fs from 'fs';
import * as path from 'path';
import type { GptPrompts } from '../types';
import type { Config } from './types';
import { getPromptVariables } from './utils/get-prompt-variables';

export const generate = async () => {
  const cwd = process.cwd();
  console.log('Generating prompts for the project');
  try {
    // Develop the project src path
    const configPath = path.join(cwd, 'gpt-prompter.config.json');
    const configContent = await fs.promises.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent) as Config;
    const projectSrc = config.projectSrc;

    // Find all .pmd files in the project src path
    const projectSrcPath = path.join(cwd, projectSrc);
    const files = await fs.promises.readdir(projectSrcPath, {
      recursive: true,
    });
    const pmdFiles = files.filter((file) => file.endsWith('.pmd'));

    // Create prompts for all .pmd files
    const prompts: GptPrompts = {};
    for (const file of pmdFiles) {
      const fileName = path.basename(file);
      const filePath = path.join(projectSrcPath, file);
      const promptName = fileName.replace('.pmd', '');
      const content = await fs.promises.readFile(filePath, 'utf-8');
      prompts[promptName] = {
        prompt: content,
        variables: getPromptVariables(content),
      };
    }

    // Generate TypeScript file content
    const fileContent = `
/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated. Do not edit directly.

import { getPromptFactory } from 'gpt-prompter';


const gptPrompts = ${JSON.stringify(prompts, null, 2)} as const;

// Type local
type GptPromptsLocal = typeof gptPrompts;

// Type definition for the prompts
declare module 'gpt-prompter' {
  interface GptPrompts extends GptPromptsLocal {}
}

// Export utilities
export const getPrompt = getPromptFactory(gptPrompts);
/* prettier-ignore-end */
`;

    // Write the file
    const outputPath = path.join(projectSrcPath, 'gptPrompts.gen.ts');
    await fs.promises.writeFile(outputPath, fileContent, 'utf-8');
    console.log(`Generated prompts file at: ${outputPath}`);
  } catch (error: any) {
    console.error('Error reading config file:', error.message);
    throw new Error('Failed to read gpt-prompter.config.json');
  }
};

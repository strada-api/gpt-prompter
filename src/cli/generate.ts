import * as fs from 'fs';
import * as path from 'path';
import type { Config } from './types';

export const generate = async () => {
  const cwd = process.cwd();
  console.log('Generating prompts for the project');
  try {
    const configPath = path.join(cwd, 'gpt-prompter.config.json');
    const configContent = await fs.promises.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent) as Config;
    const projectSrc = config.projectSrc;
    console.log(`Project source: ${projectSrc}`);

    const projectSrcPath = path.join(cwd, projectSrc);
    const files = await fs.promises.readdir(projectSrcPath, {
      recursive: true,
    });

    const pmdFiles = files.filter((file) => file.endsWith('.pmd'));

    const prompts: any = {};
    for (const file of pmdFiles) {
      const fileName = path.basename(file);
      const filePath = path.join(projectSrcPath, file);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      prompts[fileName.replace('.pmd', '')] = content;
    }

    // Generate TypeScript file content
    const fileContent = `// This file is auto-generated. Do not edit directly.

export const gptPrompts = ${JSON.stringify(prompts, null, 2)} as const;

// Type definition for the prompts
export type GPTPrompts = typeof gptPrompts;
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

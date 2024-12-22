import * as fs from 'fs';
import * as path from 'path';

export const generate = async () => {
  const cwd = process.cwd();
  console.log('Generating prompts for the project');
  console.log(`Current working directory: ${cwd}`);

  try {
    const configPath = path.join(cwd, 'gpt-prompter.config.json');
    const configContent = await fs.promises.readFile(configPath, 'utf-8');
    const config = JSON.parse(configContent);
    console.log(config);
    return config;
  } catch (error: any) {
    console.error('Error reading config file:', error.message);
    throw new Error('Failed to read gpt-prompter.config.json');
  }
};

import { Command } from 'commander';
import { generate } from './generate';
const program = new Command();

program.name('prompter').description('Prompt generation tool').version('1.0.0');

program
  .command('generate')
  .description('Generate prompts for the project')
  .action(generate);

program.parse();

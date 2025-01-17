# GPT Prompter

TypeScript developer utilities for prompt engineering

## Install

Install from the NPM repository using npm, pnpm or yarn:

```shell
npm install gpt-prompter
```

```shell
pnpm add gpt-prompter
```

```shell
yarn add gpt-prompter
```

## Usage

### 1. Add `gpt-prompter.config.json` to your project root

In this file specify the source directory for your projects code.

Example: if your project is in `./src` then your `gpt-prompter.config.json` should be in the root of your project and should look like this:

```json
{
  "projectSrc": "./src"
}
```

### 2. Create prompt files

Now you can create prompt files anywhere in your `projectSrc` directory.
Prompt files should have `.pmd` extension.

Prompt markdown (pmd) files are just plain markdown files with some special syntax for prompting.

You can add variables to your prompts by using the `{{variable}}` syntax.
The variables you add can be used in types-safe manner in your code.

### 3. Generate prompts

You can generate prompts by running following command:

```shell
npm run prompter generate
```

or equivalent `pnpm` or `yarn` command.

This will create a file `gptPrompts.gen.ts` in your `projectSrc` directory.
`gptPrompts.gen.ts` file should be committed to your repository.

### 4. Import prompts

Now you can import prompts in your code by using the `getPrompt` from `gptPrompts.gen.ts` file.

#### a) `getPrompt` function takes prompt name as an argument and returns the prompt as a string

Example:

```ts
import { getPrompt } from './gptPrompts.gen';

const prompt = getPrompt('myPrompt');
```

#### b) If your prompt has variables, you can supply them to the `getPrompt` function

Example:

```ts
import { getPrompt } from './gptPrompts.gen';

const prompt = getPrompt('myPrompt', { variable: 'value' });
```

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

1. Add `gpt-prompter.config.json` to your project root

In this file specify the source directory for your projects code.

Example: if your project is in `./src` then your `gpt-prompter.config.json` should be in the root of your project and should look like this:

```json
{
  "projectSrc": "./src"
}
```

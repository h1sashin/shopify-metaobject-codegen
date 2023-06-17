#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import * as GenerateDefinitions from './commands/generate-definitions';
import * as InitConfig from './commands/init-config';

yargs(hideBin(process.argv))
  .command('generate', 'Generate metaobject definitions to file', GenerateDefinitions.fn)
  .command('config', 'Generate metaobject definitions to file', (yargs) => {
    yargs.command('init', 'Generate metaobject definitions to file', InitConfig.fn);
  })
  .help()
  .showHelpOnFail(true)
  .version()
  .strict()
  .strictCommands()
  .demandCommand()
  .parse();

export { GenerateDefinitions, InitConfig };

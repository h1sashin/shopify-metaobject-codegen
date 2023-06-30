#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import * as GenerateDefinitions from './commands/generate-definitions';
import * as InitConfig from './commands/init-config';
import { Extensions } from './types/extensions';
import { ArgumentsCamelCase } from 'yargs';

type ConfigArguments = ArgumentsCamelCase<{ ext: Extensions; suffix: boolean }>;

yargs(hideBin(process.argv))
  .scriptName('metaobject-codegen')
  .command('generate', 'Generate metaobject definitions to file', GenerateDefinitions.fn)
  .command(
    'init',
    'Generate config template',
    (yargs) =>
      yargs
        .option('ext', {
          describe: `Config file extension (${Object.values(Extensions).join(', ')})`,
          description: "Config file's extension",
          type: 'string',
          default: Extensions.ts,
        })
        .option('suffix', {
          describe: 'Add suffix "config" to file name',
          type: 'boolean',
          default: false,
        }),
    (argv) => {
      const { ext, suffix } = <ConfigArguments>argv;
      InitConfig.fn(ext, suffix);
    },
  )
  .help()
  .showHelpOnFail(true)
  .version()
  .demandCommand()
  .parse();

export { GenerateDefinitions, InitConfig };

import yargs from 'yargs/yargs';
import * as GenerateDefinitions from './commands/generate-definitions';

yargs(process.argv.slice(2))
  .command(GenerateDefinitions.cmd, 'Generate metaobject definitions to file', () => GenerateDefinitions.fn)
  .help()
  .showHelpOnFail(true)
  .version()
  .strict()
  .strictCommands()
  .demandCommand()
  .parse();

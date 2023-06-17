import chalk from 'chalk';

export const message = {
  success: chalk.greenBright,
  error: chalk.redBright,
  info: chalk.blueBright,
  warning: chalk.yellowBright,
  successBg: chalk.bgGreenBright,
  errorBg: chalk.bgRedBright,
  infoBg: chalk.bgBlueBright,
  warningBg: chalk.bgYellowBright,
};

export type MessageType = keyof typeof message;

/**
 * Logs a message to the console.
 * @param type The type of message to log.
 * @param args The arguments to log.
 * @example
 * log('success', 'Successfully generated definitions!');
 * log('error', 'Something went wrong!');
 * log('info', 'This is an info message');
 * log('warning', 'This is a warning message');
 */
export const log = (type: MessageType, ...args: string[]) => {
  console.log(message[type](`[${type.toUpperCase()}]`), ...args);
};

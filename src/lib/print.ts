import chalk from 'chalk';

export default function print(...messages: any[]) {
  const time = chalk.gray(new Date().toLocaleTimeString());
  console.log(time, ...messages);
}

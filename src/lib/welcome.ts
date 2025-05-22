import print from './print';
import chalk from 'chalk';

export default function welcomeMessage() {
  print(
    `Servidor iniciado en modo de ${
      process.env.MODE == 'development'
        ? chalk.blue('desarrollo')
        : chalk.green('producción')
    } en el puerto ${chalk.yellow(3001)}\n`
  );
}

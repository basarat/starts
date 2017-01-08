import { ServeConfig } from '../../types';

export function serve(config: ServeConfig & { verbose: boolean }) {
  return new Server(config);
}

export class Server {
  constructor(private options: ServeConfig & { verbose: boolean }) {

  }

  writeLog(logLine: any) {
    this.options.verbose && console.log(logLine);
  }
}
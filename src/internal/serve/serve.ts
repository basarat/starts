import { ServeConfig } from '../../types';

export function serve(config: ServeConfig) {
  return new Server(config);
}

export class Server {
  constructor(config: ServeConfig) {

  }

  writeLog(logLine: any) {
    this.options.verbose && console.log(logLine);
  }
}
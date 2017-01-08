import { StartsConfig } from './types';
import { Server } from './internal/serve/serve';
import { Runner } from './internal/runner/runner';
import { addWatch } from './internal/watcher/watcher';

export function starts(config: StartsConfig) {
  let server: Server;
  if (config.serve) {
    server = new Server({ ...config.serve, verbose: !!config.verbose });
  }

  /** For each of the run patterns do a watch */
  if (config.run && config.run.length) {
    config.run.forEach((run) => {
      const runner = new Runner({
        cmd: run.cmd,
        args: run.args || [],
        onExit: (code: number) => {
          if (code !== 0 && run.keepAlive) {
            runner.restart();
          }
        }
      });
      if (config.initialRun) {
        runner.restart();
      }
      if (run.watch) {
        addWatch(run.watch, () => {
          runner.restart();
          /** TODO: live reload */
          if (!run.reload) {

          }
        });
      }
    });
  }
}
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
    config.run.forEach((run, index) => {
      const runner = new Runner({
        cmd: run.cmd,
      });

      /**
       * Logs
       */
      runner.onStdout.on(({ data }) => console.log(`[${index}] ${data}`));
      runner.onStderr.on(({ data }) => console.log(`[${index}] ${data}`));

      /** Keep alive */
      if (run.keepAlive) {
        runner.onExit.on(({ code }) => {
          if (code !== 0) {
            runner.restart();
          }
        });
      }

      /** initial run */
      if (config.initialRun) {
        runner.restart();
      }

      /** watch run */
      if (run.watch) {
        addWatch(run.watch, () => {

          /** Prepare for live reload */
          runner.onExit.once(({ code }) => {
            if (code !== 0) return;

            const reload = run.reload || 'all';
            if (server) {
              if (reload === 'all') {
                server.triggerReload();
              }
              else if (reload == 'css') {
                server.triggerReloadCss();
              }
              else if (reload == 'none') {
                // Nothin
              }
              else {
                const _ensure: never = reload;
              }
            }
          });

          /** Restart */
          runner.restart();
        });
      }
    });
  }
}
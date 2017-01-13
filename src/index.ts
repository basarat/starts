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
        index
      });

      /**
       * Logs
       */
      runner.onStdout.on(({ lines }) => lines.map(line => process.stdout.write(`[${index}] ${line}\n`)));
      runner.onStderr.on(({ lines }) => lines.map(line => process.stderr.write(`[${index}] ${line}\n`)));

      /** Keep alive */
      if (run.keepAlive) {
        runner.onExit.on(({ code }) => {
          if (code !== 0) {
            runner.restart();
          }
        });
      }

      /** initial run */
      if (config.autorun !== false) {
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
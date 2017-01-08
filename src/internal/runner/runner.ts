import { kill } from './treeKill';
import * as cp from 'child_process';
/**
 * Encapsulates a command, allowing you to kill and restart it at will
 */
export class Runner {
  private child: cp.ChildProcess | null;
  constructor(private config: {
    cmd: string,
    args: string[],
    onExit: (code: number) => void,
  }) {

  }

  restart() {
    /** Kill any previous */
    const previous = this.child;
    if (this.child) {
      this.child = null;
      kill(previous.pid);
    }

    /** Start a new one */
    const child = cp.spawn(this.config.cmd, this.config.args, { stdio: 'inherit' });

    /** Store the new one */
    this.child = child;

    this.child.once('exit', (code: number) => {
      if (child !== this.child) {
        return;
      }
      this.config.onExit(code);
    });
  }
}
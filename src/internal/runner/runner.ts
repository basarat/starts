import { kill } from './treeKill';
import * as cp from 'child_process';
import { spawn } from './defaultShell';
import { TypedEvent } from '../utils';
/**
 * Encapsulates a command, allowing you to kill and restart it at will
 */
export class Runner {
  private child: cp.ChildProcess | null;
  public onExit = new TypedEvent<{ code: number }>();
  public onStdout = new TypedEvent<{ lines: string[] }>();
  public onStderr = new TypedEvent<{ lines: string[] }>();
  constructor(private config: {
    cmd: string,
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
    const child = spawn(this.config.cmd, { stdio: 'inherit' });

    /** Store the new one */
    this.child = child;

    this.child.once('exit', (code: number) => {
      if (child !== this.child) {
        return;
      }
      this.onExit.emit({ code: code });
    });
    this.child.stdout.on('data', (data) => {
      if (child !== this.child) {
        return;
      }
      this.onStdout.emit({ lines: data.toString().split(/\r\n?|\n/) });
    });
    this.child.stderr.on('data', (data) => {
      if (child !== this.child) {
        return;
      }
      this.onStderr.emit({ lines: data.toString().split(/\r\n?|\n/) });
    });
  }
}
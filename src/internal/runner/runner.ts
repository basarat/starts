import { kill } from './treeKill';
import * as cp from 'child_process';
/**
 * Encapsulates a command, allowing you to kill and restart it at will
 */
export class Runner {
  private cp: cp.ChildProcess;
  constructor(private cmd: string, private args: string[] = []) {
  }

  restart() {
    if (this.cp) kill(this.cp.pid);
    this.cp = cp.spawn(this.cmd, this.args, { stdio: 'inherit' });
  }
}
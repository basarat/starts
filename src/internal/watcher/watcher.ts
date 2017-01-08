import * as chokidar from 'chokidar';
import { debounce } from "../utils";


class WatchManager {
  private watchers: { [pattern: string]: chokidar.FSWatcher } = Object.create(null);

  private getWatcher(patterns: string[]) {
    const key = JSON.stringify(patterns);
    if (!this.watchers[key]) {
      this.watchers[key] = chokidar.watch(patterns);
    }
    return this.watchers[key];
  }

  addWatch = (patterns: string[], cb: () => void) => {
    const watcher = this.getWatcher(patterns);

    const debounced = debounce(cb, 100);

    // Just the ones that impact file listing
    // https://github.com/paulmillr/chokidar#methods--events
    watcher.on('add', debounced);
    watcher.on('addDir', debounced);
    watcher.on('unlink', debounced);
    watcher.on('unlinkDir', debounced);

    // Just for changes
    watcher.on('change', debounced);
  }
}

/**
 * Add a watch for given patterns
 */
export const addWatch = new WatchManager().addWatch;
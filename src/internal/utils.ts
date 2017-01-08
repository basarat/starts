export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose();
}

/** passes through events as they happen. You will not get events from before you start listening */
export class TypedEvent<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  }

  once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener);
  }

  off = (listener: Listener<T>) => {
    var callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit = (event: T) => {
    /** Update any general listeners */
    this.listeners.forEach((listener) => listener(event));

    /** Clear the `once` queue */
    this.listenersOncer.forEach((listener) => listener(event));
    this.listenersOncer = [];
  }

  pipe = (te: TypedEvent<T>): Disposable => {
    return this.on((e) => te.emit(e));
  }
}


/**
 * Debounce
 */
var now = () => new Date().getTime();
export function debounce<T extends Function>(func: T, milliseconds: number, immediate = false): T {
  var timeout, args, context, timestamp, result;

  var wait = milliseconds;

  var later = function() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return <any>function() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

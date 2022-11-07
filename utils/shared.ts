import { CSS } from '@nextui-org/react';

/**
 * Encode a string to uri component.
 */
export const fixedEncodeURIComponent = (value: string) => {
  return encodeURIComponent(value)
    .replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    })
    .replace(/%20/g, '+');
};

export const toBase64 = (data: string) => {
  return Buffer.from(data).toString('base64');
};

export const styles = (styles: CSS) => {
  return { css: styles };
};

export const isEmptyObject = (obj: any) => {
  for (const key in obj) return false;
  return true;
};

export const removeProp = <T>(obj: T, prop: keyof T) => {
  const { [prop]: remove, ...rest } = obj;
  return rest;
};

export const removeProps = <T>(
  obj: T,
  props: (keyof T)[]
): Omit<T, keyof T> => {
  const prop = props.pop();
  if (!prop) {
    return obj;
  }
  const newObj = removeProp(obj, prop) as T;
  return removeProps(newObj, props);
};

export const deepEqual = (a: any, b: any) => {
  if (a === b) return true;

  if (a == null || typeof a != 'object' || b == null || typeof b != 'object')
    return false;

  let propsInA = 0,
    propsInB = 0;

  for (let prop in a) {
    propsInA += 1;
  }

  for (let prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop])) return false;
  }

  return propsInA == propsInB;
};

export const forEachCouple = <T>(
  array: T[],
  callback: (current: T, next: T | undefined, index: number) => boolean | void
) => {
  let index = 0;
  for (const item of array) {
    const keepGoing = callback(item, array[index + 1], index);
    if (keepGoing === false) {
      break;
    }
    index += 1;
  }
};

export const beautifyString = (val: string) => {
  const rgx = new RegExp('_', 'g');
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`.replace(rgx, ' ');
};

const elementsToShift = [
  'right-sidebar',
  'toolbar',
  'annotation-details-sidebar',
];

export const forEachElement = (
  arr: string[],
  cb: (elem: HTMLElement) => void
) => {
  arr.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      cb(element);
    }
  });
};

export type NoInfer<A extends any> = [A][A extends any ? 0 : never];

export function memo<TDeps extends readonly any[], TResult>(
  getDeps: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  opts: {
    key: any;
    debug?: () => any;
    onChange?: (result: TResult) => void;
  }
): () => TResult {
  let deps: any[] = [];
  let result: TResult | undefined;

  return () => {
    let depTime: number;
    if (opts.key && opts.debug) depTime = Date.now();

    const newDeps = getDeps();

    const depsChanged =
      newDeps.length !== deps.length ||
      newDeps.some((dep: any, index: number) => deps[index] !== dep);

    if (!depsChanged) {
      return result!;
    }

    deps = newDeps;

    let resultTime: number;
    if (opts.key && opts.debug) resultTime = Date.now();

    result = fn(...newDeps);
    opts?.onChange?.(result);

    if (opts.key && opts.debug) {
      if (opts?.debug()) {
        const depEndTime = Math.round((Date.now() - depTime!) * 100) / 100;
        const resultEndTime =
          Math.round((Date.now() - resultTime!) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;

        const pad = (str: number | string, num: number) => {
          str = String(str);
          while (str.length < num) {
            str = ' ' + str;
          }
          return str;
        };

        console.info(
          `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
          `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(
              0,
              Math.min(120 - 120 * resultFpsPercentage, 120)
            )}deg 100% 31%);`,
          opts?.key
        );
      }
    }

    return result!;
  };
}

export const stopScroll = () => {
  document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px');
  forEachElement(elementsToShift, (elem) => {
    elem.setAttribute('style', 'right: 17px');
  });
};

export const removeStopScroll = () => {
  document.body.setAttribute('style', '');
  forEachElement(elementsToShift, (elem) => {
    elem.setAttribute('style', '');
  });
};

export const groupBy = <T, K extends keyof T>(items: T[], key: K) => {
  return items.reduce(
    (acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[key] || []), item],
    }),
    {} as Record<K, T[]>
  );
};

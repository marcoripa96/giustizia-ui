import { CSS } from "@nextui-org/react";

/**
 * Encode a string to uri component.
 */
export const fixedEncodeURIComponent = (value: string) => {
  return encodeURIComponent(value).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  }).replace(/%20/g, '+');
}

export const toBase64 = (data: string) => {
  return Buffer.from(data).toString('base64');
}

export const styles = (styles: CSS) => {
  return { css: styles };
}

export const isEmptyObject = (obj: any) => {
  for (const key in obj) return false;
  return true;
}

export const removeProp = <T>(obj: T, prop: keyof T) => {
  const { [prop]: remove, ...rest } = obj;
  return rest;
}

export const removeProps = <T>(obj: T, props: (keyof T)[]): Omit<T, keyof T> => {
  const prop = props.pop();
  if (!prop) {
    return obj;
  }
  const newObj = removeProp(obj, prop) as T;
  return removeProps(newObj, props);
}

export const deepEqual = (a: any, b: any) => {
  if (a === b) return true;

  if (a == null || typeof a != "object" ||
    b == null || typeof b != "object")
    return false;

  let propsInA = 0, propsInB = 0;

  for (let prop in a) {
    propsInA += 1;
  }

  for (let prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }

  return propsInA == propsInB;
}

export const forEachCouple = <T>(array: T[], callback: (current: T, next: T | undefined, index: number) => boolean | void) => {
  let index = 0;
  for (const item of array) {
    const keepGoing = callback(item, array[index + 1], index);
    if (keepGoing === false) {
      break;
    }
    index += 1;
  }
}

export const beautifyString = (val: string) => {
  const rgx = new RegExp('_', 'g')
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`.replace(rgx, ' ');
}

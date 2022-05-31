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

/**
 * Encode a string to uri component.
 */
export const fixedEncodeURIComponent = (value: string) => {
  return encodeURIComponent(value).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  }).replace(/%20/g, '+');
}
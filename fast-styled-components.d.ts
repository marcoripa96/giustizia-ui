/**
 * A "fast" version of @types/styled-components that does not impact the
 * performance of the TypeScript language service (which is directly related to
 * the performance of VSCode).
 *
 * NOTE: This implements only a fraction of the features provided by the
 * @types/styled-component package. Notably, it does not support typing the
 * "props" parameter when interpolating within template strings. If someone
 * knows how to type that without impacting performance, please let me know!
 */

declare module "styled-components" {
  export interface StyledInterface extends StyledComponentFactories {
    <C extends React.ComponentType<any>>(component: C): StyledFunction<C>;
  }

  export type StyledComponentFactories = {
    [TTag in keyof JSX.IntrinsicElements]: StyledFunction<TTag>;
  };

  export interface StyledFunction<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    > {
    <O extends object = {}>(
      first: TemplateStringsArray,
      ...rest: Array<any>
    ): StyledComponent<C, O>;

    attrs<O extends object = {}>(
      props:
        | Partial<React.ComponentProps<C>>
        | ((props: any) => Partial<React.ComponentProps<C>>),
    ): StyledFunction<C, O>;
  }

  export interface StyledComponent<
    C extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
    O extends object = {},
    > {
    (
      props: React.ComponentProps<C> & {
        as?: string | React.ComponentType<any>;
      } & O,
    ): React.ReactElement<React.ComponentProps<C> & O>;
  }

  export function createGlobalStyle<O extends object = {}>(
    first: TemplateStringsArray,
    ...rest: any[]
  ): StyledComponent<"div", O>;

  export function css(first: TemplateStringsArray, ...rest: any[]): string;

  export function keyframes(
    first: TemplateStringsArray,
    ...rest: any[]
  ): string;

  export const ThemeProvider: StyledComponent<any>;
  export const ThemeContext: React.Context<any>;

  export class ServerStyleSheet {
    constructor();
    collectStyles(element: React.ReactElement<any>): React.ReactElement<any>;
    getStyleTags(): string;
    seal(): void;
    getStyleElement(): any;
  }

  declare const styled: StyledInterface;

  export default styled;
}
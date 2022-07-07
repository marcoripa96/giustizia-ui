// type Primitive = string | number | symbol;

// export type GenericObject = Record<Primitive, unknown>;

// type Join<
//   L extends Primitive | undefined,
//   R extends Primitive | undefined,
//   > = L extends string | number
//   ? R extends string | number
//   ? `${L}.${R}`
//   : L
//   : R extends string | number
//   ? R
//   : undefined;

// type Union<
//   L extends unknown | undefined,
//   R extends unknown | undefined,
//   > = L extends undefined
//   ? R extends undefined
//   ? undefined
//   : R
//   : R extends undefined
//   ? L
//   : L | R;

// /**
//  * NestedPaths
//  * Get all the possible paths of an object
//  * @example
//  * type Keys = NestedPaths<{ a: { b: { c: string } }>
//  * // 'a' | 'a.b' | 'a.b.c'
//  */
// export type NestedPaths<
//   T extends GenericObject,
//   Prev extends Primitive | undefined = undefined,
//   Path extends Primitive | undefined = undefined,
//   > = {
//     [K in keyof T]: T[K] extends GenericObject
//     ? NestedPaths<T[K], Union<Prev, Path>, Join<Path, K>>
//     : Union<Union<Prev, Path>, Join<Path, K>>;
//   }[keyof T];

// /**
//  * TypeFromPath
//  * Get the type of the element specified by the path
//  * @example
//  * type TypeOfAB = TypeFromPath<{ a: { b: { c: string } }, 'a.b'>
//  * // { c: string }
//  */
// export type TypeFromPath<
//   T extends GenericObject,
//   Path extends string, // Or, if you prefer, NestedPaths<T>
//   > = {
//     [K in Path]: K extends keyof T
//     ? T[K]
//     : K extends `${infer P}.${infer S}`
//     ? T[P] extends GenericObject
//     ? TypeFromPath<T[P], S>
//     : never
//     : never;
//   }[Path];

export type Join<K, P> = K extends string | number ?
  P extends string | number ?
  `${K}${"" extends P ? "" : "."}${P}`
  : never : never;

type Cons<H, T> = T extends readonly any[] ?
  ((h: H, ...t: T) => void) extends ((...r: infer R) => void) ? R : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]]

export type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: K extends string | number ?
    `${K}` | Join<K, Paths<T[K], Prev[D]>>
    : never
  }[keyof T] : ""

export type Leaves<T, D extends number = 10> = [D] extends [never] ? never : T extends object ?
  { [K in keyof T]-?: Join<K, Leaves<T[K], Prev[D]>> }[keyof T] : "";


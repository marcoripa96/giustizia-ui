import { applyPatches as applyImmerPatches, Patch as ImmerPatch } from "immer"


export type Patch = {
  op: 'add' | 'remove' | 'replace',
  basePath: string;
  path: string;
  value?: any
}

export const generateAddPatch = ({
  basePath,
  path,
  value
}: {
  basePath: string,
  path: string,
  value: any
}) => {
  const patch: Patch = {
    op: 'add',
    basePath,
    path,
    value
  }
  const inversePatch: Patch = {
    op: 'remove',
    basePath,
    path
  }
  return [patch, inversePatch] as const
}

export const generateRemovePatch = <T>({
  doc,
  basePath,
  path
}: {
  doc: T,
  basePath: string,
  path: string,
}) => {
  const patch: Patch = {
    op: 'remove',
    basePath,
    path
  };
  const inversePatch: Patch = {
    op: 'add',
    basePath,
    path,
    value: doc
  };
  return [patch, inversePatch] as const
}

export const generateReplacePatch = <T>({
  doc,
  path,
  basePath,
  value
}: {
  doc: T,
  path: string,
  basePath: string,
  value: any
}) => {
  const patch: Patch = {
    op: 'replace',
    basePath,
    path,
    value
  };
  const inversePatch: Patch = {
    op: 'replace',
    basePath,
    path,
    value: doc
  };
  return [patch, inversePatch] as const
}

const transformToImmerPatches = (patches: Patch[]): ImmerPatch[] => {
  return patches.map(({ basePath, ...patch }) => ({
    ...patch,
    path: `${basePath}${patch.path}`.split('/').slice(1)
  }))
}

export const applyPatches = <S>(state: S, patches: Patch[]) => {
  const immerPatches = transformToImmerPatches(patches);
  console.log(immerPatches);
  return applyImmerPatches(state, immerPatches);
}
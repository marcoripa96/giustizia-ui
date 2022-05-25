import { AnnotationType, AnnotationTypeMap } from "@/hooks/use-ner";
import { NERAnnotation } from "@/server/routers/document";
import { DocumentState } from "./useInitState";

const getSubTypeFromPath = (types: Record<string, Omit<AnnotationType, 'color'>>, splittedPath: string[]): Omit<AnnotationType, 'color'> => {
  const key = splittedPath.shift();
  const subType = types[key as unknown as string];

  if (splittedPath.length === 0) {
    return subType;
  }
  const subTypes = types[key as unknown as string].children as Record<string, Omit<AnnotationType, 'color'>>;

  return getSubTypeFromPath(subTypes, splittedPath);
}

export const getTypeFromPath = (types: AnnotationTypeMap | undefined, path: string) => {
  if (!types) {
    return undefined;
  }

  const splittedPath = path.split('.');

  if (splittedPath.length === 0) {
    return undefined;
  }

  const key = splittedPath.shift();
  const parentType = types[key as unknown as string];

  if (splittedPath.length === 0) {
    return parentType;
  }
  const subTypes = types[key as unknown as string].children as Record<string, Omit<AnnotationType, 'color'>>;

  return {
    ...getSubTypeFromPath(subTypes, splittedPath),
    color: parentType.color
  };
}

const addSubType = (
  subTypes: Record<string, Omit<AnnotationType, 'color'>> | undefined,
  type: { path: string[], newKey: string, label: string }
): Record<string, Omit<AnnotationType, "color">> => {
  const { path, newKey, label } = type;

  if (path.length === 0 || !subTypes) {
    return {
      ...subTypes,
      [newKey]: {
        label,
        children: {}
      }
    }
  }

  const key = path.shift() as string;

  return {
    ...subTypes,
    [key]: {
      ...subTypes[key],
      children: {
        ...addSubType(subTypes[key].children, {
          label,
          newKey,
          path
        })
      }
    }
  }
}

export const addType = (
  types: AnnotationTypeMap,
  type: { path: string, label: string, color?: string }
): AnnotationTypeMap => {
  const { path, label, color } = type;
  const newKey = label.toUpperCase().slice(0, 3);
  if (!path) {
    if (!color) {
      throw Error("Can't add a new top-level type without a specified color")
    }
    // if there is no path, it's a new top-level type
    return {
      ...types,
      [newKey]: {
        label,
        color,
        children: {}
      }
    }
  }
  const splittedPath = path.split('.');
  // it cannot be undefined 
  const key = splittedPath.shift() as string;

  const newState: AnnotationTypeMap = {
    ...types,
    [key]: {
      ...types[key],
      children: {
        ...addSubType(types[key].children, {
          label,
          newKey,
          path: splittedPath
        })
      }
    }
  }
  return newState;
}

export const addAnnotation = (annotation: NERAnnotation[], newAnnotation: NERAnnotation) => {
  const insIndex = annotation.findIndex((annotation) => newAnnotation.start_pos < annotation.start_pos);

  return [
    ...annotation.slice(0, insIndex),
    newAnnotation,
    ...annotation.slice(insIndex, annotation.length)
  ]
}
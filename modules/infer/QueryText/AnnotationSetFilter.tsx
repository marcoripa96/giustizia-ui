import { useText } from "@/components";
import { BaseSelect, Option } from "@/components/BaseSelect";
import { AnnotationSet, EntityAnnotation } from "@/server/routers/document";
import t from "@/translation/eng";
import { MouseEvent, useMemo } from "react";

type AnnotationSetFilter = {
  annotationSets: AnnotationSet<EntityAnnotation>[];
  value: string;
  onChange: (value: string) => void;
}

type ProcessedAnnotationSet = AnnotationSet<EntityAnnotation> & {
  readableName: string;
}

const addReadableName = (annotationSets: AnnotationSet<EntityAnnotation>[]): ProcessedAnnotationSet[] => {
  const processedAnnotationSets = annotationSets.map((item) => {
    const [key, ...rest] = item.name.split('_')
    const annotationName = rest.join('_');
    return { ...item, readableName: annotationName };
  }).sort((a, b) => a.readableName.toLowerCase() < b.readableName.toLowerCase() ? -1 : 1);
  return processedAnnotationSets;
}

const AnnotationSetFilter = ({ annotationSets, value, onChange }: AnnotationSetFilter) => {
  const t = useText('infer');
  const processedAnnotationSets = useMemo(() => addReadableName(annotationSets), [annotationSets]);

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (Array.isArray(value)) {
      return;
    }
    onChange(value);
  }

  return (
    <BaseSelect
      onChange={handleChange}
      value={value}

      inputProps={{
        labelLeft: t('selectAnnotationSet'),
        'aria-label': 'select annotation set'
      }}>
      {processedAnnotationSets.map((item) => (
        <Option key={item.name} value={item.name} label={item.readableName}>
          {item.readableName}
        </Option>
      ))}
    </BaseSelect>
  )
};

export default AnnotationSetFilter
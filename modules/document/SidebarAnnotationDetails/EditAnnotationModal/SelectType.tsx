import { BaseSelect, Option } from "@/components/BaseSelect";
import { useState, useMemo, MouseEvent } from "react";
import { selectDocumentTaxonomy, useSelector } from "../../DocumentProvider/selectors";

type SelectTypeProps = {
  value: string;
  onChange: (value: string) => void;
}

const SelectType = ({ onChange, value: valueProp }: SelectTypeProps) => {
  const [value, setValue] = useState(valueProp);
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const handleOnChange = (event: MouseEvent, value: string | string[]) => {
    if (Array.isArray(value)) {
      return;
    }
    setValue(value);
    onChange(value);
  }


  return (
    <BaseSelect
      value={value}
      onChange={handleOnChange}
      onTop
      inputProps={{
        'aria-label': 'Entity type',
        placeholder: 'Type',
        shadow: false,
        bordered: true
      }}>
      {Object.values(taxonomy).map((type) => (
        <Option key={type.key} value={type.key} label={type.label}>
          {type.label}
        </Option>
      ))}
    </BaseSelect>
  );
};

export default SelectType;
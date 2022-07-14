import { BaseSelect, Option } from "@/components/BaseSelect";
import { Checkbox } from "@nextui-org/react";
import { useState, useMemo, MouseEvent } from "react";
import { selectDocumentTaxonomy, useSelector } from "../../DocumentProvider/selectors";

type SelectTypeProps = {
  value: string[];
  onChange: (value: string[]) => void;
}

const SelectType = ({ onChange, value }: SelectTypeProps) => {
  // const [value, setValue] = useState(valueProp);
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const handleOnChange = (event: MouseEvent, value: string | string[]) => {
    if (!Array.isArray(value)) {
      return;
    }
    // setValue(value);
    onChange(value);
  }


  return (
    <BaseSelect
      value={value}
      onChange={handleOnChange}
      onTop
      multiple
      inputProps={{
        'aria-label': 'Entity type',
        placeholder: 'Type',
        shadow: false,
        bordered: true
      }}>
      {Object.values(taxonomy).map((type) => (
        <Option key={type.key} value={type.key} label={type.label}>
          <Checkbox aria-label="Select item" isSelected={value.indexOf(type.key) !== -1} />
          {type.label}
        </Option>
      ))}
    </BaseSelect>
  );
};

export default SelectType;
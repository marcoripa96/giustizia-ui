import { Checkbox, FormElement, InputProps } from "@nextui-org/react";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { BaseSelect, BaseSelectItem } from "../BaseSelect";
import { Item } from "../Select/Select";

export type SelectWithChecksProps = {
  items: Item[];
  value: string[];
  onChange?: (event: MouseEvent, value: string[]) => void;
  inputProps?: Partial<InputProps>;
}


const SelectWithChecks = ({ items, value, onChange, inputProps }: SelectWithChecksProps) => {
  const [valueState, setValueState] = useState<string[]>(value);

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (!onChange || !Array.isArray(value)) {
      return;
    }
    setValueState(value);
    onChange(event, value);
  }

  return (
    <BaseSelect
      onChange={handleChange}
      value={valueState}
      multiple
      inputProps={{
        ...inputProps,
        readOnly: true,
      }}>
      {items.map((item) => (
        <BaseSelectItem key={item.value} value={item.value} label={item.label}>
          <Checkbox isSelected={value.indexOf(item.value) !== -1} />
          {item.label}
        </BaseSelectItem>
      ))}
    </BaseSelect>
  )
};

export default SelectWithChecks;
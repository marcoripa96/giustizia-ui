import { FormElement, InputProps } from "@nextui-org/react";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import { BaseSelect, BaseSelectItem } from "../BaseSelect";

export type Item = {
  label: string;
  value: string;
}

export type SelectProps = {
  items: Item[];
  value: string;
  onChange?: (event: MouseEvent, value: string) => void;
  inputProps?: Partial<InputProps>;
}

const Select = ({ items, value, onChange, inputProps }: SelectProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const item = items.find((item) => item.value === value);
    if (!item) {
      setInputValue('')
    } else {
      setInputValue(item.label)
    }
  }, [items, value])

  const handleInputChange = (event: ChangeEvent<FormElement>) => {
    setInputValue(event.target.value);
  }

  const handleChange = (event: MouseEvent, value: string | string[]) => {
    if (!onChange || Array.isArray(value)) {
      return;
    }
    onChange(event, value);
  }

  const filteredItems = useMemo(() => {
    const regex = new RegExp(inputValue, 'i')
    return items.filter((item) => item.label.match(regex))
  }, [inputValue, items]);

  return (
    <BaseSelect
      onChange={handleChange}
      value={inputValue}
      selectableInput
      inputProps={{
        ...inputProps,
        onChange: handleInputChange
      }}>
      {filteredItems.map((item) => (
        <BaseSelectItem key={item.value} value={item.value} label={item.label}>
          {item.label}
        </BaseSelectItem>
      ))}
    </BaseSelect>
  )
};

export default Select;
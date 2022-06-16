import { Select } from "@/components";
import { useState, useMemo, MouseEvent } from "react";
import { selectDocumentTaxonomy, useSelector } from "../../DocumentProvider/selectors";

type SelectTypeProps = {
  value: string;
  onChange: (value: string) => void;
}

const SelectType = ({ onChange, value: valueProp }: SelectTypeProps) => {
  const [value, setValue] = useState(valueProp);
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const items = useMemo(() => {
    return Object.values(taxonomy).map((type) => {
      return {
        label: type.label,
        value: type.key
      }
    })
  }, [taxonomy]);

  const handleOnChange = (event: MouseEvent, value: string) => {
    setValue(value);
    onChange(value);
  }


  return (
    <Select
      inputProps={{
        'aria-label': 'Entity type',
        placeholder: 'Type',
        shadow: false,
        bordered: true
      }}
      items={items}
      value={value}
      onChange={handleOnChange} />
  )
};

export default SelectType;
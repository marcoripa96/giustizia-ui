type TreeCheckboxProps = {
  items: TreeItem[]
}

type TreeItem = {
  id: number | string;
  label: string;
  checked?: boolean;
  children?: TreeItem[]
}

const TreeCheckbox = (props: TreeCheckboxProps) => {

};

export default TreeCheckbox;
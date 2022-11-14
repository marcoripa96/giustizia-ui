import { Button } from "@/components";
import Description from "./Description";

type NodeManagementProps = {
  key : string;
  editMode : boolean;
  changeRightContent: (content: JSX.Element) => void;
}

const handleSave = (key: string, changeRightContent: (content: JSX.Element) => void) => {
  window.alert('TODO: 1- update taxonomy \n2- go to the general view')
  changeRightContent(<Description />)
}

const NodeManagement = ({key, editMode, changeRightContent} : NodeManagementProps) => {

  return (
    <div>
      <h1>Node Management</h1>
      <span>{editMode ? 'Modify type' + key : 'Add new type under ' + key }</span>
      <Button onClick={() => handleSave(key, changeRightContent)}>Conferma</Button>
    </div>
  )
}

export default NodeManagement
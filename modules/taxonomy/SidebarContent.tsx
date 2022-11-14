import { buildTreeFromFlattenedObject, Tree } from "@/components/TreeSpecialization"
import { useState } from "react"
import NodeManagement from "./NodeManagement";
import { flatTaxonomy } from "./taxonomy"
import ZeroShotCandidates from "./ZeroShotCandidates";

type SidebarContentProps = {
  changeRightContent: (content: JSX.Element) => void;
}

const SidebarContent = ({changeRightContent}: SidebarContentProps) => {
  const [taxonomy, setTaxonomy] = useState(() => buildTreeFromFlattenedObject(flatTaxonomy))

  const handleNodeDelete = (key: string) => {
    window.alert('TODO: \n1- delete node ' + key + ' from taxonomy (use component that already exists...) \n2- call updateTaxonomy(taxonomy) API');
  }

  const handleNodeAdd = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (empty) \n2- set '+key+' as father in useState');
    changeRightContent(<NodeManagement key={key} editMode={false} changeRightContent={changeRightContent}/>);
  }

  const handleNodeEdit = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (precompiled)')
    changeRightContent(<NodeManagement key={key} editMode={true} changeRightContent={changeRightContent}/>);
  }

  const handleNodeGetZeroShotCandidates = (key: string) => {
    console.log(key)
    window.alert('TODO: \n1- set state to show top candidates component')
    changeRightContent(<ZeroShotCandidates key={key} />);
  }

  return (<Tree  items={taxonomy} onNodeDelete={(key) => handleNodeDelete(key)}
                                  onNodeAdd={(key) => handleNodeAdd(key)}
                                  onNodeEdit={(key) => handleNodeEdit(key)}
                                  onNodeGetZeroShotCandidates={(key) => handleNodeGetZeroShotCandidates(key)}
                                  />)

}

export default SidebarContent


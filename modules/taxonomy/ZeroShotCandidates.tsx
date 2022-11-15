import { Checkbox } from "@nextui-org/react";
import fakeCandidates from "./fakeCandidates";

type ZeroShotCandidatesProps = {
  typeKey: string;
}

// TODO: move into another file?

type Candidate = {
  mention: string;
  mention_type: string;
  context: string;
  offset_doc_start: number;
  offset_doc_end: number;
  offset_ex_start: number;
  offset_ex_end: number;
  doc_id: string;
  predict_proba?: number;
  type_pred?: string;
}

type CandidatesProps = {
  candidates: Candidate[]
}


type CandidateItemProps = {
  candidate: Candidate;
}

const CandidateItem = ({ candidate }: CandidateItemProps) => {
  return (<tr><td>{candidate.context}</td><td>{candidate.doc_id}</td><td>{candidate.type_pred}</td><td><Checkbox></Checkbox></td></tr>)
}

// TODO: va riciclato per few-shot candidates? io direi di sì, ma poi vanno nascosti i bottoni
const Candidates = ({ candidates }: CandidatesProps) => {
  return (
    <table>
      <tr><th>Context</th><th>Document</th><th>Approve</th></tr>
      {candidates.map((candidate, index) => (
        <CandidateItem candidate={candidate} key={index}></CandidateItem>
      ))}
    </table>
  )
}

const ZeroShotCandidates = ({ typeKey }: ZeroShotCandidatesProps) => {
  // TODO: chiamata API passando key, poi API recupera verbalizer e prende candidates

  const candidates = fakeCandidates
  return (<>
    <h1>Zero-shot Candidates for {typeKey}</h1>
    <Candidates candidates={candidates}></Candidates>
  </>)
}

export default ZeroShotCandidates
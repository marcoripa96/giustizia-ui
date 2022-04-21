export interface IResponse {
  annotations: IAnnotation[];
}

/**
 * Defines an annotation for a mention in the document
 */
export interface IAnnotation {
  // word considered as entity
  mention: string;
  // start offset of the mention
  start: number;
  // end offset of the mention
  end: number;
  // entity type (e.g., LOC, DATE, MISC, PER)
  type: string;
  // NER confidence score
  confidence?: number;
  // candidate which received the top score
  topCandidate: ICandidate;
  // additional candidates (useful for end-users e.g., correct link assignment)
  candidates: ICandidate[];
}

/**
 * Defines a link candidate for an annotation
 */
export interface ICandidate {
  // id of the entity inside 'EntityStore'
  id: string;
  // base uri of the resource (so that we can generalize between KBs)
  baseUri: string;
  // resource id (baseUri + resourceId gives us the resource URI)
  resourceId: string
  // score assigned by the linking process
  score: number;
  // normalized score (more useful to the end-user)
  normScore: number
  // resource title
  title: string;
  // resource abstract
  abstract?: string;
  // resource types (multiple URIs?)
  typs?: string[];
  // resource image
  img?: string;
}
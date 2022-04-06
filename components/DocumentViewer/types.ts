import { MENTION_COLORS } from "./MentionTag/mention-tag-colors";

export type EntityType = keyof typeof MENTION_COLORS;

export type Mention = {
  start_pos_original: number;
  end_pos_original: number;
  ner_type: 'PER' | 'DATE' | 'MISC' | 'LOC' | 'ORG';
  top_url: string;
}


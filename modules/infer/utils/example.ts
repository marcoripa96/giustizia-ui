import { Annotation } from "@/components/NERDocumentViewer"

export const contentExample = `Wimbledon organisers are on the brink of announcing a full ban of all players from Russia and Belarus at this year’s championships.

The likes of the world No 2 Daniil Medvedev and the former world No 1 Victoria Azarenka will not be permitted to appear at the All England Club this summer because of the invasion of Ukraine by military forces from the two aforementioned countries.

Wimbledon will become the first tennis tournament to suspend Russians and Belarusians. As it stands, they are permitted to play on the ATP and WTA tours as neutral athletes, and have been allowed to put their names on the entry list for next month’s French Open.

Sources have told The Times that a decision has finally been reached after
`

export const annotationsExample = [
  {
    "id": 0,
    "top_url": "",
    "ner_type": "MISC",
    "start_pos_original": 0,
    "end_pos_original": 9,
    "mention": "Wimbledon"
  },
  {
    "id": 1,
    "top_url": "",
    "ner_type": "LOC",
    "start_pos_original": 83,
    "end_pos_original": 89,
    "mention": "Russia"
  },
  {
    "id": 2,
    "top_url": "",
    "ner_type": "LOC",
    "start_pos_original": 94,
    "end_pos_original": 101,
    "mention": "Belarus"
  },
  {
    "id": 3,
    "top_url": "",
    "ner_type": "PER",
    "start_pos_original": 161,
    "end_pos_original": 165,
    "mention": "Dani"
  },
  {
    "id": 4,
    "top_url": "",
    "ner_type": "PER",
    "start_pos_original": 165,
    "end_pos_original": 176,
    "mention": "##il Medvedev"
  },
  {
    "id": 5,
    "top_url": "",
    "ner_type": "PER",
    "start_pos_original": 203,
    "end_pos_original": 220,
    "mention": "Victoria Azarenka"
  },
  {
    "id": 6,
    "top_url": "",
    "ner_type": "ORG",
    "start_pos_original": 260,
    "end_pos_original": 276,
    "mention": "All England Club"
  },
  {
    "id": 7,
    "top_url": "",
    "ner_type": "LOC",
    "start_pos_original": 316,
    "end_pos_original": 323,
    "mention": "Ukraine"
  },
  {
    "id": 8,
    "top_url": "",
    "ner_type": "MISC",
    "start_pos_original": 383,
    "end_pos_original": 392,
    "mention": "Wimbledon"
  },
  {
    "id": 9,
    "top_url": "",
    "ner_type": "MISC",
    "start_pos_original": 444,
    "end_pos_original": 452,
    "mention": "Russians"
  },
  {
    "id": 10,
    "top_url": "",
    "ner_type": "MISC",
    "start_pos_original": 457,
    "end_pos_original": 467,
    "mention": "Belarusian"
  },
  {
    "id": 11,
    "top_url": "",
    "ner_type": "ORG",
    "start_pos_original": 518,
    "end_pos_original": 521,
    "mention": "ATP"
  },
  {
    "id": 12,
    "top_url": "",
    "ner_type": "ORG",
    "start_pos_original": 526,
    "end_pos_original": 529,
    "mention": "WTA"
  },
  {
    "id": 13,
    "top_url": "",
    "ner_type": "MISC",
    "start_pos_original": 633,
    "end_pos_original": 644,
    "mention": "French Open"
  },
  {
    "id": 14,
    "top_url": "",
    "ner_type": "ORG",
    "start_pos_original": 665,
    "end_pos_original": 674,
    "mention": "The Times"
  }
] as Annotation[];
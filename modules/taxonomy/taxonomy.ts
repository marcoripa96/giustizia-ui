import { flattenTree } from "@/components/TreeSpecialization";
import { Taxonomy } from "../document/DocumentProvider/types";

const baseTaxonomy: Taxonomy = [
  {
    key: 'PER',
    label: 'Person',
    color: '#FCE7F3',
    children: [
      {
        key: 'JDG',
        label: 'Giudice',
        recognizable: false,
      },
      {
        key: 'AVT',
        label: 'Avvocato',
        recognizable: false,
      }
    ]
  },
  {
    key: 'MISC',
    label: 'Miscellaneous',
    color: '#EDE9FE'
  },
  {
    key: 'DATE',
    label: 'Date',
    color: '#ffdebf'
  },
  {
    key: 'LOC',
    label: 'Location',
    color: '#FAE8FF',
    children: []
  },
  {
    key: 'ORG',
    label: 'Organization',
    color: '#baf2e6',
    children: [
      {
        key: 'TRIBUNALE',
        label: 'Tribunale',
        recognizable: true,
      }
    ]
  },
  {
    key: 'PARTE',
    label: 'Parte',
    color: '#e03ba2'
  },
  {
    key: 'CONTROPARTE',
    label: 'Controparte',
    color: '#ee2b6c'
  },
  {
    key: 'MONEY',
    label: 'Money',
    color: '#a05c72'
  },
  {
    key: 'UNK',
    label: 'Unknown',
    color: "#e2e2e2"
  }
];

export const flatTaxonomy = flattenTree(baseTaxonomy)
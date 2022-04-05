import { FaMousePointer as Cursor } from '@react-icons/all-files/fa/FaMousePointer';
import { FaPlus as Plus } from '@react-icons/all-files/fa/FaPlus';

export const mainActions = [
  { id: 'select', Icon: Cursor },
  { id: 'add', Icon: Plus }
] as const;


export type ActionKey = typeof mainActions[number]['id'];
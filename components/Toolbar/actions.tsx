import { FaMousePointer as Cursor } from '@react-icons/all-files/fa/FaMousePointer';
import { FaPlus as Plus } from '@react-icons/all-files/fa/FaPlus';
import { FaEraser as Erase } from '@react-icons/all-files/fa/FaEraser';

export const mainActions = [
  { id: 'select', Icon: Cursor },
  { id: 'add', Icon: Plus },
  { id: 'erase', Icon: Erase }
] as const;


export type ActionKey = typeof mainActions[number]['id'];
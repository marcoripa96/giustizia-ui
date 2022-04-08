import { FaMousePointer as Cursor } from '@react-icons/all-files/fa/FaMousePointer';
import { FaPlus as Plus } from '@react-icons/all-files/fa/FaPlus';
import { FaEraser as Erase } from '@react-icons/all-files/fa/FaEraser';

export const mainActions = [
  { id: 'select', Icon: Cursor, shortcut: '1' },
  { id: 'add', Icon: Plus, shortcut: '2' },
  { id: 'erase', Icon: Erase, shortcut: '3' }
] as const;


export type ActionKey = typeof mainActions[number]['id'];
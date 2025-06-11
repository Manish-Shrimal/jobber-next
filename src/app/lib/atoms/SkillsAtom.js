// lib/atoms/SkillsAtom.js
import { atom } from 'recoil';

export const selectedSkillsState = atom({
  key: 'selectedSkillsState', // Unique key for the atom
  default: [], // Default value is an empty array
});
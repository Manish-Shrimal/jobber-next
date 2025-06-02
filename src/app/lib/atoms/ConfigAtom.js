// lib/atoms/configAtom.js

"use client";


import { atom } from 'recoil';

export const configState = atom({
  key: 'configState',
  default: null,
});

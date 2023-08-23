// IMPORTING PACKAGES/MODULES
import { atom } from 'recoil'

export const darkModeAtom = atom({
  key: 'darkTheme',
  default: false,
})
export const modalTypeAtom = atom({
  key: 'modalType',
  default: null,
})
export const sharedDataAtom = atom({
  key: 'sharedData',
  default: null,
})

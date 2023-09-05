import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    () => ({
      code: '',
      title: 'Type title',
      theme: 'kermit',
      darkMode: true,
      showBackground: true,
      language: 'plaintext',
      radius: 'rounded-none',
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: 'cascadiaCode',
      padding: 32,
    }),
    {
      name: 'kermit-settings',
    },
  ),
)
export default useStore;

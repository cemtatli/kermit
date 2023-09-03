import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useStore = create(
  persist(
    () => ({
      code: "",
      title: "Type title",
      theme: "kermit",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      radius: 16,
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: "cascadiaCode",
      padding: 32,
    }),
    {
      name: "user-preferences",
    }
  )
);
export default useStore;

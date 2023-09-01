import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// INITIAL VALUES
const useStore = create(
	persist(
		() => ({
			code: '',
			title: 'Untitled-1',
			theme: 'kermit',
			darkMode: true,
			showBackground: true,
			language: 'plaintext',
			autoDetectLanguage: false,
			fontSize: 16,
			fontStyle: 'cascadiaCode',
			padding: 32,
		}),
		// STORAGE
		{
			name: 'user-preferences',
		}
	)
);
export default useStore;

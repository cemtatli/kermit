import { useEffect, useRef } from 'react';

import useStore from '@/store';
import { fonts, themes } from '@/options';
import { cn } from '@/lib/utils';

import CodeBlock from '@/components/CodeBlock';
import { Card, CardContent } from '@/components/ui/card';
import ExportOptions from '@/components/controls/Export';
import ThemeSelect from '@/components/controls/Theme';
import LanguageSelect from '@/components/controls/Language';
import Shortcut from './components/controls/Shortcut';

const App = () => {
	const theme = useStore((state) => state.theme);
	const padding = useStore((state) => state.padding);
	const fontStyle = useStore((state) => state.fontStyle);
	const showBackground = useStore((state) => state.showBackground);

	const editorRef = useRef(null);

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		if (queryParams.size === 0) return;
		const state = Object.fromEntries(queryParams);

		useStore.setState({
			...state,
			code: state.code ? atob(state.code) : '',
			autoDetectLanguage: state.autoDetectLanguage === 'true',
			darkMode: state.darkMode === 'true',
			fontSize: Number(state.fontSize || 16),
			padding: Number(state.padding || 64),
		});
	}, []);

	return (
		<main className='dark h-screen relative flex items-center justify-center bg-neutral-950 text-white'>
			<link rel='stylesheet' href={themes[theme].theme} crossOrigin='anonymous' />
			<link rel='stylesheet' href={fonts[fontStyle].src} crossOrigin='anonymous' />
			<div
				ref={editorRef}
				style={{ padding }}
				className={cn(
					'overflow-hidden mb-2 transition-all ease-in-out',
					showBackground ? themes[theme].background : 'ring ring-neutral-900'
				)}>
				<CodeBlock />
				<Card className='fixed bottom-16 py-5 mx-5 px-10 bg-neutral-900/90 backdrop-blur'>
					<CardContent className='flex flex-wrap gap-5 items-center p-0'>
						<ThemeSelect />
						<LanguageSelect />
						<ExportOptions />
					</CardContent>
				</Card>
			</div>
			<Shortcut />
		</main>
	);
};
export default App;

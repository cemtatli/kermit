import { useEffect, useRef } from 'react';

import useStore from '@/store';
import { fonts, themes } from '@/options';
import { cn } from '@/lib/utils';

import CodeBlock from '@/components/CodeBlock';
import { Card } from '@/components/ui/card';
import ExportOptions from '@/components/controls/Export';


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
		<main className='dark h-screen flex items-center justify-center bg-neutral-950 text-white'>
			<link rel='stylesheet' href={themes[theme].theme} crossOrigin='anonymous' />
			<link rel='stylesheet' href={fonts[fontStyle].src} crossOrigin='anonymous' />
			<div
				ref={editorRef}
				style={{ padding }}
				className={cn(
					'overflow-hidden mb-2 transition-all ease-in-out relative',
					showBackground ? themes[theme].background : 'ring ring-neutral-900'
				)}>
				<CodeBlock />
				<Card className='fixed bottom-16 py-5 mx-5 px-10 bg-neutral-900/90 backdrop-blur'>
					<ExportOptions />
				</Card>
				<img
					className='w-12 absolute bottom-2 hover:translate-x-16 transition right-2'
					src='/kermit.png'
				/>
			</div>
		</main>
	);
};
export default App;

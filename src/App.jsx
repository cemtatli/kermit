import { useEffect, useRef, useState } from 'react';

import useStore from '@/store';
import { Resizable } from 're-resizable';
import { fonts, themes } from '@/options';
import { cn } from '@/lib/utils';

import CodeBlock from '@/components/CodeBlock';
import Shortcut from '@/components/controls/Shortcut';
import WidthMeasurement from '@/components/WidthMeasurement';
import { Button } from '@/components/ui/button';
import ExportOptions from '@/components/controls/Export';
import { Card, CardContent } from '@/components/ui/card';
import ThemeSelect from '@/components/controls/Theme';
import LanguageSelect from '@/components/controls/Language';
import FontSelect from '@/components/controls/Font';
import FontSize from '@/components/controls/FontSize';
import Padding from '@/components/controls/Padding';
import DarkMode from '@/components/controls/DarkMode';
import Background from '@/components/controls/Background';

const App = () => {
	const [width, setWidth] = useState('auto');
	const [showWidth, setShowWidth] = useState(false);

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
			padding: Number(state.padding || 32),
		});
	}, []);

	return (
		<main className='dark h-screen relative flex items-center justify-center bg-neutral-950 text-white'>
			<link rel='stylesheet' href={themes[theme].theme} crossOrigin='anonymous' />
			<link rel='stylesheet' href={fonts[fontStyle].src} crossOrigin='anonymous' />
			<Resizable
				enable={{ left: true, right: true }}
				minWidth={padding * 2 + 500}
				size={{ width }}
				onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
				onResizeStart={() => setShowWidth(true)}
				onResizeStop={() => setShowWidth(false)}>
				<div
					className={cn(
						'overflow-hidden mb-2 transition-all ease-out rounded-lg',
						showBackground ? themes[theme].background : 'ring ring-neutral-900'
					)}
					style={{ padding }}
					ref={editorRef}>
					<CodeBlock />
				</div>
				<WidthMeasurement showWidth={showWidth} width={width} />
				<div
					className={cn(
						'transition-opacity w-fit mx-auto -mt-2',
						showWidth || width === 'auto' ? 'invisible opacity-0' : 'visible opacity-100'
					)}>
					<Button size='sm' onClick={() => setWidth('auto')} variant='ghost'>
						Set to auto width
					</Button>
				</div>
			</Resizable>
			<Card className='fixed bottom-12 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur'>
				<CardContent className='flex flex-wrap gap-6 p-0'>
					<ThemeSelect />
					<LanguageSelect />
					<FontSize />
					<FontSelect />
					<Padding />
					<DarkMode />
					<Background />
					<div className='w-px bg-neutral-800' />
					<div className='place-self-center'>
						<ExportOptions targetRef={editorRef} />
					</div>
				</CardContent>
			</Card>
			<Shortcut />
		</main>
	);
};
export default App;
